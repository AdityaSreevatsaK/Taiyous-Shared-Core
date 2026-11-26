# Accepted architecture and product decisions

**Reconciled: 26 November 2026.** The entries below are historical decision summaries, not a substitute for code. New major decisions should use an ADR/RFC and record supersession, trade-offs, security and rollback.

| ID | Decision | State / evidence |
| --- | --- | --- |
| ADR-001 | Five independent repositories: Shared Core+Hub, Novels, Manga, Anime, Movies & TV | Accepted; [PR #1](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/1) |
| ADR-002 | Place the Hub at `apps/hub` inside Shared Core; defer sixth repo | Accepted; reduce overhead |
| ADR-003 | No always-on Shared Core backend, no mandatory runtime dependency from readers | Accepted |
| ADR-004 | Keep cross-media identity minimal and namespaced; do not replace domain schemas | Accepted; `packages/contracts` experimental |
| ADR-005 | No copied/shared OAuth cookies or implicit SSO across origins | Accepted; future SSO requires threat model |
| ADR-006 | Local `@taiyou/contracts`/`@taiyou/ui` stay private `0.0.0`; require two independent media consumers before publishing | Accepted; [RFC policy](rfcs/README.md) |
| ADR-007 | Honest states for each card, and links only to verified public destinations | **Updated:** Novel **and Manga** live ([PR #14](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/14)); Anime/Movies planned |
| ADR-008 | Six Hub-local themes with persistence and Sepia as first-visit default | Accepted; [PR #15](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/15) supersedes older Midnight-default references |
| ADR-009 | Four portrait tiles across desktop, two on tablet, one on phone; no forced zoom | Superseded by cinematic PR #25; [PRs #14](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/14), [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17) |
| ADR-010 | Hub-specific coded Sunrise logo and SVG favicon were the former Hub brand | Superseded by cinematic gold Sun on PR #25; [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17), [#18](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/18). **Supersedes** raster draft [#12](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/12), closed unmerged |
| ADR-011 | Tiles show exact **original detailed artwork**; labels are HTML rather than text baked into image. Original titles-below composition has since been superseded by ADR-014. | Historically accepted; [#20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20) corrects the incorrect simplified art merged in #19 |
| ADR-012 | Cloudflare Pages auto-builds `master`, but deployment must be independently validated at exact SHA | Accepted; `/release.json`, `verify-hub-live.mjs`, [#13](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/13) |
| ADR-013 | Prioritise Novel/Manga; leave Anime and Movies & TV paused/planned until viable storage plan | Owner direction from ecosystem planning; not an implemented service |
| ADR-014 | Recreate the large, richly layered reference in React/CSS using the exact approved WebP art and real HTML card captions | Implemented in PR #22, then superseded by PR #23's hero-free, smaller centred gallery. It is historical, not the current next direction |
| ADR-015 | Explore a non-Japanese, brown/gold photographic split layout: Golden Archive or Cinematic Passage feature visual on the left, four media tiles on the right, and the shared Novel/Manga Sun logo | **Approved for a coded prototype only**, not production. The credited composite moodboard and shared Sun marks are stored with provenance in [Featured visual options](FEATURED_VISUAL_OPTIONS.md); raw Pexels photos are not separately redistributed. The current live gallery remains unchanged until visual review and owner acceptance |

| ADR-016 | Original hand-drawn Amber Observatory SVG as an early coded test of the reference | Superseded, not loaded by the live interface; [ADR](adr/ADR-016-amber-observatory-hub.md) |
| ADR-017 | Recreate the owner's **cinematic fantasy-library reference** as separate React/CSS layers, curved panels and real semantic actions | Released in PR #25, squash commit `f497b62eab04d67b3f2652f9bf55131417d2b708`; [ADR](adr/ADR-017-cinematic-target-reconstruction.md) |
| ADR-018 | Preserve composition with reference-guided high-resolution source artwork, 900/1600px WebP variants and repaired background | Released in PR #25 with image hashes and responsive browser tests; [ADR](adr/ADR-018-cinematic-artwork-high-density.md) |

| ADR-020 | Replace separate overlapping desktop card bounds/masks/borders with four regions in one shared 1648×928 SVG coordinate system; paired seams have measurable positive gutters, and border paths are no longer clipped by the link's mask | Implemented for cinematic structural fidelity; [ADR](adr/ADR-020-shared-cinematic-portal-geometry.md), PR #28 |
## Rationale that must not get lost

**Independent applications:** Novel and Manga control their own private storage, authentication, reading data, progress, offline behaviour, and release process. Shared Core is a build-time library candidate and optional public gateway. Do not introduce coupling by accident.

**Design fidelity:** A replacement drawing that is “similar” to approved detailed imagery is insufficient. The exact generated illustrations in `apps/hub/public/art/*-art.webp` are versioned and hash-checked. The live layout is the cinematic sunlit fantasy-library Hub from PR #25, with four responsive sculpted portal images and real HTML controls. ADR-015 and ADR-016 are historical explorations only; new image masters are **reference-guided reconstructions**, not pixel-identical originals. The earlier exact approved `*-art.webp` images remain protected for rollback. The real interactive unit remains each verified available card link; planned cards remain inert.

**Accessibility:** Future planned modules are not links and cannot be made keyboard-clickable by decorative UI alone. Real links cover the portrait and heading. The page is real HTML/CSS, not a single composited screenshot.

**Release safety:** Passing tests, merging a PR, recording a Cloudflare status and seeing correct live release SHA are separate assertions. No claims of manual screen-reader pass without manual evidence.

## Open decision records, **not current implementation**
1. Package distribution/versioning and explicit independent consumer contracts.
2. Unified private data/search/collections, if ever needed, including auth, consent and migrations.
3. Possible shared identity provider, CSRF/PKCE/logout/session scope if actual needs justify it.
4. Future project split and cross-app design tokens, only if product scale warrants.
5. Full video-media application hosting and storage economics; currently deferred.
6. Any future change to public hosting privacy/access controls or branded logo artwork.

## New ADR process

Write a `docs/adr/NNN-short-title.md` with **Status, Context, Options, Decision, Alternatives rejected, Security/privacy, Cost/operations, Accessibility, Data migration, Compatibility, Tests, Rollback and Owner sign-off**. Add a link here. Existing accepted decisions should be **superseded** by a new record rather than silently rewritten; this summary explicitly annotates known supersessions.
