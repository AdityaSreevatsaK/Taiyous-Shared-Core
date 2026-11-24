# Cinematic Taiyou Hub: production release checkpoint

**Release date:** 24 November 2026  
**Product commit:** `f497b62eab04d67b3f2652f9bf55131417d2b708`  
**Release PR:** [#25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25), squash merged into `master`  
**Public site:** https://taiyous-shared-core.pages.dev/  
**Historical preceding production commit:** `743ef87e377d41c047f2e343a40752bfc3b584b7`

> The product SHA above is a **verified release checkpoint**, not a promise that it remains the latest SHA after subsequent documentation-only merges. Always compare current `master`, the live `/release.json`, matching GitHub Actions and Cloudflare response before claiming present status.

## Source-of-truth design and actual features

The owner approved proceeding with the next steps on 24 November 2026 after several rounds of screenshot-based visual iteration. The authoritative design reference is the cinematic sunlit **fantasy library** image, not the earlier scenic four-poster gallery or the flat vector observatory prototype.

The deployed static React Hub now implements:
- An architectural library environment with a sun window, balconies, lanterns, armillary sphere, finely drawn gold Sun symbol and warm amber lighting.
- Four independently masked and gilded destination panels, with real **HTML** headings, statuses and action elements over locally hosted cinematic artwork. The page is not a flattened screenshot.
- Novel and Manga as whole-panel owner-verified HTTPS links with `no-referrer`; Anime and Movies & TV as inert planned modules.
- Responsive desktop sculpted composition, tablet two-column and mobile single-column reflow; usable semantics, keyboard focus/skip link, reduced motion, screen-reader labels and six Hub-local persisted themes, with **Sepia** default.
- Header-local search and reading-space shortcuts. These are **navigation-only** tools: no unified account, media API, user progress, private catalogue or synchronisation.

Visual details were adjusted against browser screenshots; there are unavoidable image-level differences from the original single generated composition. Do not call the implementation pixel-identical.

## Image provenance, optimisation and rollback

- Four reference-guided regenerated masters are represented as separate, high-quality `cinematic-*-1600.webp` and `cinematic-*-900.webp` files. The app uses `srcSet`/`sizes` so lower-density devices can download smaller variants and high-density displays can select sharper sources.
- The repaired `hero-clean.webp` background removes duplicated portal fragments from the architectural photograph without modifying destination UI.
- Historical detailed `*-art.webp`, original `reference-*.webp`, `hero-grand-library.webp`, and the vector prototype `amber-observatory.svg` are retained for provenance, regression checks and rollback. **They are not the current live portal images.** Avoid deleting or optimising them without auditing the static verifier, source references and recovery requirements.
- Static tests validate exact SHA-256 media hashes, local assets and the strict Cloudflare response policy.
- The source masters and derivation limits are documented in [ADR-018](adr/ADR-018-cinematic-artwork-high-density.md); layout and art direction in [ADR-017](adr/ADR-017-cinematic-target-reconstruction.md). The former Golden Archive/Cinematic Passage proposal ([ADR-015](adr/ADR-015-photographic-split-layout-exploration.md)) and flat vector prototype ([ADR-016](adr/ADR-016-amber-observatory-hub.md)) are **historical, superseded concepts**.

## Release verification and measured performance evidence

- [PR #25 matching-head CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45344938896) passed Node 22 locked-install build and tests on Ubuntu/Windows, and Chromium/Firefox/WebKit responsive, interaction, keyboard and automated axe WCAG A/AA testing.
- [Production HTTP/security/deployment smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238) **passed**, matching the live release manifest to `f497b62eab04d67b3f2652f9bf55131417d2b708`, confirming HTTP 200, expected CSP and other security headers, the React mount and early theme bootstrap.
- [Post-merge production CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) started on that exact product SHA. Check its final result before calling the post-merge build fully green.
- The Ubuntu production build log reported a JavaScript entry of **155.64 kB (50.61 kB gzip)** and stylesheet of **15.88 kB (4.62 kB gzip)**. These are **bundle sizes**, not measured real-user page speed, LCP, INP or CLS. No performance score is claimed.
- Cross-browser screenshot artefacts were captured from the actual React application, including **1648 × 928** desktop and **320/390px** mobile. GitHub screenshot artefacts expire; consult the matching run's artefact list before relying on retained screenshots.

## Remaining acceptance items

Automated coverage is evidence for the tested browsers and viewports, **not** proof of:
- Physical iPhone/iPad Safari/touch, 200% zoom in a user's real browser, manual NVDA/VoiceOver and high-DPI display visual acceptance.
- A hands-on public-origin navigation/return-path test of both independent readers and explicit owner confirmation of their public domain ownership.
- Real-user Core Web Vitals/performance under constrained mobile network and CPU.
- Cloudflare dashboard-level rollback configuration. A source revert and revalidated live release remain the fallback.

Track these without blocking the already approved safe visual release in [release issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7). Do not close it while manual acceptance remains outstanding.

## Future changes

The Hub is in **maintenance and evidence-led visual polish**, not another wholesale redesign. Avoid changing the four original subject compositions, turning planned destinations into links or adding a cross-app service. Two unpublished `@taiyou/*@0.0.0` workspaces remain private and unversioned for consumers. For a regression, revert the targeted release commit or recover a previously reviewed Cloudflare deployment, then verify actual live SHA and headers.
