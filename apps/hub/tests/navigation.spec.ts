import { expect, test } from '@playwright/test';
import { captureVerifiedArtwork } from './visual-evidence';

for (const width of [320, 390, 768, 1280, 1600]) {
  test('four honest destinations and responsive geometry at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Choose your library' })).toBeAttached();
    await expect(page.locator('.destination')).toHaveCount(4);
    await expect(page.locator('a.destination')).toHaveCount(2);
    await expect(page.locator('article.destination')).toHaveCount(2);
    const cards = await page.locator('.destination').evaluateAll(elements =>
      elements.map(element => {
        const r = element.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }),
    );
    const columns = width <= 640 ? 1 : 2;
    for (let i = 0; i < cards.length; i += columns) {
      const row = cards.slice(i, i + columns);
      expect(row.every(card => Math.abs(card.y - row[0]!.y) < 2)).toBe(true);
      if (columns === 2) expect(row[1]!.x).toBeGreaterThan(row[0]!.x);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width);
    await captureVerifiedArtwork(page, test.info().outputPath('hub-observatory-' + width + '.png'));
  });
}

test('keyboard skips non-interactive planned worlds', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to libraries' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.hub-brand')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.destination').nth(0)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.destination').nth(1)).toBeFocused();
});

test('real destinations use public HTTPS and do not forward a referrer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.destination').nth(0))
    .toHaveAttribute('href', 'https://taiyous-personal-library.pages.dev/');
  await expect(page.locator('a.destination').nth(1))
    .toHaveAttribute('href', 'https://taiyous-manga-library.pages.dev/');
  for (const link of await page.locator('a.destination').all()) {
    await expect(link).toHaveAttribute('referrerpolicy', 'no-referrer');
  }
});

for (const [title, url] of [
  ['Novel', 'https://taiyous-personal-library.pages.dev/'],
  ['Manga', 'https://taiyous-manga-library.pages.dev/'],
] as const) {
  test(title + ' link navigates independently without referrer', async ({ page }) => {
    let referrer: string | undefined;
    await page.route(url + '**', async route => {
      referrer = route.request().headers()['referer'];
      await route.fulfill({
        status: 200, contentType: 'text/html',
        body: '<!doctype html><html lang="en"><body>Test only</body></html>',
      });
    });
    await page.goto('/');
    await page.locator('a.destination').nth(title === 'Novel' ? 0 : 1).click();
    await expect(page).toHaveURL(url);
    expect(referrer).toBeUndefined();
  });
}

test('planned worlds cannot be clicked or tabbed into', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('article.destination')).toHaveCount(2);
  await expect(page.locator('article.destination').nth(0)).toContainText('Planned');
  await expect(page.locator('article.destination').nth(1)).toContainText('Coming soon');
  for (const card of await page.locator('article.destination').all()) {
    await expect(card).not.toHaveAttribute('href', /.+/);
    expect(await card.evaluate(element => getComputedStyle(element).cursor)).not.toBe('pointer');
  }
});

test('no third-party media or theme requests are introduced', async ({ page }) => {
  const unexpected = new Set<string>();
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:5173') {
      unexpected.add(new URL(request.url()).origin);
    }
  });
  await page.goto('/');
  await expect(page.locator('.destination-art')).toHaveCount(4);
  expect([...unexpected]).toEqual([]);
});

test('the new observatory artwork, shared mark and tiles all load locally', async ({ page }) => {
  await page.goto('/');
  const illustration = page.locator('.destination-art');
  for (const image of await illustration.all()) {
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth))
      .toBeGreaterThanOrEqual(1086);
  }
  const logo = page.locator('.hub-brand-image');
  await expect.poll(() => logo.evaluate(node => (node as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  const scene = await page.locator('.hub-observatory').evaluate(
    element => getComputedStyle(element).backgroundImage,
  );
  expect(scene).toContain('amber-observatory.svg');
  expect(await page.locator('.hub-observatory').evaluate(
    element => element.getAttribute('aria-hidden'),
  )).toBe('true');
});

test('reduced motion preserves links without movement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('a.destination')).toHaveCount(2);
  expect(await page.locator('a.destination').first().evaluate(
    element => getComputedStyle(element).transitionDuration,
  )).toContain('0s');
});
