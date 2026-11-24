import type { Page } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

/** Render screenshots after original WebP decoding and compositor paint. */
export async function captureVerifiedArtwork(page: Page, outputPath: string): Promise<void> {
  await page.locator('.portal-image').evaluateAll(async elements => {
    await Promise.all(elements.map(element => (element as HTMLImageElement).decode()));
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  const screenshot = await page.screenshot({ fullPage: true });
  const allPainted = await page.locator('.portal-image').evaluateAll(images => images.every(image =>
    (image as HTMLImageElement).naturalWidth > 0 && (image as HTMLImageElement).complete));
  if (!allPainted) throw new Error('One or more responsive cinematic images failed to decode');
  await writeFile(outputPath, screenshot);
}