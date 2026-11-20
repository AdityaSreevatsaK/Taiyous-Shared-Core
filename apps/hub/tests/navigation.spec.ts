import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1280]) {
  test(`four tiles are visible and the layout does not overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Choose your library' })).toBeVisible();
    await expect(page.locator('.hub-card')).toHaveCount(4);
    await expect(page.locator('a.hub-card')).toHaveCount(2);
    await expect(page.locator('article.hub-card')).toHaveCount(2);
    const cards = await page.locator('.hub-card').evaluateAll(nodes =>
      nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x, y: rect.y };
      }),
    );
    // 4 × 1 on desktop; 2 × 2 on tablet; 1 × 4 on narrow phones.
    const columns = width >= 1100 ? 4 : width > 640 ? 2 : 1;
    const rows = new Set(cards.map(card => Math.round(card.y)));
    expect(rows.size).toBe(4 / columns);
    for (let i = 0; i < cards.length; i += columns) {
      const row = cards.slice(i, i + columns);
      expect(row.every(card => Math.abs(card.y - row[0]!.y) < 1)).toBe(true);
      for (let j = 1; j < row.length; j++) expect(row[j]!.x).toBeGreaterThan(row[j-1]!.x);
    }
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
  await expect(page.locator('a.hub-card').nth(0)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('a.hub-card').nth(1)).toBeFocused();
  await expect(page.locator('article.hub-card')).toHaveCount(2);
});

test('both verified Novel and Manga destinations are actionable', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.hub-card')).toHaveCount(2);
  await expect(page.locator('a.hub-card').nth(0)).toHaveAttribute(
    'href', 'https://taiyous-personal-library.pages.dev/',
  );
  await expect(page.locator('a.hub-card').nth(1)).toHaveAttribute(
    'href', 'https://taiyous-manga-library.pages.dev/',
  );
  for (const tile of await page.locator('a.hub-card').all()) {
    await expect(tile).toHaveAttribute('referrerpolicy', 'no-referrer');
  }
  await expect(page.locator('article.hub-card')).toHaveCount(2);
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

test('Manga link navigates without referrer or a live external request', async ({ page }) => {
  let referrer: string | undefined;
  await page.route('https://taiyous-manga-library.pages.dev/**', async route => {
    referrer = route.request().headers()['referer'];
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<!doctype html><html lang="en"><head><title>Manga library stub</title></head><body>Test only</body></html>',
    });
  });
  await page.goto('/');
  await page.locator('a.hub-card').nth(1).click();
  await expect(page).toHaveURL('https://taiyous-manga-library.pages.dev/');
  expect(referrer).toBeUndefined();
});
