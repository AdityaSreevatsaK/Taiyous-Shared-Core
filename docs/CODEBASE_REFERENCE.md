# Codebase reference and technical inventory

**Last audited:** 21 November 2026, against `master` at `55046158c38b0ccb6fa6d80c37c2866ee3d676cd` before this documentation change. If code changes later, reassess the relevant source files and release checks. This document describes **implemented source**, not an architecture wish list.

## 1. In one paragraph

This is a **Node 22+ npm-workspaces monorepo** containing a small React 18/TypeScript/Vite static Personal Hub and two **private, unpublished** local packages. It has no runtime backend, OAuth, private-data access, database, service worker, or server-side cross-app integration. Cloudflare Pages publishes the Hub from `master`, and GitHub Actions independently checks quality and the deployed exact SHA.

```text
Taiyous-Shared-Core/
├── apps/hub/               Static Personal Hub, Vite + React + TS
├── packages/contracts/     Experimental namespaced shared types/helpers
├── packages/ui/            Experimental stateless MediaHubCard component
├── docs/                   Architecture, history, decisions, security and handovers
├── scripts/                Build/live checks + optional maintainers' scripts
├── .github/workflows/      Quality CI and independent live deployment smoke
├── AGENTS.md               Mandatory agent rules
├── CONTRIBUTING.md         Safe change workflow
├── README.md               Human entry point
├── package.json            Root npm workspaces and command orchestration
└── package-lock.json       Reproducible root dependency lock
```

## 2. Technology stack and runtime topology

| Layer | Actual technology | Current use |
| --- | --- | --- |
| Runtime/build | Node.js >=22; npm workspace lockfile | Install and package orchestration |
| Language | TypeScript ~5.9, strict | Hub and both local packages |
| Frontend | React 18, ReactDOM | One-page navigation interface |
| Bundler | Vite 6, @vitejs/plugin-react | Static production assets |
| Styling | Plain scoped Hub CSS variables/media queries | Six themes and responsive composition |
| State | React `useState`/`useEffect` | Selected theme only |
| Persistence | Browser localStorage | `taiyou-hub-theme`, no personal catalogue |
| Unit tests | Vitest 5 | Contracts, catalogue, theme and semantic render checks |
| Browser tests | Playwright | Chromium, Firefox, WebKit viewports/focus/links/images |
| Accessibility | axe-core via @axe-core/playwright | Automated WCAG 2.0/2.1 A/AA checks |
| CI | GitHub Actions | Node 22 Ubuntu/Windows; three-browser checks |
| Hosting | Cloudflare Pages, connected to `master` | Static live Hub |
| External navigation | HTTPS links only | Novel and Manga public frontends |
| Media/private storage | **None in this repo** | Independent apps own these |
| Shared package registry | **None** | Packages remain `0.0.0`, private and unpublished |

Do **not** infer a central database, storage adapter, API, identity provider or shared login from the package names.

## 3. Hub page composition and data flow

```text
apps/hub/index.html
   ├─ local /theme-bootstrap.js restores stored theme before React
   └─ apps/hub/src/main.tsx mounts <App />
        ├─ theme.ts: six themes, selected in header, persisted locally
        ├─ catalogue.ts: deterministic four-module registry
        │    ├─ novels: built-in verified HTTPS URL
        │    ├─ manga: built-in verified HTTPS URL
        │    └─ anime, movies-tv: planned unless verified public URL configured
        └─ packages/ui/MediaHubCard
             ├─ available + safe href -> <a> wraps art + visible heading
             └─ planned/unsafe/missing href -> inert <article>
```

Page semantic structure:
- First-focus skip link to `#libraries`.
- Header: real `/` brand link, SVG sunrise image, decorative sakura, native theme `<select>`.
- Main: one **visually hidden semantic page H1** (no visible welcome/motto block), then the `#libraries` section with visually hidden H2.
- One `<ul>` with **four** `<li>` cards in fixed order.
- The current Hub uses `MediaHubCard immersive`: the 3:4 illustration fills each card, with a lower CSS gradient and **real HTML heading, description, availability and CTA**. The older `imageOnly` variation with title beneath remains available for potential consumers but is **not the live Hub layout**.
- Footer: “Created by Taiyou”, ornamental seigaiha waves.

There is no client router, no login route and no fetch to a media or Hugging Face dataset from Hub runtime. The external links leave the Hub origin.

## 4. Key source files and responsibilities

| File | Why agents must inspect it before changes |
| --- | --- |
| `apps/hub/src/App.tsx` | Exact text, card ordering, live artwork paths, page semantics and theme control |
| `apps/hub/src/styles.css` | Header/hero/grid/landscape/portrait layout, responsive fit, theme tokens, reduced motion; the 21 November stylesheet was consolidated to remove stacked historical overrides |
| `apps/hub/src/catalogue.ts` | Public URL registry, known Novel/Manga destinations and validation |
| `apps/hub/src/theme.ts` | `HUB_THEMES`, Sepia fallback, localStorage update, meta theme colour |
| `apps/hub/public/theme-bootstrap.js` | Pre-React persisted-theme restoration; strict CSP forbids inline scripts |
| `apps/hub/public/_headers` | Cloudflare CSP, framing, referrer and other response security policy |
| `apps/hub/index.html` | Root mount, boot script, meta theme colour, favicon |
| `apps/hub/vite.config.ts` | Injects public SHA-only `release.json` from trusted build variables |
| `packages/contracts/src/index.ts` | Experimental MediaKind, ModuleKey, MediaIdentity, MediaModule, rating validator |
| `packages/ui/src/index.tsx` | Pure `MediaHubCard`; safe available/planned markup and immersive, legacy portrait-only and fallback variants |
| `scripts/verify-hub-static.mjs` | Assertions on built assets, security policy and **exact approved artwork digests** |
| `scripts/verify-docs.mjs` | Confirms mandatory handover files and all local Markdown targets exist (offline CI) |
| `scripts/verify-hub-live.mjs` | External HTTPS/security response and deployed exact-commit check |
| `.github/workflows/ci.yml` | Ubuntu/Windows quality plus Chromium/Firefox/WebKit browser jobs |
| `.github/workflows/live-hub.yml` | `master`-push independent live Cloudflare smoke; also manual dispatch |
| `apps/hub/tests/*.spec.ts` | Browser geometry, accessibility, theme, real-link policy, screenshot evidence |
| `apps/hub/tests/visual-evidence.ts` | Image-decode/compositor-safe screenshot helper with per-card painted-pixel checks |
| `docs/ILLUSTRATED_HOMEPAGE.md` | Evolution of approved visual composition and final exact-artwork requirement |

A style edit must inspect the **bottom of `styles.css`**, which includes successive reference-fidelity refinements. Do not assume an earlier selector declaration wins.

## 5. Links and availability semantics

Known public destinations in `apps/hub/src/catalogue.ts`:
- Novel Library: `https://taiyous-personal-library.pages.dev/`
- Manga Library: `https://taiyous-manga-library.pages.dev/`
- Anime: no current public destination; planned.
- Movies & TV: no current public destination; planned.

`createHubModules()` always returns four modules in that order. `publicHttpsDestination()` rejects non-HTTPS, embedded username/password, custom port, query/fragment, invalid/publicly suspicious hostnames, localhost and IP-literal patterns. The component has a second defensive URL check. These are **syntactic safety checks, not domain ownership verification**; an owner must verify any newly configured domain before enabling it.

The public `.env.example` contains `VITE_NOVELS_URL`, `VITE_MANGA_URL`, `VITE_ANIME_URL`, `VITE_MOVIES_TV_URL`. Vite includes any configured `VITE_*` values in public JavaScript. **Never place credentials, private media identifiers or personal data there.** Do not activate planned sites merely because a plausible URL string exists.

## 6. Visual system, assets and exact art provenance

### Current Hub-specific branding
- Header Sun: `apps/hub/public/branding/hub-sun-logo.svg`
- SVG favicon: `apps/hub/public/branding/hub-sun.svg`
- Header blossom ornament: `apps/hub/public/branding/header-sakura.svg`
- Landscape: `apps/hub/public/art/landscape.avif`
- Footer decoration: `apps/hub/public/art/waves.svg`

### Current card art, do not substitute
- `apps/hub/public/art/novels-art.webp`
- `apps/hub/public/art/manga-art.webp`
- `apps/hub/public/art/anime-art.webp`
- `apps/hub/public/art/movies-tv-art.webp`

All four visible portraits were cropped from the **approved detailed four-panel artwork**. They are self-hosted 1086 × 1448 WebP files, with **no text inside**. The new cinematic captions, status and labels are rendered as HTML/CSS inside each poster over a gradient, not part of the art. The exact SHA-256 values are in `scripts/verify-hub-static.mjs` and must remain the authoritative acceptance check. The old `novels.avif`, `manga.avif`, `anime.avif` and `movies-tv.avif` were earlier complete poster cards and are not the current UI. An older alternative raster logo/favicons pack is documented only for possible later choice; PR #12 is unmerged/superseded for the Hub.

### Theme system
`HUB_THEMES = ['midnight','charcoal','plum','sepia','paper','ocean']`.
- First visit/invalid preference: **Sepia**.
- `theme-bootstrap.js` restores from localStorage before the main React bundle and sets `data-theme`.
- `theme.ts` applies `data-theme`, saves preference and sets the browser meta theme colour.
- CSS variables keep themes local to the Hub. They are not distributed shared CSS or global ecosystem preferences.
- Respect keyboard navigation, contrast and reduced-motion preference. Check at all responsive widths and the six theme combinations if altering tokens.

## 7. Behaviour at different viewport sizes

- Desktop `>=1100px`: **4 × 1 midsize gallery** (around 230–310 CSS px per poster), centred in the landscape; welcome/motto hero removed to give Fuji/sakura more breathing room.
- Tablet `>620px` and below desktop breakpoint: **2 × 2**.
- Phone `<=620px`: **1 × 4** vertical stack.
- Widths at minimum **320, 390, 640/768, 800 and 1280** are covered in browser tests, plus desktop 1280×720, 1366×768, 1600×900, 1920×768 and 1920×1080.
- At 200% zoom, normal vertical scrolling is expected; **horizontal overflow is not**.
- The desktop fit is a testable requirement, but it is not a licence to clip content, hide focus outlines, block scrolling at accessibility zoom or shrink touch targets.
- Images load from local paths and are decoded before screenshot capture. When changing image markup/CSS, capture and **visually inspect real pixels**, not only image element counts.

## 8. Local setup

From a clean checkout using **Node.js 22+ and npm**:

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run build
node scripts/verify-hub-static.mjs
npm run verify:docs
npx playwright install chromium firefox webkit
npm run test:browser
npm run dev
```

Local Hub default: `http://127.0.0.1:5173`. `npm run dev` builds both local packages, then starts Vite. The workspace lockfile is committed; **do not silently re-resolve it**.

`npm run test:browser` runs Playwright after local-package builds; individual browser filters can be passed to the Hub workspace runner as shown in CI:

```bash
npm run test:browser -w @taiyou/hub -- --project=chromium
```

Windows PowerShell is supported for the normal npm commands. The optional `.ps1` maintenance scripts are not required by production builds. Keep their manual nature explicit and never execute them automatically as part of a docs task.

## 9. Tests and evidence

Unit:
- `packages/contracts/src/index.test.ts`: namespaced IDs, rating limits.
- `apps/hub/src/catalogue.test.ts`: fixed module order, validated URLs, planned vs live.
- `apps/hub/src/theme.test.ts`: valid themes, fallback and theme behaviour.
- `apps/hub/src/App.test.tsx`: semantic code-rendered editorial cards, titles, links, skip/theme control.

Browser:
- `apps/hub/tests/navigation.spec.ts`: 4/2/1 grid, keyboard, link navigation and no-referrer, reduced motion, image load and screenshot capture.
- `apps/hub/tests/viewport.spec.ts`: full desktop viewport composition, no horizontal overflow at zoom/mobile, 1086 × 1448 original resolution.
- `apps/hub/tests/themes.spec.ts`: six persistent themes, text/title access, WCAG.
- `apps/hub/tests/accessibility.spec.ts`: automated axe on multiple viewports.

CI:
- `ci.yml`: Node 22 Ubuntu/Windows typecheck, unit, production build and static verification; production-only high/critical `npm audit`; Chromium/Firefox/WebKit browser tests; seven-day screenshot artefacts.
- `live-hub.yml`: `master` commit-specific HTTPS `/release.json`, headers, React mount and theme bootstrap, with bounded retry during Cloudflare propagation.

Historical demonstrated merge: [PR #20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20), source commit `55046158c38b0ccb6fa6d80c37c2866ee3d676cd`. Its independent live smoke was [run 44805000465](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465), and main CI was [run 44805000532](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532). Both succeeded at that revision. Always retrieve newer evidence for newer code.

**Automated checks do not equal manual NVDA/VoiceOver sign-off**, device-Safari validation, verified ownership of future external destinations or a full user acceptance test.

## 10. Hosting and release identity

```text
GitHub repository: AdityaSreevatsaK/Taiyous-Shared-Core
Canonical branch: master
Cloudflare Pages project: taiyous-shared-core
Live URL: https://taiyous-shared-core.pages.dev/
Build from repository root: npm ci --no-audit --no-fund && npm run build
Static output: apps/hub/dist
Node runtime: 22+
```

Cloudflare Pages is **Git-connected** to `master`. There is no direct deployment action in ordinary GitHub CI. Source commits to master can trigger hosting automatically; the separate GitHub live-smoke workflow must then observe the matching SHA at `/release.json`.

Production `_headers` controls CSP, frame protection, referrer, content type, browser permissions and same-origin asset policy. Review actual headers on the served site, not only the local built `_headers` copy.

If the current build is healthy but production remains stale: check Cloudflare Pages integration, build settings, current deployment and the `release.json` response, **not** simply rerun unit tests and pronounce success.

## 11. Experimental reusable packages

`@taiyou/contracts@0.0.0`:
- `MediaKind = 'novel' | 'manga' | 'anime' | 'movie' | 'tv'`
- `ModuleKey = 'novels' | 'manga' | 'anime' | 'movies-tv'`
- `ModuleAvailability = 'available' | 'planned'`
- `MediaIdentity { kind, namespace, localId }`
- `mediaKey(identity)`: constructs `kind:namespace:localId` with restricted URL-safe segments
- `PersonalMediaMetadata`: conceptual rating/tags/notes/updatedAt shape, **not** the real Novel/Manga storage schema
- `validPersonalRating`: integer 1–10.

`@taiyou/ui@0.0.0`:
- Presentational `MediaHubCard`, no data fetch/auth/persistence.
- `immersive` is the live code-rendered editorial card with lower gradient/title/description/status/CTA; `imageOnly` is a preserved legacy portrait-with-title-below variant; default older variant retains detailed card copy.
- Available links only when a syntactically safe HTTPS destination exists; planned cards do not navigate.

Neither package has a cross-repository release, second consumer, published version, independent adoption pipeline or implied semver compatibility. Read [Data contracts](DATA_CONTRACTS.md), [Reuse inventory](REUSABILITY_INVENTORY.md) and the [RFC process](rfcs/README.md) before extraction.

## 12. Safe modification guide

- **Artwork change:** retrieve exact approved pixels; preserve 3:4; update asset paths, digest checks, unit/browser tests and visual docs; inspect live screenshots.
- **Brand change:** preserve current Hub-specific SVG unless expressly asked; do not import old raster branding as if still pending.
- **Link activation:** owner-verifies deployed HTTPS origin, updates registry/config, tests safe URL and link semantics, then smoke-tests target; never introduce a fake link.
- **Theme change:** keep pre-React bootstrap, localStorage compatibility, strict CSP, all theme contrast and error-safe storage.
- **Package change:** RFC with two independent media consumers and version/migration/rollback before exports are treated as stable.
- **Security change:** no weakening CSP or cross-app auth without written decision and dedicated tests.
- **Release:** focused PR, matching-SHA green CI, merge, independent matching-SHA live smoke, manual visual/keyboard/accessibility inspection where applicable.

This guide is a **map**. It cannot replace inspecting the actual target file/diff before touching code.
