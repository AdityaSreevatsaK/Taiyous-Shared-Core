import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const themes = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'];

test('all six themes persist and retain WCAG A/AA accessibility', async ({ page }) => {
  await page.goto('/');
  const control = page.getByRole('combobox', { name: 'Hub theme' });
  for (const theme of themes) {
    await control.selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect.poll(() => page.evaluate(
      () => localStorage.getItem('taiyou-hub-theme'),
    )).toBe(theme);
    await page.reload();
    await expect(control).toHaveValue(theme);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations.map(x => x.id)).toEqual([]);
  }
});
test('invalid preference restores amber Sepia before React paints', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('taiyou-hub-theme', 'invalid'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sepia');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toHaveValue('sepia');
});
test('artwork remains decorative while titles and statuses are accessible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.destination-heading h3')).toHaveText([
    'Novel', 'Manga', 'Anime', 'Movies & TV',
  ]);
  await expect(page.locator('.destination-art[alt=""]')).toHaveCount(4);
  await expect(page.locator('article.destination')).toHaveCount(2);
  await expect(page.locator('a.destination')).toHaveCount(2);
});
