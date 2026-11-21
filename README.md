# Taiyou's Shared Core & Personal Hub

> **A live, lightweight media gateway and an experimental, unpublished source-code library.** The Hub links to the independent Novel and Manga readers and reserves non-interactive tiles for future Anime and Movies & TV apps. There is **no** shared private-media database, authentication service, cross-library sync or published SDK.

[**Live Personal Hub**](https://taiyous-shared-core.pages.dev/) · [**GitHub source**](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core) · [**Self-contained agent handover**](docs/SESSION_HANDOVER_PROMPT.md)

## Why this repository exists

The owner wanted one beautiful, Japanese-inspired entrance to different media libraries and a carefully governed place for any **proven** shared frontend/contracts functionality. Hosting `apps/hub` inside Shared Core avoids an extra repository and keeps the independently deployed readers free of central runtime dependencies.

The original five-repository plan is:
- **This repository:** Shared Core and the Personal Hub.
- [Taiyous-Personal-Library](https://github.com/AdityaSreevatsaK/Taiyous-Personal-Library): independent Novel Library, **live** at https://taiyous-personal-library.pages.dev/.
- [Taiyous-Manga-Library](https://github.com/AdityaSreevatsaK/Taiyous-Manga-Library): independent Manga Library, **live** at https://taiyous-manga-library.pages.dev/.
- [Taiyous-Anime-Library](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library): future/paused Anime application.
- [Taiyous-Movies-TV-Library](https://github.com/AdityaSreevatsaK/Taiyous-Movies-TV-Library): future/paused Movies & TV application.

This is **four Hub destinations across five repositories** because Movies and TV are one planned frontend. Future video-library implementation was paused in the wider ecosystem while storage/cost feasibility is unresolved; the Hub's placeholders remain deliberately honest.

## Current product

- **Four image-only portraits**, in order: Novel Library, Manga Library, Anime Library, Movies & TV Library. Each portrait has **exact approved detailed artwork**, with its only visible title centred **below** the image. No artwork-embedded labels/buttons or status badges.
- **Real links** for Novel and Manga only, covering artwork and title. Anime and Movies & TV are non-interactive until verified.
- **Responsive grid:** 4 × 1 on desktop, 2 × 2 on tablet, 1 × 4 on mobile; 100% desktop viewport-fit target, 200% zoom reflow and no horizontal overflow.
- **Visual identity:** a distinct Hub-specific golden SVG sunrise logo, warm brown masthead, sakura tree, pastel mountain/sunrise landscape, ornamental wave footer and editorial typography.
- **Six persistent themes:** Midnight, Charcoal, Plum, Sepia (**first-visit default**), Paper and Ocean. Preference stays **local to the Hub**.
- **Accessibility and privacy:** semantic headings, skip link, keyboard/focus, reduced motion, screen-reader-only planned state, local self-hosted assets, strict static CSP/security headers. No private media fetch or cross-app credentials.

**Important history:** PR [#19](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/19) had the correct layout but accidentally used simplified substitute drawings. PR [#20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20) replaced them with the **actual detailed approved four-panel artwork** and verifies exact WebP digests. Never repeat that substitution. The previously proposed raster-logo pack was superseded for **the Hub only** by original SVG sunrise branding; independent readers keep their own branding.

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
npx playwright install chromium firefox webkit
npm run test:browser
npm run dev
```

Local dev URL: `http://127.0.0.1:5173`. Use **Node 22+**. Do not regenerate or modify the lockfile casually; CI uses `npm ci`.

The `.env.example` file contains **public HTTPS destination URLs only**, including blank future Anime/Movies entries. Every `VITE_*` setting is exposed in the client bundle and may **never** contain Hugging Face credentials, OAuth secrets or private catalogue data.

## Build, CI and deployment

- **Source:** public GitHub repository; `master` is canonical. Work on focused branches and PRs.
- **CI:** `.github/workflows/ci.yml` checks Node 22 quality on Ubuntu/Windows, production dependency advisories, static assets/security policy, and responsive/keyboard/WCAG tests on Chromium/Firefox/WebKit.
- **Hosting:** Cloudflare Pages project `taiyous-shared-core`, connected to `master`. Build from repository root, output `apps/hub/dist`.
- **Independent release verification:** `.github/workflows/live-hub.yml` tests public HTTPS 200, security headers, React mount, early six-theme bootstrap and **exact public `/release.json` commit SHA** after each master merge.
- **Historical verified illustration release:** master `55046158c38b0ccb6fa6d80c37c2866ee3d676cd`, [CI run 44805000532](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532), [live smoke run 44805000465](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465). This is a historical reference, **not a claim it remains the latest deployment**.

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
| UI composition and visual design chronology | [Illustrated homepage](docs/ILLUSTRATED_HOMEPAGE.md) · [Design system](docs/DESIGN_SYSTEM.md) |
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
