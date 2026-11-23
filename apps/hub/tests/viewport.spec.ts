import { expect, test } from '@playwright/test';

for (const [width, height] of [[1280,720],[1366,768],[1672,851],[1920,900],[1920,1080]] as const) {
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

test('original cinematic panel artwork is locally available, decoded and independent of captions', async ({ page }) => {
  await page.goto('/');
  const art = page.locator('.portal-image');
  await expect(art).toHaveCount(4);
  for (const image of await art.all()) {
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(500);
    await expect(image).toHaveAttribute('alt', '');
  }
  const background = await page.locator('.environment-image').evaluate(
    element => getComputedStyle(element).backgroundImage,
  );
  expect(background).toContain('hero-grand-library.webp');
  await expect(page.locator('.portal-content h3')).toHaveText(['Novel','Manga','Anime','Movies & TV']);
});