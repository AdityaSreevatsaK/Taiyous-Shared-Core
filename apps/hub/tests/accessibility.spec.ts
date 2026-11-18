import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1280]) {
  test(`WCAG A/AA audit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Report offending element selectors rather than private page contents.
    const violations = result.violations.map(violation => ({
      rule: violation.id,
      impact: violation.impact,
      selectors: violation.nodes.map(node => node.target),
    }));
    expect(violations).toEqual([]);
  });
}
