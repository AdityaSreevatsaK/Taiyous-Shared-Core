# ADR-017: Faithful cinematic Hub reconstruction from the owner's visual target

- **Date:** 23 November 2026.
- **Status:** Implemented on draft PR #25 for owner review, **not approved for production**.
- **Supersedes as the active direction:** ADR-016's interim vector-art observatory and ADR-015's photographic moodboard.
- **Scope:** `apps/hub` only, plus corresponding Shared Core checks and documentation.

## Decision and source of truth

The owner explicitly identified **Image 1** (a cinematic fantasy library screenshot with a browser address bar) as the authoritative design contract. **Image 2** (the previous amber-observatory vector prototype) is a failure example, not an alternative visual direction. The browser chrome in Image 1 is not part of the application.

The rebuilt page uses **independent React elements**, not a flattened screenshot. Its five local cinematic WebP scene assets were derived from the owner's own generated reference illustration: the architectural library crop and the four illustrated portal crops. The caption/button regions in the crops were removed with image-processing and new text, links, badges, theme and controls are **actual semantic HTML**. Do not treat these reference-derived assets as third-party stock photography or pretend that they were generated independently from the approved image.

## Visual implementation

- One visual environment: towering illuminated library, sun-window, balconies, armillary sphere, lanterns and warm depth.
- Cinematic asymmetric silhouette: original foreground architectural image with a continuously fading dark backdrop behind independent panels, not two visibly disconnected page columns.
- Four unique **path-defined clip masks** (`clipPathUnits=objectBoundingBox`) with precisely related path-stroke overlays and warm gold rim highlights; no ordinary card-grid treatment on desktop.
- Four independent images: amber book/cup, monochrome manga protagonist, dusk anime silhouette, smoky vintage film projector.
- Larger, real editorial titles with ornamental rules and active/disabled status treatment. Novel/Manga are whole-panel HTTPS links, Anime/Movies & TV are inert articles.
- A drawn gold Taiyou Sun mark replaces the unsuitable blue mark in the previous interim prototype.
- Transparent dark cinematic header, persisted native six-theme selector, functional local four-destination search and functional reading-space shortcuts. The profile-like shortcut icon does **not** claim to sign into the independent readers.
- No extra runtime services, login state, media data or external asset requests. All media remains inside this repository with strict original CSP.

## Layout and testing

The desktop composition is anchored in proportional positions measured from the target image; tablet becomes two organically sculpted columns, and mobile reflows into four full-width sculpted panels under the scenic library environment. Text and controls stay responsive and accessible at 320px, 390px and 200% zoom-equivalent widths; reduced-motion mode disables transforms.

Existing approved detailed `*-art.webp` files remain present and byte-identical for rollback, but the redesigned UI does **not** display them. All new WebPs have SHA-256 digests verified by the static build gate. The reference source has not been added as a whole-page flattened image.

`npm ci`, typecheck, unit tests, static security/artwork checks, documentation gate and Chromium/Firefox/WebKit a11y/layout/navigation tests must pass on the actual PR head. Screenshot artefacts are required for visual inspection. A local browser-rendered visual comparison against Image 1 was performed; **pixel-level reproduction is not asserted**. Image crops/inpainted regions, non-identical shapes and the absence of a real shared profile are known differences.

## Owner decision and release

Leave PR #25 in draft. Green tests or a successful branch preview are **not** production acceptance. The owner must compare the review-preview with Image 1 and approve visual fidelity before merge. Release still requires Cloudflare's exact-SHA public smoke; rollback is a PR revert and verified restoration of the earlier deployment.
