import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const themes = ['midnight','charcoal','plum','sepia','paper','ocean'];
test('six themes persist and meet automated WCAG A/AA', async ({ page }) => {
  await page.goto('/');
  const select = page.getByRole('combobox', { name: 'Hub theme' });
  for (const theme of themes) {
    await select.selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('taiyou-hub-theme'))).toBe(theme);
    await page.reload();
    await expect(select).toHaveValue(theme);
    const result = await new AxeBuilder({page})
      .withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    expect(result.violations.map(v => v.id)).toEqual([]);
  }
});
test('invalid stored theme gracefully defaults to Sepia/Amber Classic', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('taiyou-hub-theme', 'invalid'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sepia');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toHaveValue('sepia');
});