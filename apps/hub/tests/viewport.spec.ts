import { expect, test } from '@playwright/test';

for (const [width, height] of [
  [1280, 720], [1366, 768], [1600, 900], [1920, 768], [1920, 1080],
] as const) {
  test('observatory and four destinations fit the ' + width + 'x' + height + ' desktop', async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      cards: [...document.querySelectorAll<HTMLElement>('.destination')].map(
        card => card.getBoundingClientRect().toJSON(),
      ),
      hero: document.querySelector<HTMLElement>('.hub-observatory')!.getBoundingClientRect().toJSON(),
      footer: document.querySelector<HTMLElement>('.hub-footer')!.getBoundingClientRect().toJSON(),
    }));
    expect(metrics.width).toBeLessThanOrEqual(width);
    expect(metrics.height).toBeLessThanOrEqual(height + 2);
    expect(metrics.hero.width).toBeGreaterThan(width * .38);
    expect(metrics.cards).toHaveLength(4);
    for (const card of metrics.cards) {
      expect(card.width).toBeGreaterThan(225);
      expect(card.height).toBeGreaterThan(155);
      expect(card.bottom).toBeLessThanOrEqual(height + 2);
      expect(card.right).toBeLessThanOrEqual(width + 2);
    }
    expect(metrics.footer.bottom).toBeLessThanOrEqual(height + 2);
  });
}

test('exact original high-resolution media illustrations are preserved', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('.destination-art');
  await expect(images).toHaveCount(4);
  for (const image of await images.all()) {
    await expect.poll(() => image.evaluate(
      element => (element as HTMLImageElement).naturalWidth,
    )).toBeGreaterThanOrEqual(1000);
    await expect(image).toHaveAttribute('width', '1086');
    await expect(image).toHaveAttribute('height', '1448');
  }
});

for (const width of [320, 390, 640, 800, 1024]) {
  test('phone, tablet and zoom equivalent reflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 720 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth))
      .toBeLessThanOrEqual(width);
    const columns = await page.locator('.hub-grid').evaluate(element =>
      getComputedStyle(element).gridTemplateColumns.split(' ').length,
    );
    expect(columns).toBe(width <= 640 ? 1 : 2);
    const hero = page.locator('.hub-observatory');
    await expect(hero).toBeVisible();
  });
}
