# Accepted architecture and product decisions

**Reconciled: 21 November 2026.** The entries below are historical decision summaries, not a substitute for code. New major decisions should use an ADR/RFC and record supersession, trade-offs, security and rollback.

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
| ADR-009 | Four portrait tiles across desktop, two on tablet, one on phone; no forced zoom | Accepted; [PRs #14](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/14), [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17) |
| ADR-010 | Hub-specific coded Sunrise logo and SVG favicon are the current Hub brand | Accepted; [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17), [#18](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/18). **Supersedes** raster draft [#12](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/12), closed unmerged |
| ADR-011 | Tiles show exact **original detailed artwork** only, with separate visible titles underneath; no text/buttons baked into image | Accepted; [#20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20) corrects the incorrect simplified art merged in #19 |
| ADR-012 | Cloudflare Pages auto-builds `master`, but deployment must be independently validated at exact SHA | Accepted; `/release.json`, `verify-hub-live.mjs`, [#13](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/13) |
| ADR-013 | Prioritise Novel/Manga; leave Anime and Movies & TV paused/planned until viable storage plan | Owner direction from ecosystem planning; not an implemented service |

## Rationale that must not get lost

**Independent applications:** Novel and Manga control their own private storage, authentication, reading data, progress, offline behaviour, and release process. Shared Core is a build-time library candidate and optional public gateway. Do not introduce coupling by accident.

**Design fidelity:** A replacement drawing that is “similar” to approved detailed imagery is insufficient. The exact generated illustrations in `apps/hub/public/art/*-art.webp` are versioned and hash-checked. The image-and-title UI is distinct from old full poster cards with printed titles and fake buttons.

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
