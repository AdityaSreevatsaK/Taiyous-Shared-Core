import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1280]) {
  test(`four tiles are visible and the layout does not overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Choose your library' })).toBeVisible();
    await expect(page.locator('.hub-card')).toHaveCount(4);
    await expect(page.locator('a.hub-card')).toHaveCount(1);
    await expect(page.locator('article.hub-card')).toHaveCount(3);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
    await page.screenshot({ path: test.info().outputPath(`hub-${width}.png`), fullPage: true });
  });
}

test('keyboard navigation skips planned cards', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to libraries' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.hub-brand')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.hub-card')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.hub-card')).not.toBeFocused();
  await expect(page.locator('article.hub-card')).toHaveCount(3);
});

test('only the verified Novel Library destination is actionable', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.hub-card')).toHaveAttribute(
    'href', 'https://taiyous-personal-library.pages.dev/',
  );
  await expect(page.locator('a.hub-card')).toHaveAttribute('referrerpolicy', 'no-referrer');
  await expect(page.locator('article.hub-card')).toHaveCount(3);
});

test('reduced motion does not hide or disable navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('a.hub-card')).toBeVisible();
});

test('Hub loads without requesting any third-party catalogue or media', async ({ page }) => {
  const unexpectedOrigins = new Set<string>();
  page.on('request', request => {
    const origin = new URL(request.url()).origin;
    if (origin !== 'http://127.0.0.1:5173') unexpectedOrigins.add(origin);
  });
  await page.goto('/');
  await expect(page.locator('.hub-card')).toHaveCount(4);
  expect([...unexpectedOrigins]).toEqual([]);
});

test('Novel link navigates without referrer or a live external request', async ({ page }) => {
  let referrer: string | undefined;
  await page.route('https://taiyous-personal-library.pages.dev/**', async route => {
    referrer = route.request().headers()['referer'];
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><html lang="en"><head><title>Novel library stub</title></head><body>Test only</body></html>',
    });
  });
  await page.goto('/');
  await page.locator('a.hub-card').click();
  await expect(page).toHaveURL('https://taiyous-personal-library.pages.dev/');
  expect(referrer).toBeUndefined();
});
