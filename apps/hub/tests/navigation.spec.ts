import { expect, test } from '@playwright/test';
import { captureVerifiedArtwork } from './visual-evidence';

for (const width of [320, 390, 768, 1280, 1648, 1672]) {
  test('four sculpted panels and no overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1648 ? 928 : 851 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Choose your library' })).toBeAttached();
    await expect(page.locator('.portal-item')).toHaveCount(4);
    await expect(page.locator('a.portal-surface')).toHaveCount(2);
    await expect(page.locator('article.portal-surface')).toHaveCount(2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const name of ['novel', 'manga', 'anime', 'movies']) {
      const clip = await page.locator('.portal-' + name + ' .portal-mask').evaluate(
        element => getComputedStyle(element).clipPath,
      );
      expect(clip).toContain('#' + name + (width <= 1100 ? '-mobile-clip' : '-desktop-clip'));
    }
    await captureVerifiedArtwork(page, test.info().outputPath('hub-cinematic-' + width + '.png'));
  });
}

test('header navigation works by keyboard, without focusing planned portals', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to libraries' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.brand')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Search libraries' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Library shortcuts' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.portal-surface').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.portal-surface').last()).toBeFocused();
});

test('real portal links remain independent HTTPS destinations without referrers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.portal-surface').nth(0))
    .toHaveAttribute('href', 'https://taiyous-personal-library.pages.dev/');
  await expect(page.locator('a.portal-surface').nth(1))
    .toHaveAttribute('href', 'https://taiyous-manga-library.pages.dev/');
  for (const link of await page.locator('a.portal-surface').all()) {
    await expect(link).toHaveAttribute('referrerpolicy', 'no-referrer');
  }
});

test('new header icons provide functional local search and library shortcuts', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('button', { name: 'Search libraries' });
  await search.click();
  await expect(search).toHaveAttribute('aria-expanded', 'true');
  const input = page.getByRole('searchbox', { name: 'Find a destination' });
  await expect(input).toBeFocused();
  await input.fill('manga');
  await expect(page.locator('#search-message')).toContainText('1 matching destination');
  await expect(page.locator('.portal-dimmed')).toHaveCount(3);
  await page.keyboard.press('Escape');
  await expect(search).toHaveAttribute('aria-expanded', 'false');
  const shortcuts = page.getByRole('button', { name: 'Library shortcuts' });
  await shortcuts.click();
  await expect(page.locator('#shortcut-panel')).toBeVisible();
  await expect(page.locator('#shortcut-panel a')).toHaveCount(2);
});

test('no third-party media or script requests', async ({ page }) => {
  const unexpected = new Set<string>();
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      unexpected.add(new URL(request.url()).origin);
    }
  });
  await page.goto('/');
  await expect(page.locator('.portal-image')).toHaveCount(4);
  expect([...unexpected]).toEqual([]);
});

test('reduced motion removes animated panel transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.portal-image').first().evaluate(
    element => getComputedStyle(element).transitionDuration,
  )).toContain('0s');
});

// Exact 1648×928 reference comparison belongs to the deployed React app, not an offline illustration.
test('actual React page paints the restored cinematic panels at 1648x928', async ({ page }) => {
  await page.setViewportSize({width:1648, height:928});
  await page.goto('/');
  await expect(page.locator('.portal-image')).toHaveCount(4);
  for (const image of await page.locator('.portal-image').all()) {
    await expect(image).toHaveAttribute('src', /cinematic-.*-1600\.webp/);
    await expect.poll(() => image.evaluate(async node => {
      const resource = new Image();
      resource.src = (node as HTMLImageElement).currentSrc;
      await resource.decode();
      return resource.naturalWidth;
    })).toBeGreaterThanOrEqual(900);
  }
  await captureVerifiedArtwork(page, test.info().outputPath('hub-reference-comparison-1648x928.png'));
});
for (const [width, height] of [[1280, 720], [1440, 900], [1920, 1080], [2560, 1440]] as const) {
  test('painted cinematic desktop reference at ' + width + 'x' + height, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.locator('.portal-item')).toHaveCount(4);
    await expect(page.locator('a.portal-surface')).toHaveCount(2);
    await expect(page.locator('article.portal-surface')).toHaveCount(2);
    await captureVerifiedArtwork(
      page, test.info().outputPath('hub-fidelity-' + width + 'x' + height + '.png'),
    );
  });
}

test('desktop silhouettes have a real pixel gutter, zero shared painted pixels and no ghost rectangles', async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 928 });
  await page.goto('/');
  const result = await page.evaluate(() => {
    const geometry = [...document.querySelectorAll<SVGPathElement>('.portal-border-desktop path[data-desktop-boundary]')];
    const byName = Object.fromEntries(geometry.map(node => [
      node.getAttribute('data-desktop-boundary')!, new Path2D(node.getAttribute('d')!),
    ]));
    const ctx = document.createElement('canvas').getContext('2d')!;
    let upperOverlap = 0; let lowerOverlap = 0;
    let smallestUpperGap = Infinity; let smallestLowerGap = Infinity;
    const gap = (a: Path2D, b: Path2D, y: number, left: number, right: number) => {
      let rightA = -Infinity, leftB = Infinity;
      for (let x = left; x <= right; x += 1) {
        const inA = ctx.isPointInPath(a, x, y);
        const inB = ctx.isPointInPath(b, x, y);
        if (inA && inB) return { overlap: true, gap: -1 };
        if (inA) rightA = Math.max(rightA, x);
        if (inB) leftB = Math.min(leftB, x);
      }
      return { overlap: false, gap: leftB - rightA };
    };
    for (let y = 120; y <= 470; y += 5) {
      const sample = gap(byName.novel, byName.manga, y, 1040, 1210);
      if (sample.overlap) upperOverlap++;
      smallestUpperGap = Math.min(smallestUpperGap, sample.gap);
    }
    for (let y = 520; y <= 850; y += 5) {
      const sample = gap(byName.anime, byName.movies, y, 990, 1210);
      if (sample.overlap) lowerOverlap++;
      smallestLowerGap = Math.min(smallestLowerGap, sample.gap);
    }
    return {
      count: geometry.length, upperOverlap, lowerOverlap,
      smallestUpperGap, smallestLowerGap,
      borders: [...document.querySelectorAll('.portal-border-desktop')].map(el => getComputedStyle(el).display),
      placements: [...document.querySelectorAll<HTMLElement>('.portal-item')].map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }),
    };
  });
  expect(result.count).toBe(4);
  expect(result.upperOverlap).toBe(0);
  expect(result.lowerOverlap).toBe(0);
  expect(result.smallestUpperGap).toBeGreaterThanOrEqual(7);
  expect(result.smallestLowerGap).toBeGreaterThanOrEqual(7);
  expect(result.placements).toHaveLength(4);
  expect(result.borders).toEqual(['block', 'block', 'block', 'block']);
});

test('hover and focus cannot obscure the neighbouring sculpted silhouette', async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 928 });
  await page.goto('/');
  const manga = page.locator('.portal-manga .portal-surface');
  const novel = page.locator('.portal-novel .portal-surface');
  await novel.hover({ position: { x: 200, y: 200 } });
  await expect(manga).toBeVisible();
  const data = await page.evaluate(() => {
    const hit = (x: number, y: number) =>
      document.elementsFromPoint(x, y).filter(el => el.matches('a.portal-surface')).length;
    return [hit(1098, 200), hit(1110, 300), hit(1055, 725)];
  });
  expect(data.every(count => count <= 1)).toBe(true);
  await novel.focus();
  await expect(novel).toBeFocused();
});
