# Quality and Verification Matrix

## Automated coverage
- `packages/contracts/src/index.test.ts`: namespaced identities, invalid segments and 1–10 rating boundaries.
- `apps/hub/src/catalogue.test.ts`: registry of four library tiles, known Novel URL, absent/planned destinations and rejection of unsafe URL inputs.
- `apps/hub/src/App.test.tsx`: four exact text-free original artwork cards with visible HTML headings, descriptions, availability and CTA content rendered in HTML/CSS, skip link, **two verified live links**, and two passive planned tiles.
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
- Latest verified production baseline at this documentation update: [PR #23](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/23), [quality run 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995), [live run 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985) at `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc`.

**Do not conflate** historic green runs with the latest source revision or treat automated WCAG checks as manual NVDA/VoiceOver confirmation. For failures and lessons, see [Project history](PROJECT_HISTORY.md).

## Documentation integrity gate

`npm run verify:docs` runs `scripts/verify-docs.mjs` without network or dependencies. It fails CI if mandatory handover/architecture files disappear or a Markdown relative link points outside the repository or to a nonexistent file. It does **not** validate external website URLs or prove content freshness; future agents must still reconcile docs with current code and CI/deployment evidence.


## Cinematic reference implementation test gates (21 November 2026)

The new `immersive` variant is tested independently from the legacy `imageOnly` variant. Assertions cover four real HTML headings, descriptions, statuses and CTA labels over exact unchanged WebP assets; two available anchors, two inert planned articles and a safe HTTPS/no-referrer policy. A 1600 × 900 browser test verifies that the four cards span the major portion of the desktop width, remain inside the viewport, and the full scenic background remains present. Playwright captures both **Sepia and Charcoal** review screenshots after image decoding and painting. Additional existing cross-browser (Chromium/Firefox/WebKit), viewport, 200% zoom, keyboard, theme persistence and axe A/AA tests remain required.

Visual testing must compare the *resulting app* to the owner's reference image rather than accepting any green build as proof of aesthetic quality.

### Prevent false-green screenshot evidence

The visual evidence helper `apps/hub/tests/visual-evidence.ts` captures the **actual rendered screenshot**, then samples the upper illustrated area of all four posters using a local browser canvas. It accepts a screenshot only when all four panels have non-uniform painted pixels, retrying briefly after WebP decode if compositing is still in progress. This closes the real regression where screenshots contained plain blank colour panels even though `img.decode()` and image dimensions had passed. The helper does not fetch remote images and does not use OCR or production data.


## Hero-free gallery regression checks (21 November 2026)

Unit tests assert the welcome copy and motto are absent, but a visually hidden H1 still exists. Browser tests at 1600 × 900 bound the four-card poster width to a balanced 255–310 CSS px and check that substantial margins expose the background. Existing one-screen desktop fit, tablet/mobile reflow, local-only image requests, painted-pixel screenshot verification, theme persistence and WCAG checks remain mandatory.


A first visual-review capture also exposed a large flat-colour band where a negatively offset `background-size:cover` image ended before the footer. The fix uses centred `50% 45%` positioning so scenery covers the entire main area; a Playwright computed-style check guards the placement. Screenshots in both Sepia and Charcoal are reviewed on every Hub visual PR.


## Documentation-only design assets

`npm run verify:docs` also verifies that the local WebP reference images under `docs/assets/` exist, have valid RIFF/WEBP signatures, remain within the documented size budget, and that the copied shared Sun marks retain their exact source SHA-256 values. These files are **not** app runtime assets and are not included in the Vite build. This gate protects the provenance package, not visual implementation. The future split-layout prototype still requires real browser screenshots and owner visual review.
