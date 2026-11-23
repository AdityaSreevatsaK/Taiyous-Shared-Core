import type { Page } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

/**
 * Save only painted screenshots, not blank placeholders captured while Chrome
 * composites decoded WebP portraits. This checks screenshot PIXELS, not merely
 * img.complete or naturalWidth (both were true during earlier blank captures).
 */
export async function captureVerifiedArtwork(page: Page, outputPath: string): Promise<void> {
  await page.locator('.hub-card-image-illustration').evaluateAll(async elements => {
    await Promise.all(elements.map(element => (element as HTMLImageElement).decode()));
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });

  let lastVariations: number[] = [];
  for (let attempt = 0; attempt < 7; attempt++) {
    await page.waitForTimeout(180);
    const png = await page.screenshot({ fullPage: true });
    lastVariations = await page.evaluate(async pngData => {
      const screenshot = new Image();
      screenshot.src = 'data:image/png;base64,' + pngData;
      await screenshot.decode();

      const sample = document.createElement('canvas');
      sample.width = 32;
      sample.height = 32;
      const ctx = sample.getContext('2d', { willReadFrequently: true });
      if (!ctx) throw new Error('Canvas 2D is unavailable for visual verification');
      const factor = screenshot.naturalWidth / document.documentElement.clientWidth;
      const cards = [...document.querySelectorAll<HTMLElement>('.destination')];
      return cards.map(card => {
        const box = card.getBoundingClientRect();
        ctx.clearRect(0, 0, 32, 32);
        // Sample the upper illustrated scene, away from captions and shadows.
        ctx.drawImage(screenshot,
          (box.x + box.width * .13) * factor,
          (box.y + box.height * .10) * factor,
          box.width * .74 * factor, box.height * .27 * factor,
          0, 0, 32, 32);
        const pixels = ctx.getImageData(0, 0, 32, 32).data;
        let sum = 0, squared = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
          const brightness = pixels[i]! * .2126 +
            pixels[i + 1]! * .7152 + pixels[i + 2]! * .0722;
          sum += brightness;
          squared += brightness * brightness;
          count++;
        }
        const mean = sum / count;
        return Math.sqrt(Math.max(0, squared / count - mean * mean));
      });
    }, png.toString('base64'));

    if (lastVariations.length === 4 && lastVariations.every(value => value > 12)) {
      await writeFile(outputPath, png);
      return;
    }
  }

  throw new Error('Screenshot contains one or more blank portraits; brightness deviations: ' +
    lastVariations.map(value => value.toFixed(1)).join(', '));
}
