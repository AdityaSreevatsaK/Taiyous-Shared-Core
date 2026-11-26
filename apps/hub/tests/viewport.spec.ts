import { expect, test } from '@playwright/test';

for (const [width, height] of [[1280,720],[1366,768],[1440,900],[1648,928],[1672,851],[1920,900],[1920,1080],[2560,1440]] as const) {
  test('cinematic environment fits desktop ' + width + 'x' + height, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      panels: [...document.querySelectorAll<HTMLElement>('.portal-item')].map(
        element => element.getBoundingClientRect().toJSON(),
      ),
    }));
    expect(layout.scrollWidth).toBeLessThanOrEqual(width);
    expect(layout.scrollHeight).toBeLessThanOrEqual(height + 2);
    expect(layout.panels).toHaveLength(4);
    for (const panel of layout.panels) {
      expect(panel.width).toBeGreaterThan(200);
      expect(panel.height).toBeGreaterThan(195);
      expect(panel.right).toBeLessThanOrEqual(width + 2);
      expect(panel.bottom).toBeLessThanOrEqual(height + 2);
    }
  });
}

for (const width of [320, 390, 640, 768, 1024]) {
  test('mobile, tablet and 200% zoom-equivalent reflow at ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const columns = await page.locator('.portal-stage').evaluate(element =>
      getComputedStyle(element).gridTemplateColumns.split(' ').length,
    );
    expect(columns).toBe(width <= 670 ? 1 : 2);
    await expect(page.locator('.environment-image')).toBeVisible();
  });
}

test('the default Sepia scene retains its intended cinematic exposure', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sepia');
  const filter = await page.locator('.environment-image').evaluate(
    element => getComputedStyle(element).filter,
  );
  expect(filter).toContain('brightness(1.15)');
  expect(filter).toContain('contrast(1.055)');
});

test('original cinematic panel artwork is locally available, decoded and independent of captions', async ({ page }) => {
  await page.goto('/');
  const art = page.locator('.portal-image');
  await expect(art).toHaveCount(4);
  for (const image of await art.all()) {
    await expect.poll(() => image.evaluate(async node => {
      const resource = new Image();
      resource.src = (node as HTMLImageElement).currentSrc;
      await resource.decode();
      return resource.naturalWidth;
    })).toBeGreaterThanOrEqual(900);
    await expect(image).toHaveAttribute('alt', '');
  }
  const background = await page.locator('.environment-image').evaluate(
    element => getComputedStyle(element).backgroundImage,
  );
  expect(background).toContain('hero-reference-restored.webp');
  const sceneSize = await page.locator('.environment-image').evaluate(
    element => getComputedStyle(element).backgroundSize,
  );
  expect(sceneSize).toContain('94%');
  await expect(page.locator('.portal-content h3')).toHaveText(['Novel','Manga','Anime','Movies & TV']);
});

// Two physical pixels per CSS pixel must use a suitably detailed, local asset.
test('high-DPI desktop selects 1600px art with unchanged panel geometry', async ({ browser }) => {
  const context = await browser.newContext({ viewport: {width: 1648, height: 928}, deviceScaleFactor: 2 });
  try {
    const page = await context.newPage();
    await page.goto('/');
    for (const img of await page.locator('.portal-image').all()) {
      await expect.poll(() => img.evaluate(async node => {
        const resource = new Image();
        resource.src = (node as HTMLImageElement).currentSrc;
        await resource.decode();
        return resource.naturalWidth;
      })).toBeGreaterThanOrEqual(1586);
      expect(await img.evaluate(node => (node as HTMLImageElement).currentSrc))
        .toContain('-1600.webp');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1648);
  } finally { await context.close(); }
});
test('cinematic spacing keeps titles, ornament and status controls deliberately separated', async ({ page }) => {
  await page.setViewportSize({ width: 1648, height: 928 });
  await page.goto('/');
  const layout = await page.locator('.portal-item').evaluateAll(items => items.map(item => {
    const panel = item.getBoundingClientRect();
    const heading = item.querySelector('h3')!.getBoundingClientRect();
    const ornament = item.querySelector('.ornament')!.getBoundingClientRect();
    const action = item.querySelector('.action-pill,.status-pill')!.getBoundingClientRect();
    return {
      top: panel.top, bottom: panel.bottom, left: panel.left, right: panel.right,
      headingTop: heading.top, headingBottom: heading.bottom, headingRight: heading.right,
      ornamentTop: ornament.top, ornamentBottom: ornament.bottom,
      actionTop: action.top, actionBottom: action.bottom, actionLeft: action.left,
    };
  }));
  expect(layout).toHaveLength(4);
  const [novel, manga, anime, movies] = layout;
  expect(anime!.top).toBeGreaterThan(novel!.bottom + 2);
  expect(movies!.top).toBeGreaterThan(manga!.bottom + 2);
  for (const item of layout) {
    expect(item.headingTop).toBeGreaterThan(item.top + 15);
    expect(item.headingRight).toBeLessThan(item.right - 8);
    expect(item.ornamentTop).toBeGreaterThan(item.headingBottom);
    expect(item.actionTop).toBeGreaterThan(item.ornamentBottom + 4);
    expect(item.actionBottom).toBeLessThan(item.bottom - 15);
    expect(item.actionLeft).toBeGreaterThan(item.left + 12);
  }
});
