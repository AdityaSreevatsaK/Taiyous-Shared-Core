# Shared Core and Personal Hub roadmap

**Reconciled: 21 November 2026.** Status keys: `[x]` implemented and verified in code/history; `[ ]` pending or requires additional evidence. For historic reasoning, see [History](PROJECT_HISTORY.md). This roadmap is **not** authorisation to implement deferred features.

## P0. Foundation and boundaries: completed
- [x] Five-repository independent-app design, with Hub hosted inside Shared Core.
- [x] Experimental, local-only `@taiyou/contracts` and `@taiyou/ui` workspaces.
- [x] React 18, TypeScript strict, Vite, Node 22 npm-workspace lockfile.
- [x] `AGENTS.md`, architecture, contracts, security, integration, decision and RFC rules.
- [x] Real Ubuntu/Windows CI with locked installs, checks and production dependency audit.
- [x] Chromium/Firefox/WebKit automated responsive, keyboard and WCAG A/AA coverage.
- [x] Explicit avoidance of cross-app auth, database, private media and runtime dependency.
- [ ] Review and optionally set GitHub repo description/topics/website metadata if not already set. Do not misrepresent this as code deployment.

## P1. Personal Hub design: implemented, with manual follow-ups
- [x] Four stable tiles: Novel, Manga, Anime, Movies & TV.
- [x] Verified production links to independent Novel and Manga readers; planned cards remain noninteractive.
- [x] More balanced 4 × 1 desktop gallery of midsize illustrated posters, 2 × 2 tablet, 1 × 4 phone and zoom-friendly reflow; prominent scenic background, no visible welcome or motto.
- [x] Six persistent Hub themes; Sepia default and CSP-compliant theme bootstrap.
- [x] Sakura sunrise landscape, warm brown/gold masthead and original Hub-specific Sunrise SVG/favicons.
- [x] **Exact owner-approved detailed WebP artworks** remain unchanged and hash-verified (PR #20). The current hero-free midsize gallery and native HTML card overlays are implemented in PR #23.
- [x] Golden Archive and Cinematic Passage licensed photo references, plus the exact shared Novel/Manga Sun marks, are stored locally in `docs/assets/` with provenance. They are documentation assets only.
- [ ] Build both photographic split-layout prototypes using the same left-feature/right-2×2-card composition; compare actual browser screenshots and responsive crops.
- [ ] Use the shared Sun mark in the prototype and remove the current redundant header subtitle; validate the logo variant across all six themes.
- [ ] Obtain owner visual acceptance of the coded prototype before changing the live homepage. The current production design remains the PR #23 scenic gallery until then.
- [x] Real semantic links, keyboard focus, skip link, reduced motion and automated accessibility.
- [x] Desktop viewport-fit/no-horizontal-overflow Playwright tests and image-decoded screenshots.
- [ ] Manual NVDA/VoiceOver walkthrough with recorded results, across representative themes.
- [ ] Owner's final visual sign-off on current actual live deployment at varied desktop/mobile sizes.
- [ ] Targeted 200% browser zoom, touch and native-device Safari manual acceptance.
- [ ] Periodic performance/Core Web Vitals review after changes; optimise only with measured evidence.

## P2. Release, deployment and resilience: largely implemented
- [x] Connected Cloudflare Pages Git integration on `master`.
- [x] Live Hub at `https://taiyous-shared-core.pages.dev/`.
- [x] Strict `_headers` security response policy, static verifier and live HTTP/security smoke.
- [x] Public `/release.json` contains exact deployed SHA; smoke compares it with the triggering `master` commit.
- [x] Latest verified production baseline at the start of this update: `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc`, with successful [CI run 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995) and [live smoke run 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985). Recheck exact SHA after every later merge.
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
1. Build two coded variants of the approved split layout, using the stored Golden Archive and Cinematic Passage photographs and the shared Sun mark; keep the current production site unchanged.
2. Compare real browser screenshots at desktop, tablet, mobile and 200% zoom, across light and dark themes; inspect crop, typography, card balance and accessibility.
3. Ask the owner to select the visual direction and final copy before a production implementation PR.
4. Keep the exact approved media-card artwork, verified Novel/Manga links, six themes, CSP and independent release checks intact.
5. Continue manual NVDA/VoiceOver and native-device acceptance; tackle shared components only after two independent media-app consumers provide evidence.
