# Quality and Verification Matrix

## Automated coverage
- `packages/contracts/src/index.test.ts`: namespaced identities, invalid segments and 1–10 rating boundaries.
- `apps/hub/src/catalogue.test.ts`: registry of four library tiles, known Novel URL, absent/planned destinations and rejection of unsafe URL inputs.
- `apps/hub/src/App.test.tsx`: four text-free original artwork cards with visible HTML headings, skip link, **two verified live links**, and two passive planned tiles.
- `apps/hub/tests/navigation.spec.ts`: Chromium/Firefox/WebKit viewport/no-overflow at 320/390/768/1280 CSS px, keyboard focus, reduced motion and exact destination semantics; creates local non-sensitive review screenshots.
- `apps/hub/tests/accessibility.spec.ts`: automated axe-core WCAG 2.0/2.1 A/AA checks at 320/390/768/1280 CSS px. Verified cross-browser example: [PR #5 run 44316165382](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44316165382) passed 13 tests per engine (39 total) at SHA `c5d746070609f28f9975d4a68d9b8855e9bcd667`.
- `.github/workflows/ci.yml`: clean Node 22 `npm ci`, typecheck, unit tests and builds on Ubuntu/Windows; Chromium/Firefox/WebKit browser tests, per-engine non-sensitive screenshots and production dependency advisory gate on Ubuntu.

## Historical and latest verified evidence
GitHub Actions initially failed to allocate runners. After source visibility changed, [run 44279776833 attempt 2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44279776833) succeeded with 20 unit tests and build at `92ab67838f05a7a91b4511946ccb2df76aa51027`.

[Run 44313286935](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44313286935) passed at `68e55bfa22510733bed208e9fedeeb7038deefe4`: both OS quality jobs (20 unit tests each) plus Chromium browser job (7 tests), all using the real committed lockfile and `npm ci`. A later lockfile update added `@axe-core/playwright` via a temporary Node 22 workflow; new tests are **not** considered verified until their matching run succeeds. Read the actual latest job before reporting a pass.

## Local reproduction
```bash
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

Browser tests start a temporary local Vite server with all future module URLs explicitly blank, never navigate to private media APIs and cannot fetch user catalogue data.

## Additional release gates
Manual browser/screen-reader review (VoiceOver/NVDA), 200% zoom, touch usability, native macOS Safari coverage, CSP and frame/referrer headers on the **actual deployed** origin, destination domain ownership, performance/bundle review and owner-approved visual review/deploy/rollback. Axe passing does not prove all accessibility requirements. A green CI run is **not** proof of production deployment or independent media-app integration.

## Current exact-artwork release coverage (21 November 2026)

- `apps/hub/tests/themes.spec.ts`: verifies six persistent themes, decorative image semantics, visible headings and planned state announcements.
- `apps/hub/tests/viewport.spec.ts`: tests normal desktop viewport fit and zoom-equivalent reflow, plus 1086×1448 native artwork sizes.
- `apps/hub/tests/navigation.spec.ts`: screenshots after WebP image decode and a compositor paint interval, preventing blank early visual captures. The tests verify Novel/Manga no-referrer navigation and planned tiles' noninteractive semantics.
- `scripts/verify-hub-static.mjs`: checks the exact SHA-256 digests of each **approved detailed** `*-art.webp`, not merely image filename/width.
- Last historically verified artwork release [PR #20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20), [quality run 44805000532](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532), [live run 44805000465](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465) at `55046158c38b0ccb6fa6d80c37c2866ee3d676cd`.

**Do not conflate** historic green runs with the latest source revision or treat automated WCAG checks as manual NVDA/VoiceOver confirmation. For failures and lessons, see [Project history](PROJECT_HISTORY.md).
