# Operating playbook for future AI coding agents

**Audience:** future autonomous/collaborating coding sessions in `AdityaSreevatsaK/Taiyous-Shared-Core`. **Updated:** 21 November 2026. Read `AGENTS.md` first; this playbook expands it with procedures, objective evidence, failure lessons, and handover content. It is not permission to make unrelated changes.

## 0. First principle: distinguish what is real from what is planned

Do not equate code present in a repository with a deployed, working or owner-approved feature. Report each stage separately:

```text
idea -> approved design -> code diff -> tests executed -> PR merged
     -> Git-connected build -> exact SHA publicly served -> manual acceptance
```

The Hub **is** a deployed static gateway. Novel and Manga are **live external destinations**. Anime and Movies & TV remain **planned/paused**; their illustrated tiles are intentionally not navigable. Packages `@taiyou/contracts` and `@taiyou/ui` are **experimental private 0.0.0 npm workspaces**, not reusable public SDK releases.

The owner has authorised focused, reviewed Hub PR merges after matching-SHA green CI without repeated approval. That does **not** authorise repo visibility changes, secret handling, private-data migration, sibling-repo edits, paid services, publishing packages, destructive operations, authentication architecture or surprise changes to public access.

## 1. Agent role and scope

Act as an architecture-aware **TypeScript/React engineering lead, accessible frontend reviewer, security reviewer, CI/deployment verifier, and cross-repo integration coordinator**.

Your write scope is:
- `apps/hub`, the static Personal Hub.
- `packages/contracts`, small experimental cross-media definitions.
- `packages/ui`, stateless presentational UI.
- This repository's tests, scripts and docs.

You do **not** own the Novel reader, Manga reader, their storage controllers/private datasets, Anime app or Movies/TV app. Use their source only for comparative review where authorised. Propose cross-repo changes via RFC; let their owning sessions implement independently.

## 2. Mandatory dynamic-state investigation (every session)

1. Run `git status --short --branch` and inspect staged, unstaged and untracked changes. Never overwrite another agent's work. If no local checkout is available, say so and inspect remote refs/PRs instead.
2. Run `git fetch --prune origin`, inspect `git log -8 --oneline --decorate --all`, resolve `origin/master`, inspect active branches, open PRs/issues and the newest workflow runs. Do not assume a previous session's branch or summary is current.
3. Read `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, this playbook, [History](PROJECT_HISTORY.md), [Codebase](CODEBASE_REFERENCE.md), [Decisions](DECISIONS.md), [Roadmap](ROADMAP.md), [Operations](OPERATIONS.md), [Security](SECURITY.md), [Testing](TESTING.md), [Featured visual options](FEATURED_VISUAL_OPTIONS.md) and relevant RFCs.
4. Re-read actual source for the task: App, catalogue, theme, complete final CSS, UI component, asset bytes, unit/browser tests, static verifier, CI workflows and built output. Compare docs to code rather than assuming either is automatically current.
5. Fetch the public `/release.json`, compare it with exact current `master`, and inspect the matching live smoke job and HTTP headers. A merged PR, green build or previous release note is not production proof.
6. Classify relevant work as **implemented and verified**, **implemented but unverified**, **partially implemented**, **approved for prototype only**, **planned/deferred**, or **deprecated/superseded**. Never describe a brainstorm, screenshot, local reference asset, AI summary or PR body as a shipped feature.
7. Confirm public Novel/Manga destinations without accessing private catalogues, Hugging Face datasets or user reading data. Do not put credentials in logs.
8. Write acceptance checks and non-regression invariants before editing.

**Evidence precedence:** current Git status/source/tests and freshly measured production evidence > latest merged PR and explicit owner decision > current documentation > older docs, screenshots, previous agent summaries and brainstorms. Direct new owner instructions always take precedence.

## 3. Current production contract versus next approved prototype

**Verified production baseline (PR #23, master `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc` at the time of this review):**
- Four media cards in this exact order: Novel, Manga, Anime, Movies & TV. Novel and Manga are safe whole-card HTTPS links; Anime and Movies & TV are inert planned cards.
- Desktop **4 × 1 midsize centred gallery**, tablet **2 × 2**, phone **1 × 4**; no visible welcome/motto hero, a visually hidden H1, 200% zoom reflow and no horizontal overflow.
- Exact detailed, text-free WebP art under `apps/hub/public/art/*-art.webp`; real HTML headings, descriptions, availability and CTA content are rendered over the lower card gradient. Never replace the original art with approximations.
- Current live backdrop is the original sakura/Mount Fuji panorama. Current header uses the Hub-specific `hub-sun-logo.svg`/`hub-sun.svg`, Georgia type and the “MY MEDIA GATEWAY” subtitle.
- Six Hub-local themes, **Sepia default**, local persistence, pre-React no-flash bootstrap, strict self-only CSP, keyboard/focus, skip link and reduced motion.
- The independent readers, their auth, catalogue, themes and private datasets remain outside this repository.

**Approved next exploration (ADR-015, not yet implemented):**
- Explore a non-Japanese visual identity using warm walnut/brown, pale gold and restrained glowing gold.
- Compare **Golden Archive** and **Cinematic Passage** in the credited composite moodboard at `docs/assets/featured-visual-moodboard.webp`; original Pexels source pages, photographers, dimensions and licence are linked in [Featured visual options](FEATURED_VISUAL_OPTIONS.md). Do not redistribute raw Pexels photographs as standalone repository files.
- Build the same coded desktop composition for both concepts: featured visual on the left, four compact library tiles on the right in a 2 × 2 grid.
- Use the exact shared Sun logo variants already used by Novel and Manga. Their copies in `docs/assets/` are reference files only; the Hub has not switched to them.
- Candidate copy “A Place for Every Story.” is not final. Display typography candidates must respect the self-only font CSP; self-host properly licensed fonts if selected.
- Build a responsive React/HTML/CSS prototype and inspect actual browser screenshots. The final image, crop, typography and production change require owner visual acceptance.

See [Featured visual options](FEATURED_VISUAL_OPTIONS.md). Do not hotlink Pexels or infer that the proposed split layout is already shipped.

## 4. Local quality gate

Use Node 22+ and the committed lockfile:

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

GitHub CI is the release authority for checks: Ubuntu + Windows quality jobs and Chromium + Firefox + WebKit browser jobs, plus production dependency advisory gate. Run relevant tests locally when tools allow. A GitHub workflow file existing does not prove tests executed.

At a minimum, when editing:
- **Layout/card markup:** check all four H3s, exact card art, no-referrer links, noninteractive future cards, 4/2/1, desktop fit, mobile and 200% zoom.
- **Image assets:** compare with the originally approved detailed source, verify actual pixels and existing SHA-256 asset gate; ensure all four decode before taking snapshots.
- **Theme/styling:** check six theme values, Sepia invalid/first-load fallback, no flash, contrast and reduced-motion.
- **Security/link handling:** check malicious input cases, no credentials/local IP/queries, CSP/static output and live headers.
- **Shared contracts/UI:** verify consuming usage and that no sibling app is silently affected.
- **Docs-only:** validate paths, links, commands and contradictions; CI still runs on the PR because docs can misdirect future agents.

## 5. Change/PR discipline

1. Branch from the **latest master**, choose one focused problem.
2. Make the smallest diff consistent with the approved outcome. Avoid rearchitecting a working component as a side effect.
3. Add or update tests **before** calling the issue fixed. When a CSS class, filename, component or output contract changes, search all tests and static scripts for stale selectors.
4. Inspect actual diff, backwards-compatibility, security and asset/lockfile impact.
5. Open a concise **Markdown-only** PR containing problem, root cause, changed files, screenshots where visual, how to test, risk, compatibility, and rollback. Do not use HTML PR descriptions.
6. Commit descriptions should describe engineering changes plainly; do not include “AI generated” or similar tool attribution.
7. Poll CI using the **PR head SHA**. Do not merge if jobs are queued, cancelled, never started, or failing. Diagnosing and correcting a real failure is part of the work.
8. With matching-SHA green jobs, merge using the owner's standing approval. Never force-push `master`.
9. Verify the new canonical SHA and independent `Verify live Cloudflare Hub` workflow before saying deployed. Check `/release.json` equals exact `master` SHA.
10. Update documentation as source or operating decisions change, including this playbook and [History](PROJECT_HISTORY.md) if a failure is newly discovered.

No direct pushes to canonical master except the normal PR merge. No surprise dependency upgrades or npm publishing. Never use a temporary downloaded/preview image as proof the exact committed artwork matches unless the committed bytes were actually compared.

## 6. Deployment and rollback procedure

**Hosting:** Cloudflare Pages project `taiyous-shared-core`, served at `https://taiyous-shared-core.pages.dev/`, connected to `master`. Root build with Node 22; `apps/hub/dist` is static output.

**Independent checks:** `.github/workflows/ci.yml` verifies code; `.github/workflows/live-hub.yml` verifies served exact SHA, HTTP 200, local theme bootstrap and headers. Successful CI **does not deploy** the site. Cloudflare Git integration may deploy automatically after merge.

**When production remains stale:** inspect Cloudflare build/check status, latest target commit, production `/release.json`, response headers, and retry/publishing logs. Do not mark as deployed while the marker is old.

**Rollback:** revert the focused PR or restore a previously reviewed Cloudflare Pages deployment and rerun source/live verification. Leave private readers alone. Do not assume reverting a leaked secret is sufficient; treat leaks as incidents and rotate credentials with the owner.

## 7. Historical traps to avoid

| Trap | Better approach |
| --- | --- |
| “The requested detailed illustration is close enough to this simplified SVG.” | Never substitute; use the **actual approved image bytes** or seek explicit revision approval |
| “All images have naturalWidth, therefore screenshots prove the art looks right.” | Wait for decode/paint and inspect visual screenshots at desktop/mobile sizes |
| “One HTML 200 means the latest release is live.” | Require matching `release.json` commit |
| “CI failed so the app broke.” | Check whether a runner ever executed or whether failure was environment/infra |
| “CSS screenshot looks wrong; rewrite all component styles.” | Inspect the **last** overriding `styles.css` rules and the approved visual reference |
| “A test selector was renamed, so drop the test.” | Update all test files while preserving assertions |
| “An SVG has an `http://www.w3.org/2000/svg` namespace so it loads an external resource.” | Scope external-resource validation to `href`/`src` and active elements |
| “PR #12 says final raster logo is pending, so replace current Sun mark.” | PR #12 was **closed unmerged** and is unrelated to the shared Novel/Manga Sun WebPs. The owner has now approved those exact WebPs for the next Hub prototype; the current production header remains SVG until a separate redesign is accepted |
| “Manga is planned because an old guide says so.” | Manga has a verified live link; inspect `catalogue.ts` and PR #14 |
| “The presence of an Anime tile means Anime is deployable.” | Planned tile is intentional; video apps are paused/deferred |
| “The packages are in the monorepo, so sibling apps can import them now.” | Private/unpublished 0.0.0 packages need RFC, distribution, two consumers and separate migrations |

## 8. Collaboration and architecture guardrails

- Only build/shared package APIs after **two concrete independent media applications** require the same stable capability. Hub + packages in one repo do not count as two media consumers.
- Put all proposed cross-app contracts through [RFC process](rfcs/README.md); include typed interface, runtime validation, data/privacy boundary, migration, tests and rollback.
- Changes to OAuth, cross-origin cookies, private HF APIs and owner operations require specific threat modelling and explicit owner approval, not superficial reuse.
- A shared package must be stateless or have a sharply documented boundary; do not copy or depend on external app's private state.
- Do not read, print, commit or log real Hugging Face tokens, private catalogues, user histories, ratings or notes.
- Do not promise working SSO, unified library or shared media storage. Explicitly label such work **future RFCs**.

## 9. Documentation update protocol

For each meaningful merge, include a short doc delta:
- **What changed and why:** [History](PROJECT_HISTORY.md) when a decision or failure is material.
- **Current implementation facts:** [Codebase](CODEBASE_REFERENCE.md) and `README.md`.
- **Accepted/rejected design choice:** [Decisions](DECISIONS.md), with supersession.
- **Future steps:** [Roadmap](ROADMAP.md), with checkboxes reflecting actual state.
- **Release/operations:** [Operations](OPERATIONS.md) or [Testing](TESTING.md) when commands, checks or deployment changed.
- **Agent rules:** `AGENTS.md`, this playbook and the copyable [Session handover](SESSION_HANDOVER_PROMPT.md).

Treat old historical documents as historical, rather than erasing evidence. Do not retroactively mark previously proposed work as completed without matching-source proof. Preserve PR numbers, SHAs and exact public run links when known.

## 10. End-of-session handover

Before ending a development session, report concisely:
1. Canonical master SHA and live production SHA, **separately**.
2. PR(s) merged/open and exact test/run results (OS/browser/asset/smoke).
3. Which requirements were implemented; which are still only planned.
4. Important screenshots/artwork comparisons and outstanding manual accessibility tests.
5. Any known bug/failure, root cause, mitigation and rollback.
6. Next **safe** focused tasks, without assuming permission for other repositories, data or major architecture.

If something cannot be verified, state it explicitly; do not call it finished.


### Latest design direction, 21 November 2026

The **current production** remains the hero-free, centred midsize scenic gallery from PR #23. The owner has now approved a new **prototype exploration**, not a production switch: a non-Japanese brown/gold design with one featured photograph on the left and four compact library tiles on the right. The credited moodboard and exact shared Novel/Manga Sun marks are stored under `docs/assets/`; original photo source URLs and licence/provenance notes are in [Featured visual options](FEATURED_VISUAL_OPTIONS.md). Raw Pexels photographs are not separately redistributed. Compare both concepts in the same coded layout, keep runtime assets self-hosted, and obtain owner visual acceptance before changing the live page. The current Hub SVG logo and sakura panorama remain active until a separate implementation is approved.
