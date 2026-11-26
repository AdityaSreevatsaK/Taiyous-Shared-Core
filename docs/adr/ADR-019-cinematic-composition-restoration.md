# ADR-019: Cinematic composition fidelity and architectural-source restoration

**Date:** 26 November 2026  
**Status:** Proposed and implemented in design PR #27, pending exact-head visual QA  
**Scope:** Shared Core Hub frontend, visual tests and one original-reference architectural source asset. No reader changes.

## Owner's visual target and discrepancies

The original **browser-chrome screenshot** of the sunlit library is the authoritative visual benchmark; the browser UI is not part of the Hub. The 24 November production screenshot was functional but left excess brown space, an overly cropped Sun window, tightly packed bottom tiles and low-positioned lower headings. The owner requested sustained visual comparison rather than cosmetic, one-off CSS changes.

## Refinement

- Recover the architectural **left-hand image from the user-provided original screenshot**, not a newly invented library. Crop out the browser chrome, remove the screenshot's baked header words, and apply a feathered, diagonal alpha matte **before** the originally baked destination panels. This preserves the actual reference sun, banners, bookshelves, gallery, armillary sphere and foreground without redistributing the full screenshot as a site background. Output: `hero-reference-restored.webp`, 760 × 851 pixels, WebP q93 with alpha, SHA-256 `b9ce925d12e8c0ecdf803fe9f7960469c41d696d06d74f319511f1ac551659cd`, 180,180 bytes.
- Reintegrate the restored image as a **decorative environment layer**. All destination artwork, labels, CTA elements, SVG masks and interactive controls remain independent.
- Widen the environment and reduce the excessive right-hand fade; adjust the background fitting without artificial background colour patches. The restored window is more complete and avoids ghost panels at the masked edge.
- Stagger the two bottom tiles with explicit breathing space below the top row, reduce their heights slightly, position their headings/buttons higher, lighten intrusive image scrims and moderate uniform rim bloom.
- Keep the existing high-resolution 900/1600px cinematic portal assets **unchanged**, including characters/poses/lighting. No image regeneration or pixel-preserving upscaling is claimed.

## Acceptance and constraints

- The architectural restored asset is derived from the **original 1672 × 941 reference screenshot**, not a clean native 2× render. Detail beyond that reference cannot be recovered without faithful high-resolution source imagery. No claim of pixel-identical visual reproduction or added native detail.
- Preserve original legacy artwork files and existing `hero-clean.webp` for rollback, with SHA-256 checks of both old and new imagery.
- Verify exact branch head via Node 22 Ubuntu/Windows builds, Chromium/Firefox/WebKit, no horizontal overflow, source-image decode, keyboard and six-theme behaviour.
- Inspect real painted screenshots at 1280×720, 1440×900, 1648×928, 1920×1080, 2560×1440, tablet and mobile. Compare against the original screenshot after excluding its browser chrome.
- Do not merge to production without evidence-based visual acceptance and matching-head CI. No shared packages or independent reader apps affected.
