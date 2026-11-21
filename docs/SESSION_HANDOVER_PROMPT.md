# Self-contained AI agent handover: Taiyou's Shared Core & Personal Hub

**Repository:** [AdityaSreevatsaK/Taiyous-Shared-Core](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core)  
**Canonical branch:** master  
**Last verified production baseline at this update:** 09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc  
**Matching checks:** [CI 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995) and [live smoke 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985), both successful at that exact SHA.  
**Live site:** https://taiyous-shared-core.pages.dev/

This is a handover checkpoint, not a permanent statement of current state. Before acting, re-check Git, open PRs, workflow runs and the public release marker.

## Mission and scope

This repository contains:
1. A static React Personal Hub that links to four independent media libraries.
2. Experimental, local-only TypeScript packages for minimal cross-media contracts and stateless UI components.

The Hub is **not** a central backend, shared private catalogue, SSO provider, data synchronisation service, media scraper or streaming host. Novel and Manga are independent live apps. Anime and Movies & TV are planned/paused. Do not modify sibling repositories or private Hugging Face datasets without a separate explicit request.

## Current production state (verified baseline)

- Four tiles in order: Novel, Manga, Anime, Movies & TV.
- Novel and Manga are whole-card HTTPS links to their independent public frontends. Anime and Movies & TV are inert planned tiles.
- Four exact owner-approved, text-free detailed WebP portraits; real HTML/CSS renders headings, descriptions, availability and CTA content over the lower gradient.
- The visible Welcome heading, supporting sentence and Explore/Read/Watch/Discover motto were removed. A screen-reader-only H1 remains.
- Four midsize posters are centred in a desktop 4 × 1 row, with 2 × 2 tablet and 1 × 4 narrow mobile reflow.
- The production background remains the original sakura/Mount Fuji panorama. The Hub header still uses its own SVG Sun logo/favicon, Georgia typography and the “MY MEDIA GATEWAY” subtitle.
- Six persistent Hub-local themes: Midnight, Charcoal, Plum, Sepia (default), Paper and Ocean.
- Strict self-only CSP, local theme bootstrap, keyboard focus, skip link, reduced-motion support and automated WCAG A/AA checks.

The owner is not satisfied with the overall visual direction and has approved exploring a new non-Japanese direction. Do not describe that exploration as shipped.

## Approved next visual exploration (prototype only)

The owner likes the warm brown/pale-gold/glowing-gold mood from the supplied video, but the crane is not mandatory. Two real photographic concepts were selected:

- **Golden Archive:** historic library, walnut bookshelves and warm light.
- **Cinematic Passage:** ornate architectural corridor, golden sunlight and a vanishing point.

A credited composite moodboard showing both photo concepts is in docs/assets/; the raw Pexels photos are not separately redistributed. The exact shared Sun logo files used by Novel and Manga are also copied there:
- sun-light.webp SHA-256 d292f5b3f8306925b93f1db4b7bee77324072a01
- sun-dark.webp SHA-256 565156eb5da784cdf1c4117a5d300b05dae71d35

Read [Featured visual options](FEATURED_VISUAL_OPTIONS.md) for images, authors, source URLs, licences, dimensions and crop notes, and [ADR-015](adr/ADR-015-photographic-split-layout-exploration.md) for the accepted scope.

**Next design task:** build two code-rendered prototypes using the same split composition: one prominent photo on the left and four compact tiles on the right in a 2 × 2 group. Use the shared Sun logo in the prototype and remove the redundant header subtitle. Explore a walnut/brown and pale-gold palette. “A Place for Every Story.” is only candidate copy. Preserve the existing four approved card illustrations, links, six themes and accessibility requirements.

The two photos and shared Sun WebPs are **documentation references only**, not loaded by the current app. Do not hotlink Pexels. Any selected production photo/font must be self-hosted and locally verified. Do not deploy a new homepage until the owner has reviewed the actual browser screenshots and accepted the result.

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

- PR #19 replaced detailed approved artwork with simplified SVGs; the owner rejected it. PR #20 restored exact original WebP bytes and added SHA-256 checks. Never substitute an approximation.
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

## Immediate next steps

1. Prototype Golden Archive and Cinematic Passage with the same split layout and shared Sun header mark.
2. Capture actual screenshots at 1600 × 900, 1366 × 768, 1280 × 720, 768px, 390px and 320px; inspect image crops, typography, balance, footer and theme variants.
3. Validate keyboard, focus, screen-reader hierarchy, reduced motion, six themes, 200% zoom, CSP and no horizontal overflow.
4. Present both real coded variants for owner selection. Only then prepare a focused production implementation PR.

At handover, report exact PR/head SHA, matching CI, deployed SHA, screenshot evidence, what is truly implemented versus prototype-only, and any remaining manual accessibility checks.
