> **Released visual baseline (24 November 2026):** The owner approved the finished cinematic fantasy-library Hub. [PR #25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25) merged to `master` at `f497b62eab04d67b3f2652f9bf55131417d2b708`; [production exact-SHA live smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238) and [post-merge CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) passed. The earlier Golden Archive/Cinematic Passage and flat-vector exploration are historical. Full details: [cinematic release record](RELEASE_2026-11-24_CINEMATIC_HUB.md).

# Shared Core and Personal Hub roadmap

**Reconciled: 24 November 2026.** Status keys: `[x]` implemented and verified in code/history; `[ ]` pending or requires additional evidence. For historic reasoning, see [History](PROJECT_HISTORY.md). This roadmap is **not** authorisation to implement deferred features.

## P0. Foundation and boundaries: completed
- [x] Five-repository independent-app design, with Hub hosted inside Shared Core.
- [x] Experimental, local-only `@taiyou/contracts` and `@taiyou/ui` workspaces.
- [x] React 18, TypeScript strict, Vite, Node 22 npm-workspace lockfile.
- [x] `AGENTS.md`, architecture, contracts, security, integration, decision and RFC rules.
- [x] Real Ubuntu/Windows CI with locked installs, checks and production dependency audit.
- [x] Chromium/Firefox/WebKit automated responsive, keyboard and WCAG A/AA coverage.
- [x] Explicit avoidance of cross-app auth, database, private media and runtime dependency.
- [ ] Review and optionally set GitHub repo description/topics/website metadata if not already set. Do not misrepresent this as code deployment.

## P1. Cinematic Personal Hub design: released, with manual follow-ups
- [x] Four honest destinations in order: Novel, Manga, Anime, Movies & TV. Novel/Manga are whole-panel HTTPS links; future destinations remain noninteractive.
- [x] Owner-selected golden fantasy-library backdrop, four organically sculpted panels, large serif text and restrained gold strokes, implemented in real React/CSS ([PR #25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25)).
- [x] Four high-resolution cinematic image pairs, responsive `srcSet`, repaired architectural backdrop and retained historical art integrity hashes ([ADR-018](adr/ADR-018-cinematic-artwork-high-density.md)).
- [x] Desktop cinematic layout, tablet two columns, mobile one column; automated 320/390/768/1280/1648 viewport and zoom-equivalent reflow checks.
- [x] Six Hub-local persisted themes, Sepia default, strict CSP, reduced-motion, local search/shortcuts, semantic headings and real navigable HTTPS targets.
- [x] Matching-head Ubuntu/Windows tests and Chromium/Firefox/WebKit screenshot/axe checks plus live release SHA verification.
- [ ] Physical native Safari/touch, manual NVDA/VoiceOver, real browser 200% zoom and screen-reader walkthrough.
- [ ] Manual destination navigation/return-path check on the public origin and explicit owner visual acceptance on personal devices.
- [ ] Measure constrained-network load and Core Web Vitals (LCP, INP, CLS), then prioritise evidenced improvements, not speculation.
- [ ] Only after safe recovery/source audits, consider pruning archived unused prototype assets; retain the original owner-approved images and any files required by static integrity tests.

## P2. Release, deployment and resilience: largely implemented
- [x] Connected Cloudflare Pages Git integration on `master`.
- [x] Live Hub at `https://taiyous-shared-core.pages.dev/`.
- [x] Strict `_headers` security response policy, static verifier and live HTTP/security smoke.
- [x] Public `/release.json` contains exact deployed SHA; smoke compares it with the triggering `master` commit.
- [x] Verified cinematic release checkpoint: `f497b62eab04d67b3f2652f9bf55131417d2b708` with successful [CI run 45443821106](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) and [live smoke run 45443821238](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238). Recheck exact SHA after every later merge.
- [ ] Verify and document Cloudflare dashboard settings/rollback mechanism from the operator account when access is available.
- [ ] Periodically inspect live links/headers/asset loading and update only with new evidence.
- [ ] Investigate any real performance, CSP, visual or accessibility regression before accepting a new release.

## P3. Reusable package maturity: deferred until two real consumers
- [ ] Obtain the same explicit requirement from **two independent media apps**, with issue/owner evidence.
- [ ] Draft small RFC with exact API, TypeScript/runtime validation, privacy, accessibility and tests.
- [ ] Compare cost and maintainability against ordinary independent code.
- [ ] Add consumer fixtures, compatibility/version-mismatch tests and semantic version proposal.
- [ ] Design package distribution, permissions, signed/traceable version and rollback.
- [ ] Gain separate consent from consuming app owners; migrate consumers one at a time.
- [ ] Record actual adoption and measurable engineering benefit.
- [ ] Publish packages only after explicit owner approval; existing `0.0.0` workspaces are **not shipped SDKs**.

## P4. Ecosystem direction: deliberate deferrals
- [ ] Consider limited cross-app design tokens only after repeated independent use.
- [ ] Explore optional central search/collections **only if** genuine need justifies private server-side auth, consent, portability and sync/rollback cost.
- [ ] Consider cross-origin SSO only after a full threat model (PKCE, CSRF, callbacks, revocation, sessions).
- [ ] Reassess Anime and Movies & TV applications only after new explicit owner prioritisation and storage/cost feasibility. Current focus is **Novels and Manga**.
- [ ] Consider splitting Hub into its own repository only if maintainership/release cadence diverges materially.

## Do not “complete” these by guessing
There is **no** unified private dataset, owner profile, universal watched/read progress, shared login, source-level imports into sibling applications, video server, media scraper or published library package. They remain explicitly out of scope or future proposals.

## Suggested next safe increments
1. Build two coded variants of the approved split layout, using the source photographs linked in the moodboard documentation and the shared Sun mark; keep the current production site unchanged.
2. Compare real browser screenshots at desktop, tablet, mobile and 200% zoom, across light and dark themes; inspect crop, typography, card balance and accessibility.
3. Ask the owner to select the visual direction and final copy before a production implementation PR.
4. Keep the exact approved media-card artwork, verified Novel/Manga links, six themes, CSP and independent release checks intact.
5. Continue manual NVDA/VoiceOver and native-device acceptance; tackle shared components only after two independent media-app consumers provide evidence.
