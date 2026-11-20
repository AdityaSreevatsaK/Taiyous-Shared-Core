# Taiyou's Shared Core & Personal Hub

> **Public, early-stage source repository with unpublished internal packages.** This repository contains the experimental contracts package, one deliberately small React UI package, and a navigation-only Personal Hub with six selectable themes. It does NOT implement shared authentication, private media storage, cross-library search or synchronisation.

## Mission and philosophy
Build a beautiful parent gateway to the five-repository Taiyou media ecosystem and extract reusable source code only when a second independent media app proves the reuse is worthwhile. **Shared Core is primarily a versioned source-code library, not an always-online microservice.**

The ecosystem has five GitHub repositories:

| Owner | Repository | Product | State |
| --- | --- | --- | --- |
| Shared Core + Hub | [Taiyous-Shared-Core](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core) | Shared code and parent portal | Scaffold |
| Novels | [Taiyous-Personal-Library](https://github.com/AdityaSreevatsaK/Taiyous-Personal-Library) | Existing EPUB novel reader | Existing production application |
| Manga | [Taiyous-Manga-Library](https://github.com/AdityaSreevatsaK/Taiyous-Manga-Library) | Independent manga reader | Live production application |
| Anime | [Taiyous-Anime-Library](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library) | Future anime tracker | Scaffold |
| Movies & TV | [Taiyous-Movies-TV-Library](https://github.com/AdityaSreevatsaK/Taiyous-Movies-TV-Library) | Future films/TV tracker | Scaffold |

## What exists today
```text
apps/hub/                   Vite + React responsive six-theme gateway, honest link states
packages/contracts/         Version 0 experimental identity and rating contracts
packages/ui/                Stateless reusable MediaHubCard presentation component
docs/                       Authoritative architecture, security, operations and agent instructions
.github/workflows/ci.yml    Quality checks only; never deploys automatically
```
The Hub links to the **verified Novel and Manga Libraries**. Anime and Movies & TV remain plainly **In preparation** until their own HTTPS deployments are verified. The four cards sit in a single desktop row (4 × 1), a two-column tablet grid or a single-column phone layout, with owner-supplied illustrated scenes and accessible live labels (see [homepage specification](docs/ILLUSTRATED_HOMEPAGE.md)). All six Hub themes are selectable, with the preference held only in local storage. There is no personal media data in the Hub.

## Local setup (Node.js 22+)
1. Clone this repository and open it in your editor.
2. Run `npm ci`. The root workspace `package-lock.json` is committed and is verified in CI.
3. Run `npm run typecheck`, `npm test`, `npm run build`.
4. For browser checks, run `npx playwright install chromium firefox webkit` then `npm run test:browser` after installing dependencies.
5. Run `npm run dev` to build local shared packages and start the Vite hub (typically http://127.0.0.1:5173).
6. Optional: copy `.env.example` to `.env.local` and add public HTTPS URLs only once the corresponding apps are deployed and verified.

## Commands
| Command | Meaning |
| --- | --- |
| `npm ci` | Reproducibly install all npm workspaces from the lockfile |
| `npm run dev` | Build contracts/UI then run hub locally |
| `npm run typecheck` | Check all three workspaces |
| `npm test` | Contracts, URL-policy and server-rendered Hub tests |
| `npm run build` | Build contracts, UI and production hub assets |
| `npm run test:browser` | Three-browser keyboard, responsive, theme and WCAG A/AA tests (install Playwright browser first) |

## Boundaries
- No React component should read Hugging Face tokens, OAuth sessions, IndexedDB or private media without an explicit consuming-app boundary.
- No shared database or mandatory runtime service. Each library must continue working if the hub is down.
- This source repository is public. Cloudflare Pages is connected to `master`; a successful deployment check is separate from the external HTTP verification, which is now exercised by a production smoke test. Visual and full access-policy review remain manual.
- The Novel Library's origin-specific OAuth cannot become ecosystem-wide SSO by copying cookies.
- Package adoption is not automatic: the first use of `@taiyou/contracts` or `@taiyou/ui` in another repository requires versioning, compatibility tests and a coordinated PR.
- No monorepo migration of the working Novel Library and no forced dependency upgrades.

## Documentation index
[Agent rules](AGENTS.md) · [Architecture](docs/ARCHITECTURE.md) · [Contracts](docs/DATA_CONTRACTS.md) · [Extraction inventory](docs/REUSABILITY_INVENTORY.md) · [Integration](docs/INTEGRATION.md) · [Security](docs/SECURITY.md) · [Design system](docs/DESIGN_SYSTEM.md) · [Testing](docs/TESTING.md) · [Operations](docs/OPERATIONS.md) · [Hub deployment preparation](docs/HUB_DEPLOYMENT_PREPARATION.md) · [Roadmap](docs/ROADMAP.md) · [Decisions](docs/DECISIONS.md) · [Settings](docs/REPOSITORY_SETTINGS.md) · [Five-repo metadata updater](docs/REPOSITORY_METADATA_RUNBOOK.md) · [Current validation status](docs/VALIDATION_STATUS_2026-11-18.md) · [Agent handover](docs/SESSION_HANDOVER_PROMPT.md).

## Deployment status (20 November 2026)
Cloudflare Pages serves the Hub at https://taiyous-shared-core.pages.dev/. The [production smoke run](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44597152388) verified canonical `master` commit `832a1149fba3e50c9b8466f1b81861c2d6fa84b5` using the public release marker, HTTP 200, security headers and the six-theme bootstrap. The independently hosted Manga Library is verified by [its own production smoke test](https://github.com/AdityaSreevatsaK/Taiyous-Manga-Library/actions/runs/44744254072) and now has a live Hub tile. Manual visual, screen-reader and access-policy review remain outstanding. The Cloudflare Git integration may automatically deploy `master`; GitHub Actions only verifies quality. See [Operations](docs/OPERATIONS.md), [Live deployment smoke check](docs/LIVE_HUB_SMOKE_CHECK.md) and [Branding integration](docs/BRANDING_INTEGRATION.md).

The approved Taiyou raster logo and favicon pack has been supplied but is **not committed**. The illustrated-homepage redesign is in a separate draft PR until its four local image assets and tests are verified. The current Hub still displays its temporary sun glyph and does not claim to use the final artwork. Packages `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` remain experimental and unpublished.
