import { expect, test } from '@playwright/test';

// At a normal 100% desktop viewport, the full welcome area, four cards and
// footer must be visible together, without forcing users to zoom out.
for (const [width, height] of [
  [1280, 720], [1366, 768], [1600, 900], [1920, 768], [1920, 1080],
] as const) {
  test(`whole homepage fits a ${width}x${height} desktop at 100% zoom`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await expect(page.locator('.hub-card-image-complete')).toHaveCount(4);
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      cards: [...document.querySelectorAll<HTMLElement>('.hub-card')].map(
        card => card.getBoundingClientRect().toJSON(),
      ),
      footer: document.querySelector<HTMLElement>('.hub-footer')!.getBoundingClientRect().toJSON(),
    }));
    expect(metrics.width).toBeLessThanOrEqual(width);
    expect(metrics.height).toBeLessThanOrEqual(height + 2);
    expect(metrics.cards).toHaveLength(4);
    for (const card of metrics.cards) {
      expect(card.width).toBeGreaterThan(150);
      expect(card.bottom).toBeLessThanOrEqual(height + 2);
      expect(card.right).toBeLessThanOrEqual(width + 2);
    }
    expect(metrics.footer.bottom).toBeLessThanOrEqual(height + 2);
  });
}

test('cards use sharp native-resolution artwork rather than the former tiny crops', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('.hub-card-image-complete');
  await expect(images).toHaveCount(4);
  for (const image of await images.all()) {
    await expect.poll(() => image.evaluate(
      element => (element as HTMLImageElement).naturalWidth,
    )).toBeGreaterThanOrEqual(1000);
    await expect(image).toHaveAttribute('width', '1086');
    await expect(image).toHaveAttribute('height', '1448');
  }
});

// 640 CSS pixels approximates a 1280px-wide display at 200% browser zoom.
// Reflow and vertical scrolling are intentional here; horizontal overflow is not.
for (const width of [320, 390, 640, 800]) {
  test(`narrow / zoom-equivalent layout reflows at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto('/');
    await expect(page.locator('.hub-card-image-complete')).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width);
    const columnCount = await page.locator('.hub-grid').evaluate(element =>
      getComputedStyle(element).gridTemplateColumns.split(' ').length,
    );
    expect(columnCount).toBe(width <= 620 ? 1 : 2);
  });
}