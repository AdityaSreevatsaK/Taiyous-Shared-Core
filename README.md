# Taiyou's Shared Core & Personal Hub

> **A live, lightweight media gateway and an experimental, unpublished source-code library.** The Hub links to the independent Novel and Manga readers and reserves non-interactive tiles for future Anime and Movies & TV apps. There is **no** shared private-media database, authentication service, cross-library sync or published SDK.

[**Live Personal Hub**](https://taiyous-shared-core.pages.dev/) · [**GitHub source**](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core) · [**Self-contained agent handover**](docs/SESSION_HANDOVER_PROMPT.md)

## Why this repository exists

The owner wanted one beautiful personal entrance to different media libraries and a carefully governed place for any **proven** shared frontend/contracts functionality. The visual identity is deliberately not tied to one culture or motif. Hosting `apps/hub` inside Shared Core avoids an extra repository and keeps the independently deployed readers free of central runtime dependencies.

The original five-repository plan is:
- **This repository:** Shared Core and the Personal Hub.
- [Taiyous-Personal-Library](https://github.com/AdityaSreevatsaK/Taiyous-Personal-Library): independent Novel Library, **live** at https://taiyous-personal-library.pages.dev/.
- [Taiyous-Manga-Library](https://github.com/AdityaSreevatsaK/Taiyous-Manga-Library): independent Manga Library, **live** at https://taiyous-manga-library.pages.dev/.
- [Taiyous-Anime-Library](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library): future/paused Anime application.
- [Taiyous-Movies-TV-Library](https://github.com/AdityaSreevatsaK/Taiyous-Movies-TV-Library): future/paused Movies & TV application.

This is **four Hub destinations across five repositories** because Movies and TV are one planned frontend. Future video-library implementation was paused in the wider ecosystem while storage/cost feasibility is unresolved; the Hub's placeholders remain deliberately honest.

## Current product: cinematic library gateway (24 November 2026)

The owner-approved cinematic redesign is **live**, introduced by [PR #25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25) at product commit `f497b62eab04d67b3f2652f9bf55131417d2b708`. [Exact-SHA public HTTPS/security smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238) and [post-merge CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) both passed. This is a dated release checkpoint; always re-check current `master` and live `/release.json` when needed.

- **Art direction:** an immersive, amber-lit fantasy library and large radiant Sun window with four organically curved, gold-edged destinations. The imagery is separately hosted and the controls, headings and statuses remain real React/HTML/CSS, not a webpage screenshot.
- **Shared curved geometry:** the structural refinement in [PR #28](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/28) replaces independently positioned and overlapping desktop masks with four paths sharing a single SVG coordinate system, complementary seam offsets and a measurable gutter. Real link hit areas and decorative metallic rims use exactly the same silhouettes. Tablet/mobile use non-overlapping responsive grids. See [ADR-020](docs/adr/ADR-020-shared-cinematic-portal-geometry.md) for the contract and verification approach.
- **Art quality:** local responsive high-resolution WebP pairs (`cinematic-*-900.webp` and `cinematic-*-1600.webp`) and a repaired architectural image (`hero-clean.webp`). The exact historical artwork remains available for rollback and protected by static integrity checks.
- **Navigation:** Novel and Manga are active, independent HTTPS library links; Anime and Movies & TV are deliberately noninteractive planned destinations.
- **Themes:** Midnight, Charcoal, Plum, **Sepia** (first-visit default), Paper and Ocean; Hub-only local persistence and pre-paint restoration.
- **Interaction and access:** semantic headings, skip link, native theme control, header-local destination search and reading shortcuts, keyboard/focus, reduced motion, CSP and no private-data requests. The Hub does not share authentication, history, data or a runtime backend with the readers.
- **Responsive:** sculpted desktop gallery, tablet two-column panels and mobile single-column reflow. The verified CI matrix covers Chromium, Firefox and WebKit plus relevant viewport and axe checks.

**Manual items remain open:** physical Safari/touch, NVDA/VoiceOver, real-device 200% zoom, real-user Core Web Vitals and reader-return navigation. Do not conflate passing automation with those checks. See [the cinematic release record](docs/RELEASE_2026-11-24_CINEMATIC_HUB.md) and [release gate issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7).

The older 4 × 1 sakura poster gallery, Golden Archive/Cinematic Passage moodboard and flat vector-observatory prototype are **historical superseded designs**, not the current production UI. PRs #19/#20 also document an earlier simplified-artwork regression and correction. Those lessons remain relevant: never substitute lower-fidelity artwork for approved subject compositions.

## Actual repository structure

```text
apps/hub/                 React 18 + TypeScript + Vite static single-page Hub
packages/contracts/       Private 0.0.0 minimal media types/IDs and 1–10 rating helper
packages/ui/              Private 0.0.0 stateless MediaHubCard presentation component
docs/                     System guide, history, decisions, roadmap, security, agent handover
docs/rfcs/                Shared API proposal process, two-consumer requirement
.github/workflows/        Quality CI + exact-commit public Cloudflare smoke
scripts/                  Build/live verification and optional maintenance scripts
AGENTS.md                 Mandatory instructions for AI agents
CONTRIBUTING.md           Change process
package-lock.json         Real committed npm-workspace lockfile
```

**Tech stack:** Node 22+, npm workspaces, TypeScript strict, React 18, Vite 6, CSS variables/media queries, Vitest, Playwright (Chromium/Firefox/WebKit), axe-core, GitHub Actions and Cloudflare Pages. No central backend/database.

## Run locally

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

Local dev URL: `http://127.0.0.1:5173`. Use **Node 22+**. Do not regenerate or modify the lockfile casually; CI uses `npm ci`.

The `.env.example` file contains **public HTTPS destination URLs only**, including blank future Anime/Movies entries. Every `VITE_*` setting is exposed in the client bundle and may **never** contain Hugging Face credentials, OAuth secrets or private catalogue data.

## Build, CI and deployment

- **Source:** public GitHub repository; `master` is canonical. Work on focused branches and PRs.
- **Documentation gate:** `npm run verify:docs` checks the required handover files and relative Markdown links offline on every CI quality job.
- **CI:** `.github/workflows/ci.yml` checks Node 22 quality on Ubuntu/Windows, production dependency advisories, static assets/security policy, and responsive/keyboard/WCAG tests on Chromium/Firefox/WebKit.
- **Hosting:** Cloudflare Pages project `taiyous-shared-core`, connected to `master`. Build from repository root, output `apps/hub/dist`.
- **Independent release verification:** `.github/workflows/live-hub.yml` tests public HTTPS 200, security headers, React mount, early six-theme bootstrap and **exact public `/release.json` commit SHA** after each master merge.
- **Latest verified production baseline:** master `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc`, [CI run 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995) and [live smoke run 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985) both succeeded at that exact SHA. The live smoke verified HTTP 200, required security headers, React mount, six-theme bootstrap and the exact deployed commit.

A merged PR does not prove production deploy, and automated accessibility checks do not equal manual NVDA/VoiceOver acceptance.

## Documentation: start here

| Goal | Authoritative document |
| --- | --- |
| **Why this exists, original brainstorm, designs, failed attempts, PR milestones** | [Project history](docs/PROJECT_HISTORY.md) |
| **Actual codebase, technical stack, components, source paths, tests, assets** | [Codebase reference](docs/CODEBASE_REFERENCE.md) |
| **Mandatory AI agent boundaries and hard stops** | [AGENTS.md](AGENTS.md) |
| **Future agent procedure, checklists, regressions, CI and releases** | [AI agent playbook](docs/AI_AGENT_PLAYBOOK.md) |
| **Self-contained prompt for the next agent/session** | [Session handover](docs/SESSION_HANDOVER_PROMPT.md) |
| Accepted vs superseded architectural/product choices | [Decisions](docs/DECISIONS.md) |
| What is complete, pending, or deferred | [Roadmap](docs/ROADMAP.md) |
| System and privacy boundaries | [Architecture](docs/ARCHITECTURE.md) · [Security](docs/SECURITY.md) |
| Commands, releases, rollback and exact deployment verification | [Operations](docs/OPERATIONS.md) · [Live smoke](docs/LIVE_HUB_SMOKE_CHECK.md) |
| Current UI and visual design chronology | [Illustrated homepage](docs/ILLUSTRATED_HOMEPAGE.md) · [Design system](docs/DESIGN_SYSTEM.md) |
| Approved next photographic concepts and shared Sun mark references | [Featured visual options](docs/FEATURED_VISUAL_OPTIONS.md) · [ADR-015](docs/adr/ADR-015-photographic-split-layout-exploration.md) |
| Contract proposals and cross-repo governance | [Data contracts](docs/DATA_CONTRACTS.md) · [Reuse audit](docs/REUSABILITY_INVENTORY.md) · [Integration](docs/INTEGRATION.md) · [RFC process](docs/rfcs/README.md) |
| Checks and known limitations | [Testing](docs/TESTING.md) · [Historic validation](docs/VALIDATION_STATUS_2026-11-18.md) |
| Historical asset alternatives/deployment planning | [Branding archive](docs/BRANDING_INTEGRATION.md) · [Deployment preparation](docs/HUB_DEPLOYMENT_PREPARATION.md) |
| GitHub metadata / optional maintenance | [Repository settings](docs/REPOSITORY_SETTINGS.md) · [Metadata updater](docs/REPOSITORY_METADATA_RUNBOOK.md) |

The main docs are intended to keep future agents productive **without prior chat context**. If anything here disagrees with actual source, inspect the change and correct the docs.

## Critical design and architecture boundaries

- Keep Novel, Manga and other apps independent: no forced monorepo migration, shared runtime auth or direct private-data access.
- Experimental `0.0.0` packages are **not published**. A reusable API needs two independent real consumers, an [RFC](docs/rfcs/README.md), compatibility tests, versioning and rollback.
- Only expose owner-verified HTTPS destinations. A syntactically valid URL is not proof of deployment ownership.
- Keep original artwork bytes: the static build checks exact SHA-256 checksums.
- Do not change other repositories' visibility, data, auth, deployment or media storage as part of Hub work.
- A future universal library, SSO or media backend requires separate design and owner approval.

The project aims to remain small and well-governed rather than abstracting everything by default.
