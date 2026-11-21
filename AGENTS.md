# AI Agent Rules: Taiyou's Shared Core & Personal Hub

**Canonical engineering instructions, last reconciled 21 November 2026.** Apply to this repository only. For the complete history and exact code map, read [AI playbook](docs/AI_AGENT_PLAYBOOK.md), [Project history](docs/PROJECT_HISTORY.md), [Codebase reference](docs/CODEBASE_REFERENCE.md) and [Roadmap](docs/ROADMAP.md). Older project docs may contain historical plans that have been superseded.

## 1. Mission and ownership

You own **only** the `AdityaSreevatsaK/Taiyous-Shared-Core` repository:
- `apps/hub`: a premium but deliberately light **static** React navigation gateway.
- `packages/contracts`: experimental minimal type definitions/identity/rating helpers.
- `packages/ui`: experimental **stateless** presentational React components.
- This repository's tests, CI, deployment verification and cross-app coordination/docs.

The Hub is **not** the backend for other apps, a replacement for the Novel or Manga libraries, or a unified private catalogue. It lives alongside four independent media applications (Novels, Manga, Anime, Movies & TV) but shares no required runtime backend. Do not independently modify another repository or private Hugging Face dataset.

## 2. Current verified product contract

- Canonical branch: **`master`**. Public repo and deployed Hub: `https://taiyous-shared-core.pages.dev/`.
- **Four tiles in order:** Novel, Manga, Anime, Movies & TV. Novel and Manga link to existing independent Cloudflare Pages deployments. Anime and Movies & TV remain **planned/paused** with noninteractive tiles. Do not reactivate them without owner-controlled HTTPS deployment verification and explicit product direction.
- Desktop **4 × 1** large posters spanning most of the viewport, tablet **2 × 2**, phone **1 × 4**. Use the reference's large illustrated scene, avoid the previous tiny cards/overly tall hero/dark band; at 200% zoom/mobile permit scrolling but **never horizontal overflow**.
- **Exact approved detailed WebP illustrations** at `apps/hub/public/art/{novels,manga,anime,movies-tv}-art.webp`; don't use simplified SVG replacements or the old complete poster AVIF cards. Each art image remains **text-free**; the current cinematic Hub renders real HTML headings, descriptions, status and visual calls to action **within a bottom CSS gradient over each card**. Novel/Manga whole cards are links; planned cards are inert (their Coming soon text is a label, never a button).
- Warm brown top bar, **Hub-specific original Sun SVG** (`branding/hub-sun-logo.svg`) and matching favicon, sakura ornament, original landscape background. Historical raster branding PR #12 was **closed unmerged** and superseded by approved Hub SVG PRs #17/#18.
- Six themes Midnight, Charcoal, Plum, **Sepia (default)**, Paper and Ocean. LocalStorage only, early no-flash theme bootstrap, strict CSP, no global cross-app theme state.
- Preserve semantic headings, screen-reader planned states, skip link, visible focus, keyboard navigation, reduced motion and good contrast.
- No personal media data, OAuth, central auth, unified search, collection state, cross-library syncing, streaming service or shared runtime server.

**Historical warning:** PR #19 accidentally substituted simplistic SVG art for the detailed generated design shown to the owner. PR #20 corrected it with exact-original portraits and hash verification. Never repeat this visual fidelity failure.

## 3. Mandatory first steps every session

1. Inspect latest master commit, open PRs/branches/CI and deployment marker; check concurrent work.
2. Read `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/AI_AGENT_PLAYBOOK.md`, `docs/PROJECT_HISTORY.md`, `docs/CODEBASE_REFERENCE.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md` and relevant architecture/security/operations/testing docs.
3. Inspect the **actual source**, tests, final CSS overrides and relevant assets before design or code changes; do not trust stale PR prose.
4. Define concrete acceptance checks and invariants; distinguish implemented vs merely planned behaviour.
5. For source changes, reproduce/build on Node 22+ with the real lockfile and run checks below.
6. Create a focused branch and Markdown-only PR; explain the change, risk, tests and rollback. Never use HTML in PR descriptions.
7. Merge only after *executed* matching-SHA successful CI under the owner's standing approval, then independently confirm the exact production SHA if Cloudflare deploys.

## 4. Reproducible quality gate

```bash
npm ci --no-audit --no-fund
npm run typecheck
npm test
npm run build
node scripts/verify-hub-static.mjs
npm run verify:docs
npx playwright install chromium firefox webkit
npm run test:browser
```

CI must pass Node 22 quality on **Ubuntu and Windows**, all three Playwright browsers and production advisory checks. Static verification asserts strict header policy, required assets and the **exact original artwork hashes**. Browser tests check fixed titles/links, keyboard, WCAG automation, native image loading, dimensions, zoom and responsive screenshots.

Screenshots must capture **fully decoded and painted** images. Inspect real visual output before asserting design fidelity; `naturalWidth` alone does not prove nonblank pictures. Automated axe checks do not establish manual screen-reader acceptance.

## 5. Security, privacy and architecture hard stops

- No credentials, tokens, private datasets, personal history, notes, auth cookies or owner passphrases in source, public Vite variables, GitHub Actions logs, browser bundle, screenshots or documentation.
- Only public owner-verified HTTPS link targets. URL syntax checking is **not** ownership verification. No query/fragment redirects, insecure protocols or local/IP destinations.
- Do not copy OAuth/session implementations across distinct Pages origins or claim SSO.
- Do not publish shared packages (`0.0.0`), add a mandatory microservice, mutate sibling repos, create a database, change visibility/privacy/access policy or provision paid services without explicit separate approval.
- No force pushes, release tags, destructive data operations, private dataset access or bypass of failing tests.
- No cross-app shared code until **two independent consuming media applications** need the identical interface and an [RFC](docs/rfcs/README.md) covers versioning, security, validation, tests and rollback.
- Keep independent Novel/Manga apps usable if the Hub is offline.
- Commit messages should describe engineering work; do not include “AI-generated” labels. Use Markdown-only PR descriptions.

## 6. Release and deployment truth

Cloudflare Pages is Git-connected to `master` and may deploy after merge; ordinary `ci.yml` never performs direct deployment. The separate `live-hub.yml` fetches the public Hub, verifies HTTP/security headers, mount/bootstrap and `/release.json` matching the merged SHA. **Do not claim deployed merely because CI is green or the PR is merged.**

Last *historically verified* exact-artwork release prior to this documentation update: `55046158c38b0ccb6fa6d80c37c2866ee3d676cd`, [CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000532), [live smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44805000465). Recheck on every new merge.

For rollback, revert the focused PR or select an earlier reviewed Cloudflare deployment; re-run CI/live smoke and verify restored public SHA.

## 7. Documentation and collaboration hygiene

- When behaviour changes, update codebase reference, roadmap, history/decision notes and agent handover so a new session needs no conversational context.
- Preserve failures, regressions and superseded alternatives as dated history rather than deleting lessons.
- If a new feature would affect another media repo, document an RFC and hand it to the owning agent instead of silently changing that repo.
- Report exact PR, head/merge SHA, tests actually executed, independent live status, manual checks still outstanding and next safe steps.
- Do not overstate published packages, data integration, a video library or owner acceptance.

**Further reading:** [Complete agent playbook](docs/AI_AGENT_PLAYBOOK.md) · [Project history and mistakes](docs/PROJECT_HISTORY.md) · [Code/stack map](docs/CODEBASE_REFERENCE.md) · [Decisions](docs/DECISIONS.md) · [Operations](docs/OPERATIONS.md) · [Session handover](docs/SESSION_HANDOVER_PROMPT.md).
