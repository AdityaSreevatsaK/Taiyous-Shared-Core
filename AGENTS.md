# AI Agent Rules: Taiyou's Shared Core & Personal Hub

**Canonical engineering instructions, last reconciled 24 November 2026.** Apply to this repository only. For the complete history and exact code map, read [AI playbook](docs/AI_AGENT_PLAYBOOK.md), [Project history](docs/PROJECT_HISTORY.md), [Codebase reference](docs/CODEBASE_REFERENCE.md) and [Roadmap](docs/ROADMAP.md). Older project docs may contain historical plans that have been superseded.

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
- **Verified cinematic production UI (24 November):** [PR #25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25) squash-merged at `f497b62eab04d67b3f2652f9bf55131417d2b708`. Its original architectural library backdrop, four curved glowing-gold media panels and large serif headings are real React/CSS. Desktop features a scenic architectural left side with sculpted destinations; tablet uses two columns and mobile one. Original browser artwork was a *design reference*, never a flattened site image. [Exact-SHA live smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238) and [post-merge CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) passed. New sessions must check current production SHA anew.
- **Current displayed imagery:** `cinematic-*-900.webp` and `cinematic-*-1600.webp` via responsive `srcSet`; `hero-clean.webp` repairs the architectural background. Keep the original approved `*-art.webp` and historical reference assets unchanged unless safely and separately authorised. Image masters were reference-guided reconstructions, not pixel-identical restoration. See [ADR-018](docs/adr/ADR-018-cinematic-artwork-high-density.md) and [release record](docs/RELEASE_2026-11-24_CINEMATIC_HUB.md).
- **Brand and controls:** locally drawn gold Sun logo, cinematic translucent masthead, native theme select, header-local four-destination search and safe reader shortcuts. The redundant subtitle and sakura gallery are superseded, not live.
- Six themes Midnight, Charcoal, Plum, **Sepia (default)**, Paper and Ocean. LocalStorage only, early no-flash theme bootstrap, strict CSP, no global cross-app theme state.
- Preserve semantic headings, screen-reader planned states, skip link, visible focus, keyboard navigation, reduced motion and good contrast.
- No personal media data, OAuth, central auth, unified search, collection state, cross-library syncing, streaming service or shared runtime server.

**Historical warning:** PR #19 accidentally substituted simplistic SVG art for the detailed generated design shown to the owner. PR #20 corrected it with exact-original portraits and hash verification. Never repeat this visual fidelity failure.

## 3. Mandatory dynamic-state inspection (every session, before substantial work)

1. Run `git status --short --branch` and inspect all tracked, untracked and staged changes. Never overwrite or reset another agent's work. If no local checkout is available, state that limitation and inspect the remote refs/PRs instead.
2. Fetch current refs (`git fetch --prune origin`), inspect `git log -8 --oneline --decorate --all`, resolve `origin/master`, list open PRs/issues and active branches, and inspect the latest workflow runs. Do not assume the default branch, last session's branch, or prior summary is current.
3. Read `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `docs/AI_AGENT_PLAYBOOK.md`, `docs/PROJECT_HISTORY.md`, `docs/CODEBASE_REFERENCE.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md` and the task-relevant design, architecture, security, operations and testing documents.
4. Inspect the actual source, tests, final CSS rules, asset bytes, workflows and build output affected by the task. Compare the documentation with the code and the newest matching-SHA CI/live evidence.
5. For the deployed product, fetch the public `/release.json` and compare it with the exact current `master` SHA; separately inspect the live smoke workflow and response headers. A green build, merged PR or old release note is not deployment proof.
6. Classify each relevant item explicitly as **implemented and verified**, **implemented but not yet verified**, **partially implemented**, **approved for prototype only**, **planned/deferred**, or **deprecated/superseded**. Never promote a brainstorm, design reference, AI summary or PR description into an implementation fact.
7. Define acceptance checks and invariants before editing. Preserve current working behaviour unless the owner has explicitly approved a new direction.
8. If the local checkout contains changes, do not clean, reset, stash, rebase or overwrite them without first identifying ownership and obtaining permission.

**Evidence precedence:** current Git status/source/tests and freshly measured production evidence > latest merged PR and explicit owner decision > current documentation > older docs, screenshots, previous agent summaries and historical brainstorms. Direct new owner instructions always take precedence.

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

Verified cinematic release checkpoint: `f497b62eab04d67b3f2652f9bf55131417d2b708`, [post-merge CI](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) and [live HTTP/security smoke](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238) both passed at that exact SHA. Recheck on every new merge; this value is a historical checkpoint, not a substitute for a fresh lookup.

For rollback, revert the focused PR or select an earlier reviewed Cloudflare deployment; re-run CI/live smoke and verify restored public SHA.

## 7. Documentation and collaboration hygiene

- When behaviour changes, update codebase reference, roadmap, history/decision notes and agent handover so a new session needs no conversational context.
- Preserve failures, regressions and superseded alternatives as dated history rather than deleting lessons.
- If a new feature would affect another media repo, document an RFC and hand it to the owning agent instead of silently changing that repo.
- Report exact PR, head/merge SHA, tests actually executed, independent live status, manual checks still outstanding and next safe steps.
- Do not overstate published packages, data integration, a video library or owner acceptance.

**Superseded visual exploration:** [Golden Archive and Cinematic Passage references](docs/FEATURED_VISUAL_OPTIONS.md) · [ADR-015](docs/adr/ADR-015-photographic-split-layout-exploration.md) and the vector prototype [ADR-016](docs/adr/ADR-016-amber-observatory-hub.md) are historical. The released image-led cinematic design follows [ADR-017](docs/adr/ADR-017-cinematic-target-reconstruction.md) and [ADR-018](docs/adr/ADR-018-cinematic-artwork-high-density.md). Manual native Safari, zoom, touch, VoiceOver/NVDA and measured real-user performance remain open in [issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7).

**Further reading:** [Complete agent playbook](docs/AI_AGENT_PLAYBOOK.md) · [Project history and mistakes](docs/PROJECT_HISTORY.md) · [Code/stack map](docs/CODEBASE_REFERENCE.md) · [Decisions](docs/DECISIONS.md) · [Operations](docs/OPERATIONS.md) · [Session handover](docs/SESSION_HANDOVER_PROMPT.md).
