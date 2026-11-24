# Self-contained AI agent handover: Taiyou's Shared Core & Personal Hub

**Repository:** [AdityaSreevatsaK/Taiyous-Shared-Core](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core)  
**Canonical branch:** master  
**Verified cinematic release checkpoint at this update:** f497b62eab04d67b3f2652f9bf55131417d2b708  
**Matching checks:** [post-merge CI 45443821106](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821106) and [live HTTPS/security smoke 45443821238](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/45443821238), both successful at that exact SHA.  
**Live site:** https://taiyous-shared-core.pages.dev/

This is a handover checkpoint, not a permanent statement of current state. Before acting, re-check Git, open PRs, workflow runs and the public release marker.

## Mission and scope

This repository contains:
1. A static React Personal Hub that links to four independent media libraries.
2. Experimental, local-only TypeScript packages for minimal cross-media contracts and stateless UI components.

The Hub is **not** a central backend, shared private catalogue, SSO provider, data synchronisation service, media scraper or streaming host. Novel and Manga are independent live apps. Anime and Movies & TV are planned/paused. Do not modify sibling repositories or private Hugging Face datasets without a separate explicit request.

## Current production state (verified checkpoint, 24 November 2026)

- **Cinematic fantasy-library React/CSS gateway shipped** in [PR #25](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/25) at product commit `f497b62eab04d67b3f2652f9bf55131417d2b708`. The owner approved release of the reviewed design.
- Four independent sculpted, gold-edged panels with separate high-density local WebP art: `cinematic-*-1600.webp` and `cinematic-*-900.webp`. The repaired `hero-clean.webp` architectural backdrop removes duplicated ghost panels. Titles, statuses, buttons, masks and theming are real React/HTML/CSS, not baked into a screenshot.
- Novel and Manga remain whole-panel independent HTTPS links; Anime and Movies & TV remain **inert** planned tiles. No central auth, reading history, private data or backend.
- Desktop cinematic composition, tablet two columns and mobile one column. A locally drawn gold Sun, serif headings, restrained rim highlights, native six-theme selector (Sepia default), header-local destination search and reading shortcuts.
- Strict CSP, local-storage theme bootstrap, keyboard and reduced motion. Latest matched CI passed Ubuntu/Windows and Chromium/Firefox/WebKit automated accessibility and reflow; public exact-commit smoke verified release manifest and security headers.
- **Not manually verified:** physical native Safari/touch, NVDA/VoiceOver, real-device browser zoom, owner device appearance and actual public-origin reader navigation/return paths. These remain in [release issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7).
- Historical `*-art.webp`, Golden Archive/Cinematic Passage references (ADR-015), SVG prototype (ADR-016) and reference crops are maintained for provenance, not current rendering. See [release notes](RELEASE_2026-11-24_CINEMATIC_HUB.md) and [ADR-017](adr/ADR-017-cinematic-target-reconstruction.md) / [ADR-018](adr/ADR-018-cinematic-artwork-high-density.md).

## Superseded photographic exploration

The historical Golden Archive/Cinematic Passage moodboard and shared Sun photo references are preserved in [Featured visual options](FEATURED_VISUAL_OPTIONS.md) and [ADR-015](adr/ADR-015-photographic-split-layout-exploration.md), but are not the live design or an open prototype task. The owner instead chose the separately generated cinematic fantasy-library image and refined the working React implementation until release. Do not mistake the old prototype approval language for an active release blocker.

## Repository architecture and technology

- apps/hub/: React 18, TypeScript, Vite 6 static app.
- packages/contracts/: private/unpublished @taiyou/contracts@0.0.0 minimal media identity/types and helpers.
- packages/ui/: private/unpublished @taiyou/ui@0.0.0 stateless MediaHubCard.
- Node.js 22+, npm workspaces and committed package-lock.json.
- Vitest unit tests; Playwright Chromium/Firefox/WebKit; axe-core accessibility checks.
- GitHub Actions quality CI on Ubuntu and Windows; separate exact-SHA Cloudflare live smoke.
- Cloudflare Pages is connected to master, build output apps/hub/dist.
- No backend, database, private media access, OAuth, cross-app cookies or runtime shared services.

Read [Architecture](ARCHITECTURE.md), [Codebase reference](CODEBASE_REFERENCE.md), [Operations](OPERATIONS.md), [Security](SECURITY.md) and [Testing](TESTING.md) before changing these areas.

## Mandatory dynamic-state inspection

Before every substantial task:
1. Run git status --short --branch; inspect tracked, staged and untracked work. Never discard another agent's changes.
2. Fetch/prune refs; inspect latest master, recent commits, branches, open PRs/issues and latest workflow runs.
3. Read AGENTS.md, README.md, this playbook, project history, codebase reference, decisions, roadmap and task-relevant docs.
4. Inspect the actual source, tests, final CSS rules, asset bytes, workflows and build output. Do not trust previous agent summaries or historical docs without checking.
5. Fetch live /release.json and compare it with exact current master; inspect the matching live smoke and security headers.
6. Classify relevant work as implemented and verified, implemented but unverified, partially implemented, approved for prototype only, planned/deferred, or deprecated/superseded.
7. Define acceptance criteria and non-regression invariants before editing.

**Evidence order:** current Git status/source/tests and freshly measured deployment > latest merged PR and explicit owner decisions > current docs > older history, screenshots and AI summaries. Direct new owner instructions take precedence.

## Quality commands

Use Node 22+ and the committed lockfile:

    npm ci --no-audit --no-fund
    npm run typecheck
    npm test
    npm run build
    node scripts/verify-hub-static.mjs
    npm run verify:docs
    npx playwright install chromium firefox webkit
    npm run test:browser

Do not regenerate the lockfile casually. Require matching-SHA green Ubuntu/Windows and Chromium/Firefox/WebKit checks. Review actual screenshots after images decode and paint. Automated axe results are not manual screen-reader acceptance.

## Historical failures and lessons

- PR #19 replaced detailed approved artwork with simplified SVGs; the owner rejected it. PR #20 restored exact original WebP bytes and added Git blob SHA-1 checks. Never substitute an approximation.
- A previous image-only/titles-below design and later large cinematic cards were both superseded by subsequent owner feedback. Preserve chronology, but use current source and the latest explicit direction.
- A negative fixed-pixel background offset caused a flat band above the footer; PR #23 restored a centred cover position and added a regression test.
- CI runner allocation failures were infrastructure/visibility issues, not app failures. Diagnose whether a job actually started before interpreting it.
- A green build or merged PR does not prove deployment. Verify exact live /release.json.
- Do not infer implementation from documentation, screenshots, an open PR, or a prior agent summary.

## Release and collaboration boundaries

- Work on a focused branch and PR; no direct master pushes or force pushes.
- Merge only after matching-SHA CI passes under the owner's standing approval; verify Cloudflare serves the exact new SHA afterward.
- No paid services, new auth, SSO, shared database, publishing packages, repository visibility changes, private data handling or sibling-repository changes without separate explicit approval.
- Keep all runtime image/font requests local and preserve CSP.
- Do not create a fake link for planned Anime or Movies & TV.
- Keep documentation aligned with source and mark old decisions superseded rather than silently deleting history.

## Immediate next steps (post-release)

1. Reconfirm current `master`, latest GitHub Actions and `/release.json` after any further merge.
2. Use [issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7) to complete real-device Safari/touch, 200% zoom, VoiceOver/NVDA, on-origin reader links/return paths, and performance/Core Web Vitals assessment with evidence.
3. Keep original artwork and historical assets intact until dependency/rollback audit justifies focused removal.
4. Preserve independent readers, existing security headers, exactly four honest navigation destinations and unpublished local-only shared packages. Treat visual polish as evidence-driven maintenance, not a mandate for another wholesale redesign.

Handover must identify exact PR, SHA, matching CI, independent production smoke, real browser screenshots and manual acceptance gaps.\n