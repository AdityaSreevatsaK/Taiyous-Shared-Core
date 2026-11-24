# ADR-016: Amber Observatory one-page Hub exploration

- **Date:** 23 November 2026.
- **Status:** Implemented as a review prototype on `design/amber-observatory-hub-20261123`, **not yet production approved or deployed**.
- **Scope:** Shared Core `apps/hub` and Hub-specific tests/docs only.

## Owner direction

The existing scenic four-poster homepage did not make a sufficiently strong first impression. The owner asked for a first-principles visual rethink appropriate for a one-page service, then explicitly chose the newly generated **amber observatory** concept and requested a working website resembling it. This new direction supersedes the former Golden Archive/Cinematic Passage two-photograph comparison as the immediate design priority.

## Implementation

- Build the page with **real React, semantic HTML, CSS and interactive controls**, not by using a generated whole-page screenshot as the page.
- Create an original, local illustrated library/observatory SVG with a luminous sun window, shelves, balcony and celestial sphere. This is a **code-drawn interpretation** of the concept rather than a photographic reproduction. It has no external requests or new dependency.
- Desktop composition: large atmospheric observatory on the left, four gold-framed illustrated media destinations on the right in a 2 × 2 layout. Reflow to a shorter feature image and 2 × 2 tiles on tablets, and to a feature image with four stacked tiles on phones.
- Keep the **existing, exactly approved** `*-art.webp` files byte-for-byte intact; labels and availability are real text over local images.
- Reuse the already tracked exact Novel/Manga shared Sun WebP assets at `docs/assets/sun-light.webp` and `sun-dark.webp` via Vite imports. No sibling repository is modified.
- Keep the existing six theme keys and persistence; restyle the Sepia default as the dark warm amber palette chosen in the new reference.
- Preserve verified HTTPS Novel and Manga links, no-referrer policy, skip link, native theme control, heading structure, keyboard-only access, reduced motion, and **noninteractive** planned Anime/Movies & TV.
- Preserve the static CSP, no backend, no third-party runtime assets and independent media applications.

## Trade-offs and visual acceptance

The original SVG is scalable and light, but it is more illustrative and less photorealistic than the generated reference. The four existing portrait artworks are reframed in landscape panels rather than replaced. Owner screenshot review must decide whether the atmosphere, cropping and fidelity are satisfactory, or whether a separate original licensed/generative background should replace the SVG in a subsequent approved revision.

Quality requires Node 22 typecheck, Vitest, Vite build, static verifier, docs gate and Playwright across Chromium/Firefox/WebKit, including 320, 390, 768, 1280 and 1600px visual evidence, as well as no overflow, 200% zoom-equivalent reflow and six-theme WCAG A/AA automation. Manual NVDA/VoiceOver, physical mobile Safari and visual sign-off remain separate.

## Delivery gate

This implementation is isolated in a review PR against `master`; do not merge it or treat it as publicly deployed until matching-head CI is green, screenshot review is complete and the owner accepts the design. Existing `master` and Cloudflare Pages remain unchanged. Rollback after a future approved deployment would be a focused revert of the PR, followed by exact-SHA live smoke.
