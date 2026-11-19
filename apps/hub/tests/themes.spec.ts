import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const themes = ['midnight', 'charcoal', 'plum', 'sepia', 'paper', 'ocean'];

test('all six themes are selectable and persist across reloads', async ({ page }) => {
  await page.goto('/');
  const control = page.getByRole('combobox', { name: 'Hub theme' });
  for (const theme of themes) {
    await control.selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('taiyou-hub-theme'))).toBe(theme);
    await page.reload();
    await expect(control).toHaveValue(theme);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations.map(x => x.id)).toEqual([]);
  }
});

test('invalid storage preference safely falls back before React renders', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('taiyou-hub-theme', 'invalid'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'midnight');
  await expect(page.getByRole('combobox', { name: 'Hub theme' })).toHaveValue('midnight');
});

test('media illustrations stay decorative and cards retain exact order', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hub-card-title')).toHaveText(['Novels','Manga','Anime','Movies & TV']);
  await expect(page.locator('.hub-card-icon svg[aria-hidden="true"]')).toHaveCount(4);
});

test('approved theme-matched logos and favicons are served without missing assets', async ({ page, request }) => {
  await page.goto('/');
  for (const theme of themes) {
    await page.getByRole('combobox', { name: 'Hub theme' }).selectOption(theme);
    const variant = ['midnight', 'charcoal', 'plum'].includes(theme) ? 'dark' : 'light';
    const logoPath = `/branding/logos/logo-${variant}.png`;
    const iconPath = `/branding/favicons/favicon-${variant}.ico`;
    await expect(page.locator('.hub-brand-logo')).toHaveAttribute('src', logoPath);
    await expect(page.locator('.hub-hero-logo')).toHaveAttribute('src', logoPath);
    await expect(page.locator('head link[rel="icon"]')).toHaveAttribute('href', iconPath);
    expect((await request.get(logoPath)).status()).toBe(200);
    expect((await request.get(iconPath)).status()).toBe(200);
    await page.reload();
    await expect(page.locator('head link[rel="icon"]')).toHaveAttribute('href', iconPath);
  }
});
