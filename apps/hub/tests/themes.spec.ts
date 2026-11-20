import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const themes = ['midnight','charcoal','plum','sepia','paper','ocean'];

test('six themes persist and remain WCAG A/AA compliant', async ({page}) => {
  await page.goto('/');
  const control = page.getByRole('combobox',{name:'Hub theme'});
  for (const theme of themes) {
    await control.selectOption(theme);
    await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
    await expect.poll(()=>page.evaluate(()=>localStorage.getItem('taiyou-hub-theme'))).toBe(theme);
    await page.reload();
    await expect(control).toHaveValue(theme);
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    expect(result.violations.map(x=>x.id)).toEqual([]);
  }
});

test('invalid stored preference restores Sepia before React', async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('taiyou-hub-theme','invalid'));
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme','sepia');
  await expect(page.getByRole('combobox',{name:'Hub theme'})).toHaveValue('sepia');
});

test('artwork is decorative and text/statuses remain accessible', async({page})=>{
  await page.goto('/');
  await expect(page.locator('.hub-card-title')).toHaveText([
    'Novel Library','Manga Library','Anime Library','Movies & TV Library',
  ]);
  await expect(page.locator('.hub-card-icon svg[aria-hidden="true"]')).toHaveCount(4);
  await expect(page.locator('.hub-card-image[alt=""]')).toHaveCount(4);
  await expect(page.locator('.hub-card-state')).toHaveText([
    '✓ Available','✓ Available','◷ In preparation','◷ In preparation',
  ]);
  for(const art of await page.locator('.hub-card-image').all()) {
    await expect.poll(()=>art.evaluate(node=>(node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});
