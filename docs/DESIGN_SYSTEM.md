# Personal Hub design system

**Audited:** 21 November 2026. This document separates the deployed design from the next approved prototype so historical visual ideas are not mistaken for current code.

## 1. Current production design

The live Hub is the hero-free scenic gallery from PR #23:

- Four exact owner-approved detailed WebP portraits, ordered Novel, Manga, Anime, Movies & TV.
- Four midsize posters centred in one desktop row; two columns on tablet and one column on narrow mobile.
- No visible welcome heading, introduction or Explore/Read/Watch/Discover motto. A screen-reader-only page H1 and library H2 remain.
- Each poster uses the original text-free illustration. The MediaHubCard immersive variant renders the title, description, availability and CTA as real HTML/CSS over a lower gradient. Novel and Manga are whole-card links; Anime and Movies & TV are non-interactive planned cards.
- A full-page sakura/Mount Fuji sunrise panorama, Hub-specific SVG Sun logo and SVG favicon, sakura masthead ornament and seigaiha footer.
- The header currently contains “Taiyou’s Personal Hub” and the “MY MEDIA GATEWAY” subtitle.
- Current CSS uses Georgia/Times New Roman serif. There are no externally loaded fonts or third-party image requests.

The exact production asset hashes are checked by scripts/verify-hub-static.mjs. Do not substitute approximate artwork or regenerate the four approved portraits.

## 2. Hub-local themes

The Hub supports **Midnight, Charcoal, Plum, Sepia, Paper and Ocean**. Sepia is the first-visit and invalid-preference fallback. The preference is stored locally under taiyou-hub-theme; theme-bootstrap.js restores it before React to avoid a flash. Themes are local to this app and are not synced to sibling applications.

CSS variables in apps/hub/src/styles.css define the palette. Keep focus colours, readable text, card contrast and browser theme colour coherent. The native theme select remains keyboard-accessible. Any visual redesign must be checked in light and dark themes, not just Sepia.

## 3. Approved next visual exploration (not implemented)

See [Featured visual options](FEATURED_VISUAL_OPTIONS.md) and [ADR-015](adr/ADR-015-photographic-split-layout-exploration.md).

The owner is not committed to a Japanese aesthetic. The next prototype should compare two real photographs:

- **Golden Archive:** a historic library interior with walnut bookshelves and warm light.
- **Cinematic Passage:** an ornate architectural corridor with golden sunlight and a vanishing point.

Both are shown in one credited composite moodboard in docs/assets/; photographer, source URL, source dimensions and Pexels licence notes are documented. The raw photos are not separately redistributed. The moodboard is a documentation reference, not a runtime asset. The exact shared sun-light.webp and sun-dark.webp marks already used by the Novel and Manga apps are also stored in docs/assets/; the Hub has not switched to them yet.

### Proposed composition

- One prominent photographic feature on the **left**, approximately 52–58% of the content width.
- Four compact library tiles on the **right**, arranged 2 × 2 on desktop.
- Shared Taiyou Sun logo in the header; remove the redundant “MY MEDIA GATEWAY” subtitle.
- Deep walnut/brown, pale gold and a restrained glowing-gold accent.
- Candidate headline: “A Place for Every Story.” This is not final copy.
- Preserve the exact existing four media illustrations and honest navigation semantics.
- Reflow deliberately for tablet, mobile and 200% zoom. Do not merely shrink the desktop split.
- Compare both photos in the same layout so the image choice is the main variable.

The owner has approved building and comparing a coded prototype, **not** a production switch. The selected photo, crop, typeface, copy and final palette remain open.

## 4. Typography and external resources

Current font stack is Georgia/Times New Roman. Cormorant Garamond or Newsreader for display text and Inter for controls are possible future candidates, not selected dependencies. The current static Content Security Policy is intentionally self-only. If a web font is chosen, verify its licence and self-host it locally; do not add Google Fonts or a runtime network dependency.

Stock photography must be self-hosted if selected for the live app. Never hotlink Pexels. The two local reference photos remain under docs/assets/ until a production implementation PR moves an optimised copy into apps/hub/public/.

## 5. Accessibility and responsive invariants

- Semantic page H1, library H2, card H3s and an unordered list.
- Visible-on-focus skip link, keyboard-operable theme selector, real links for Novel/Manga only, visible focus indicators.
- Planned tiles remain inert and announce their state accessibly.
- Sufficient text/background contrast in all six themes.
- Respect reduced-motion preference; no essential information depends on animation or hover.
- Desktop viewport fit where practical; tablet/mobile reflow and 200% zoom must not create horizontal scrolling or clipped controls.
- Use actual browser screenshots after images decode and paint. Automated axe checks are necessary but not equivalent to manual NVDA/VoiceOver acceptance.

## 6. Asset boundaries

| Location | Purpose | Runtime? |
| --- | --- | --- |
| apps/hub/public/art/*-art.webp | Exact approved media card artwork | Yes |
| apps/hub/public/art/landscape.avif | Current sakura/Mount Fuji panorama | Yes |
| apps/hub/public/branding/hub-sun-logo.svg | Current Hub header mark | Yes |
| apps/hub/public/branding/hub-sun.svg | Current Hub favicon | Yes |
| docs/assets/featured-visual-moodboard.webp | Combined Pexels visual reference board | No |
| docs/assets/sun-light.webp, sun-dark.webp | Exact shared Novel/Manga logo references | No |

Never move a documentation reference into the runtime bundle without updating provenance, static verification, CSP checks, visual tests and this document.
