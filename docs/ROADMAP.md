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
- [x] Dramatically larger 4 × 1 full-width desktop editorial posters, 2 × 2 tablet, 1 × 4 phone and zoom-friendly reflow; scenic background continues behind cards.
- [x] Six persistent Hub themes; Sepia default and CSP-compliant theme bootstrap.
- [x] Sakura sunrise landscape, warm brown/gold masthead and original Hub-specific Sunrise SVG/favicons.
- [x] **Exact owner-approved detailed WebP artworks** remain unchanged and hash-verified (PR #20). The original titles-below layout was superseded by the 21 November cinematic React/CSS composition using larger posters and native HTML overlays.
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
- [x] CI verified last documented approved-artwork merge `55046158c38b0ccb6fa6d80c37c2866ee3d676cd`, including successful [CI run 44805000532](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532) and [live smoke run 44805000465](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465).
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
1. Complete owner-reviewed live visual + manual screen-reader/accessibility acceptance without changing the approved art.
2. Fix any findings in focused, test-backed PRs, keeping exact-original artwork checks.
3. Consolidate style overrides only with screenshot comparison and rollback evidence; avoid unrelated CSS churn.
4. Maintain a current exact-commit deployment status and coherent documentation after every UI change.
5. Tackle a minimal truly shared component **only after** independently documented consumer demand.
