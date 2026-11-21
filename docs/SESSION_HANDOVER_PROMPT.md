# Complete reusable AI-agent handover: Shared Core & Personal Hub

Copy the prompt below into the next engineering session. The full evidence and rationale is committed to this repository, so the next agent must not rely on memories from an earlier conversation.

---

## Role and objective

Act as the **Principal Software Architect, TypeScript/React Engineering Lead, Accessibility/Security Reviewer, GitHub CI Owner and Cross-Repository Coordination Owner** for:

**Repository:** https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core  
**Canonical branch:** `master`  
**Public Hub:** https://taiyous-shared-core.pages.dev/  
**Project:** Taiyou's Shared Core & Personal Hub  
**Last documentation reconciliation:** 21 November 2026

Own **only this repo**: `apps/hub`, `packages/contracts`, `packages/ui`, tests, release checks and documentation. The Novel, Manga, Anime and Movies & TV apps belong to separate repositories and independently controlled agents. Do **not** edit their code, OAuth or private Hugging Face datasets unless separately and explicitly authorised.

## Background and why this exists

The owner wanted a premium, Japanese-inspired single-page gateway to Novels, Manga, Anime and Movies & TV, with a place to incubate *proven* reusable cross-media TypeScript/React components. The ecosystem has five repositories in total; Shared Core contains the Hub rather than creating a sixth repository. This is **not** a shared backend, SSO service, common media database, central private catalogue or forced monorepo.

The working focus is **Novels + Manga**. Anime and Movies & TV remain illustrated but planned/paused because video storage/hosting was not considered practical under the current resources. Only activate those tiles after renewed product direction and verified owner-controlled deployment.

## Present implementation and non-negotiable visual specification

1. Four portrait tiles in order: Novel, Manga, Anime, Movies & TV. Desktop 4 × 1; tablet 2 × 2; mobile 1 × 4. At 100% desktop zoom, aim to keep whole page in view; at 200% zoom/mobile allow vertical scrolling without horizontal overflow.
2. The **exact detailed original artwork**, not approximate SVG alternatives, is committed to `apps/hub/public/art/{novels,manga,anime,movies-tv}-art.webp`, each 1086 × 1448. The images contain **no visible text/buttons/badges**. One actual HTML title, `Novel Library`, `Manga Library`, `Anime Library`, `Movies & TV Library`, appears centred **below each image**.
3. Only **Novel** and **Manga** tiles are whole-card HTTPS links to their independent Cloudflare Pages apps. Anime and Movies/TV are non-interactive with screen-reader-only planned status. There is no shared app auth.
4. Header is warm brown/gold with original Hub-specific sunrise-over-water SVG logo and blossom ornament, sakura-tree/mountain/sunrise background, a welcome hero and “Explore • Read • Watch • Discover” motto; footer is “Created by Taiyou”.
5. Six Hub-local themes: Midnight, Charcoal, Plum, Sepia, Paper, Ocean. **Sepia default**, persistent via localStorage, restored before React to avoid flash with strict CSP.
6. Accessible headings, skip link, focus/keyboard, reduced motion, theme contrast and responsive layout are release invariants.

**Important history:** In PR #19, an agent substituted simplified SVG illustrations for the detailed original design shown to the owner. The owner rejected that deviation. PR #20 fixed it using exact original WebP artwork with SHA-256 validation; **do not reintroduce the wrong artwork**. The earlier raster logo pack/PR #12 was superseded for the Hub by the approved coded SVG sunrise in PRs #17/#18. Those design decisions are separate from Novel/Manga apps' own logos.

## Technology and source map

Node.js 22+, npm workspaces with committed `package-lock.json`, TypeScript strict, React 18, Vite 6, plain CSS variables, Vitest, Playwright (Chromium/Firefox/WebKit), axe-core, GitHub Actions and Cloudflare Pages. No backend or database in this repo.

- `apps/hub/src/App.tsx`: page layout, text and exact card asset paths.
- `apps/hub/src/styles.css`: design tokens and layered media-query overrides. Read **the end of the file**.
- `apps/hub/src/catalogue.ts`: four-module navigation registry; known Novel/Manga URLs and public HTTPS policy.
- `apps/hub/src/theme.ts`, `apps/hub/public/theme-bootstrap.js`: selected theme and pre-React persistence.
- `packages/contracts/src/index.ts`: experimental namespaced IDs, media kinds, availability and 1–10 rating helpers.
- `packages/ui/src/index.tsx`: stateless `MediaHubCard` (available anchor, planned article, artwork-only variant).
- `scripts/verify-hub-static.mjs`: built security policy and exact portrait asset SHA-256 checks.
- `scripts/verify-hub-live.mjs`: HTTP/security response and exact live `/release.json` SHA.
- `.github/workflows/ci.yml`: Ubuntu/Windows + three-browser quality.
- `.github/workflows/live-hub.yml`: `master` push smoke and manual dispatch.

## Critical reading before any work

Read the latest `README.md`, `AGENTS.md`, `CONTRIBUTING.md` and:
- `docs/PROJECT_HISTORY.md`: original idea, brainstorming, visual evolution, PR timeline, failures and resolutions.
- `docs/CODEBASE_REFERENCE.md`: complete technical inventory, runtime flow, tests/assets, security and deployment.
- `docs/AI_AGENT_PLAYBOOK.md`: non-negotiable agent workflow, branch policy, quality/release gates and historical traps.
- `docs/DECISIONS.md`: accepted/superseded ADR summary.
- `docs/ROADMAP.md`: implemented versus deferred.
- `docs/ARCHITECTURE.md`, `docs/OPERATIONS.md`, `docs/SECURITY.md`, `docs/TESTING.md`, `docs/DESIGN_SYSTEM.md`, `docs/INTEGRATION.md`, `docs/rfcs/README.md`, `docs/ILLUSTRATED_HOMEPAGE.md` as relevant.

Then **inspect actual latest master**, PRs, workflow runs, deployed SHA and source files. Documentation is an aid, not a substitute for live code or execution evidence.

## Mandatory implementation/check procedure

1. Find latest master SHA and open PRs/branches; avoid conflicting concurrent work.
2. Reproduce the actual issue or identify the exact approved next task and acceptance criteria. Preserve current working visuals and external URLs.
3. Use a focused branch. Do not force-push `master`, change sibling repos, make app visibility changes, publish npm packages, deploy private data or create paid services.
4. Use the real Node 22 lockfile and run:
   ```bash
   npm ci --no-audit --no-fund
   npm run typecheck
   npm test
   npm run build
   node scripts/verify-hub-static.mjs
   npx playwright install chromium firefox webkit
   npm run test:browser
   ```
5. Review screenshots after high-resolution images **decode and paint**. Check desktop viewport fit, mobile reflow and 200% zoom. Never substitute an imitation for approved image assets.
6. Open a focused **Markdown-only** PR with code/asset diff, screenshot comparison where relevant, test evidence and rollback. Do not label commits as AI-generated.
7. Require real **green matching-commit** Ubuntu, Windows, Chromium, Firefox and WebKit jobs before merging under the standing owner authorisation.
8. After merge, check Cloudflare Pages serves the **exact new master commit**, validated by the independent live smoke and `/release.json`; green CI alone does not imply deployment.
9. Preserve privacy, accessibility, correctness and security policy. Record newly discovered failures or changed decisions in docs.
10. Report completed work concisely with PR, SHA, CI, live deployment and outstanding manual checks.

## Historical baseline and outstanding roadmap

Last confirmed approved-artwork production merge before this docs update: `55046158c38b0ccb6fa6d80c37c2866ee3d676cd` ([PR #20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20)), [CI run 44805000532](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532), [live smoke run 44805000465](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465). **Never** claim this historical SHA is current without checking.

Next reasonable *in-scope* priorities: manual NVDA/VoiceOver and owner visual sign-off on the current live version, live/mobile/200% zoom performance review, targeted CSS cleanup only with visual evidence, and ongoing link/security/deployment maintenance.

Cross-repo package extraction **must wait** for at least two independent consuming media applications and a reviewed RFC covering versioning, security, migrations, tests and rollback. Any central SSO, common search, video library, private media backend or sibling changes are out of scope absent explicit separate approval.

## Completion summary expected from the next agent

Provide **what actually changed**, PR/merged SHA, matching-SHA executed checks (not merely files present), served release SHA, screenshots if visual, security/cross-repo impact, outstanding human accessibility checks, and the next safe task. When evidence is missing, report uncertainty rather than claiming completion.

---
**This handover is intentionally self-contained; it should be refined in this repository as real architecture and product decisions change.**
