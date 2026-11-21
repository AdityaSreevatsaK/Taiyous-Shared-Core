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

## 2. Mandatory fresh-state investigation (every session)

1. Check `master` latest SHA and whether the repo/branch is clean, PRs and issues are open, and another agent is already editing a relevant file.
2. Read `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, this playbook, [History](PROJECT_HISTORY.md), [Codebase](CODEBASE_REFERENCE.md), [Decisions](DECISIONS.md), [Roadmap](ROADMAP.md), [Operations](OPERATIONS.md), [Security](SECURITY.md), [Testing](TESTING.md) and relevant RFCs.
3. Re-read **actual source** for requested changes: App, catalogue, theme, CSS overrides, UI component, assets, unit tests, browser tests, static verifier, CI workflows.
4. Compare README/docs claims to actual source and latest merged/live test evidence. Do not copy stale “only Novel is live”, “temporary Sun logo”, “run npm install/generate a lockfile”, or “do not deploy without permission” instructions from old historical sections.
5. Confirm active external destinations belong to the owner and respond as expected; **do not** inspect private media stores or put credentials in test output.
6. Write a small acceptance checklist describing what will change, which existing behaviour cannot regress and what proves success.

**Source precedence when contradictions exist:** latest source and measured current deployment > latest approved decision/PR > updated agent charter > historical PRs > old prose. Preserve intentional design decisions; never use this ordering to overrule direct new owner instructions.

## 3. Current non-negotiable user-facing contract

- Four media cards in this exact order: Novel, Manga, Anime, Movies & TV.
- Desktop **4 × 1**, tablet **2 × 2**, phone **1 × 4**; 100%-desktop fit without clipping or forced zoom; correct 200% zoom reflow and no horizontal overflow.
- **Exact detailed approved WebP portrait imagery** under `apps/hub/public/art/*-art.webp`, not rewritten SVG approximations. Card art contains no text or badges; one visible HTML title centred **beneath** each portrait.
- Whole Novel/Manga card (image + title) is a safe HTTPS link. Planned cards are inert with accessible planned-state semantics.
- Warm brown top bar, approved Hub-specific sunrise-over-water SVG logo, blossom ornament, continuous sakura/mountain/sunrise background.
- Six theme choices, **Sepia default**, persistence and no-flash bootstrap with strict no-inline-script CSP.
- Focusable skip link, proper heading levels, keyboard access, visible focus, reduced-motion support, appropriate contrast.
- No “Explore”, “Launch”, “Coming soon” or other action text inside images; no misleading clickable planned tiles. Do not duplicate art labels in overlays.
- The independent readers, their auth, catalogue, themes and private datasets must remain untouched and functional without the Hub.

If a proposed feature appears to conflict with these, write down the change in decision history and obtain a clear new design instruction instead of quietly overriding a previously approved outcome.

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
| “PR #12 says final raster logo is pending, so replace current Sun mark.” | PR #12 was **closed unmerged**; Hub SVG became owner-approved in PR #17/#18 |
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
