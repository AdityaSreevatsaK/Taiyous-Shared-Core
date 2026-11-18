# Taiyou's Shared Core & Personal Hub

> **Private, early-stage foundational repository.** This repository contains the experimental contracts package, one deliberately small React UI package, and a functioning, navigation-only Personal Hub. It does NOT implement shared authentication, private media storage, cross-library search, synchronisation or automatic deployment.

## Mission and philosophy
Build a beautiful parent gateway to the five-repository Taiyou media ecosystem and extract reusable source code only when a second independent media app proves the reuse is worthwhile. **Shared Core is primarily a versioned source-code library, not an always-online microservice.**

The ecosystem has five GitHub repositories:

| Owner | Repository | Product | State |
| --- | --- | --- | --- |
| Shared Core + Hub | [Taiyous-Shared-Core](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core) | Shared code and parent portal | Scaffold |
| Novels | [Taiyous-Personal-Library](https://github.com/AdityaSreevatsaK/Taiyous-Personal-Library) | Existing EPUB novel reader | Existing production application |
| Manga | [Taiyous-Manga-Library](https://github.com/AdityaSreevatsaK/Taiyous-Manga-Library) | Future comic reader | Scaffold |
| Anime | [Taiyous-Anime-Library](https://github.com/AdityaSreevatsaK/Taiyous-Anime-Library) | Future anime tracker | Scaffold |
| Movies & TV | [Taiyous-Movies-TV-Library](https://github.com/AdityaSreevatsaK/Taiyous-Movies-TV-Library) | Future films/TV tracker | Scaffold |

## What exists today
```text
apps/hub/                   Vite + React responsive gateway, honest link states
packages/contracts/         Version 0 experimental identity and rating contracts
packages/ui/                Stateless reusable MediaHubCard presentation component
docs/                       Authoritative architecture, security, operations and agent instructions
.github/workflows/ci.yml    Quality checks only; never deploys automatically
```
The hub links to the **verified existing Novel Library**. Other module tiles remain plainly **Coming later** until actual HTTPS destinations are configured. There is no user data in the hub.

## Local setup (Node.js 22+)
1. Clone this private repository and open in your editor.
2. Run `npm install`. Initial scaffold has no committed lockfile; **generate and commit package-lock.json in the first dependency PR**.
3. Run `npm run typecheck`, `npm test`, `npm run build`.
4. For browser checks, run `npx playwright install chromium` then `npm run test:browser` after installing dependencies.
5. Run `npm run dev` to build local shared packages and start the Vite hub (typically http://127.0.0.1:5173).
6. Optional: copy `.env.example` to `.env.local` and add public HTTPS URLs only once the corresponding apps are deployed and verified.

## Commands
| Command | Meaning |
| --- | --- |
| `npm install` | Install npm workspaces and link private local packages |
| `npm run dev` | Build contracts/UI then run hub locally |
| `npm run typecheck` | Check all three workspaces |
| `npm test` | Contracts, URL-policy and server-rendered Hub tests |
| `npm run build` | Build contracts, UI and production hub assets |
| `npm run test:browser` | Chromium keyboard and responsive browser checks (install Playwright browser first) |

## Boundaries
- No React component should read Hugging Face tokens, OAuth sessions, IndexedDB or private media without an explicit consuming-app boundary.
- No shared database or mandatory runtime service. Each library must continue working if the hub is down.
- The Hub is a public-navigation concept; a private repo does **not** make a deployed static website private.
- The Novel Library's origin-specific OAuth cannot become ecosystem-wide SSO by copying cookies.
- Package adoption is not automatic: the first use of `@taiyou/contracts` or `@taiyou/ui` in another repository requires versioning, compatibility tests and a coordinated PR.
- No monorepo migration of the working Novel Library and no forced dependency upgrades.

## Documentation index
[Agent rules](AGENTS.md) · [Architecture](docs/ARCHITECTURE.md) · [Contracts](docs/DATA_CONTRACTS.md) · [Extraction inventory](docs/REUSABILITY_INVENTORY.md) · [Integration](docs/INTEGRATION.md) · [Security](docs/SECURITY.md) · [Design system](docs/DESIGN_SYSTEM.md) · [Testing](docs/TESTING.md) · [Operations](docs/OPERATIONS.md) · [Roadmap](docs/ROADMAP.md) · [Decisions](docs/DECISIONS.md) · [Settings](docs/REPOSITORY_SETTINGS.md) · [Five-repo metadata updater](docs/REPOSITORY_METADATA_RUNBOOK.md) · [Current validation status](docs/VALIDATION_STATUS_2026-11-18.md) · [Agent handover](docs/SESSION_HANDOVER_PROMPT.md).

## Deployment status
No Cloudflare Pages project or production hostname has been configured for this hub. Running a build proves only buildability, not a release. The four library repos deploy independently after owner approval.
