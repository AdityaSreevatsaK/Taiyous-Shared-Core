# ADR-015: Photographic split-layout exploration for the Personal Hub

- **Status:** Accepted for prototype exploration only; not approved as the production implementation.
- **Date:** 21 November 2026.
- **Scope:** `apps/hub` visual design, branding references and documentation.
- **Owner decision:** The owner approved exploring this direction and storing the two reference photographs and shared Sun marks. Final image selection, final copy and production deployment remain open.

## Context

The owner is dissatisfied with the current Japanese/sakura-led homepage and is not committed to a Japanese theme. The supplied “Still Waters” video's brown, pale-gold and glowing-gold palette is appealing, but the crane is not a required motif. The owner liked both the Golden Archive and Cinematic Passage concepts and suggested one prominent featured visual on the left with the four media tiles on the right.

The Hub also currently uses a separate sunrise SVG logo, while the Novel and Manga applications use the same approved Taiyou Sun WebP variants. The owner is comfortable standardising the Hub on that shared Sun mark for visual consistency.

The current production homepage remains the hero-free centred four-poster gallery from PR #23. It is functional, responsive and deployed, but the owner does not consider its visual direction finished.

## Options considered

1. **Golden Archive:** a real historic library interior with walnut bookshelves and warm light. Directly evokes a collection of stories and has a wide landscape crop.
2. **Cinematic Passage:** a real ornate corridor with golden sunlight and a strong vanishing point. Suggests entering another world and is less literal, but the portrait source requires careful cropping.
3. Continue refining the sakura/Fuji panorama. Rejected as the only direction because the owner explicitly wants to explore beyond the Japanese concept.
4. Use a crane solely because it appeared in the video. Rejected: the owner liked the palette and mood, not a mandatory crane subject.
5. Use a generated whole-page image or a static screenshot as the homepage. Rejected: the actual application must be built with responsive React/HTML/CSS and accessible controls.

## Decision

- Store both real Pexels photographs as optimised local WebP references in `docs/assets/`, with source URL, photographer, source dimensions and licence details in `docs/FEATURED_VISUAL_OPTIONS.md`.
- Store exact copies of the shared Novel/Manga `sun-light.webp` and `sun-dark.webp` assets in `docs/assets/` as the approved branding reference.
- Build a code-rendered prototype that compares both photographs in the same split composition: featured visual on the left, four compact media tiles in a 2 × 2 group on the right.
- Explore a deep brown/walnut, pale-gold and restrained glowing-gold palette. Japanese/sakura motifs are optional.
- Consider a refined display serif with a clean sans-serif for UI. The current CSP is self-only; any web fonts must be properly licensed and self-hosted.
- Keep the current production page, current exact card artwork, six themes, Sepia default, safe Novel/Manga links and accessibility behaviour unchanged until the owner reviews the coded prototype.

## Alternatives rejected and trade-offs

- A literal library is thematically clear but may be too obvious or visually busy.
- An architectural passage is more distinctive and cinematic but is less directly connected to reading/media and is portrait-oriented.
- The final selection must be made from browser screenshots at realistic desktop/mobile sizes, not from source thumbnails alone.
- The photographs are licensed reference material, not public-domain artwork and not permission to redistribute them as standalone stock.

## Security, privacy and rights

- Pexels identifies both photographs as free to use and modify under its [licence](https://www.pexels.com/license/); attribution is not required but is appreciated. Photographer and source links are retained.
- The committed files are local documentation references only. Do not hotlink Pexels at runtime.
- If used in the Hub, self-host optimised copies, retain provenance, and keep `img-src 'self' data:` intact.
- The shared Sun assets are copied byte-for-byte from the user's Novel and Manga repositories. Do not modify those repositories as part of this work.
- No private media, user data, tokens, external APIs or runtime services are introduced.

## Accessibility and responsive requirements

The coded prototype must preserve semantic H1/H2/H3 hierarchy, skip link, keyboard focus, genuine links for Novel/Manga only, inert planned cards, contrast, reduced-motion behaviour, all six themes, 200% zoom reflow and no horizontal overflow. The split must be deliberately reflowed for tablet and mobile rather than merely compressed.

## Validation

- Unit, type, build, static-asset and docs-link checks.
- Chromium, Firefox and WebKit responsive, keyboard and automated WCAG A/AA checks.
- Actual painted screenshots at 1600 × 900, 1366 × 768, 1280 × 720, 768px, 390px and 320px.
- Theme screenshots for at least one light and one dark theme, then all six theme checks.
- Verify exact original card-art hashes, local-only runtime image/font requests, CSP and production release SHA.
- Owner visual review is a separate acceptance gate; green CI is not visual sign-off.

## Rollback

This ADR and its assets do not change runtime code. If the direction is rejected, remove the reference assets and this ADR or mark it superseded. The live Hub remains unchanged. A future implementation must be a separate focused PR with screenshots and rollback instructions.
