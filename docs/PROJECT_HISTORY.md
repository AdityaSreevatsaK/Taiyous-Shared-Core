# Project charter, design evolution, decisions and failure history

**Maintained record, last reconciled: 21 November 2026.** This is the narrative record of *why* the project exists. For the executable present-day truth, prefer the source files, tests, `AGENTS.md`, [codebase guide](CODEBASE_REFERENCE.md), and the latest matching-SHA CI run. A feature recorded as an idea in this history is not necessarily implemented.

## 1. The original idea

The owner already had a working personal **Novel Library**. As a wider personal media ecosystem took shape, the goal became a coherent entrance to four kinds of media, with the possibility of sharing genuinely reusable frontend/code contracts without forcing all apps into one monolithic repository.

The original proposed family consisted of **five repositories**:
1. `Taiyous-Shared-Core`, including a small Personal Hub.
2. `Taiyous-Personal-Library`, the independent novel reader.
3. `Taiyous-Manga-Library`, the independent manga reader.
4. `Taiyous-Anime-Library`, an intended future anime app.
5. `Taiyous-Movies-TV-Library`, an intended future film and television app.

There are **four Hub tiles**, not five: Movies and TV share one destination. The aim was visual continuity and convenient launch/navigation, **not** a shared private-data system. Separate apps retain their own domain models, authentication, caching, updates, storage and deployment. One broken app must not take the others down.

The practical attraction of Shared Core was twofold:
- **For visitors:** a beautiful, simple personal gateway with approved branding and exactly four visual choices.
- **For developers/agents:** a source-level home for *possible* reusable contracts and stateless UI, extracted only after evidence from at least two independent media-app consumers.

The distinction matters: a repository named Shared Core is **not** permission to move all app code into a common package.

## 2. Brainstormed directions and the choices made

| Considered direction | Decision or current status | Why |
| --- | --- | --- |
| One monorepo for all media applications | Rejected for now | The working readers have independent lifecycle, data and deployment boundaries |
| One additional repository solely for the Hub | Deferred | Hosting `apps/hub` in Shared Core preserves the five-repository plan |
| Shared always-online microservice/database | Not adopted | The gateway needs only navigation; a backend would create coupling, auth and operations cost |
| Reuse all Novel Library components immediately | Rejected | UI similarity alone does not justify exporting domain-specific state/auth/components |
| Shared login/SSO | Deferred pending an ADR | Cloudflare hostnames and OAuth sessions are separate origins |
| Shared cross-media search/collections | Concept only | Requires consent, server-side authorisation, data contracts and failure-isolation design |
| Uniform themes across all applications | Not required | Each app remains independent; Hub's six themes are local to this Hub |
| Generic icon/glyph library tiles | Superseded | Owner preferred striking, distinct, high-quality full-image media illustrations |
| Four cards in a 2 × 2 desktop layout | Superseded | Owner explicitly chose a **4 × 1 desktop row** |
| Text, descriptions, buttons and status labels overlaid on card artwork | Superseded | Owner chose **image-only portraits with a separate title underneath** |
| Convert final homepage into one screenshot | Rejected | Preserve real responsive CSS, accessible links, separate assets and keyboard focus |
| Raster Sapphire/Antique Gold logo pack | Optional, superseded for the Hub | A distinct owner-approved coded sunrise SVG was adopted for Hub only; it does not redefine the Novel/Manga branding. The owner later explicitly approved exploring the exact shared Novel/Manga Sun WebPs for a future Hub redesign; see ADR-015 |
| New Anime and Movies/TV storage/catalogue now | Paused/deferred | Large media-storage requirements proved impractical for the current plan; prioritise Novels and Manga |

**Scope note:** The Anime and Movies & TV *Hub placeholders* exist, but this repository does not implement their applications, hosting or media storage. The owner's decision to pause large-video work does not imply deletion of their future roadmap.

## 3. Visual design evolution and approved principles

The early homepage direction used a Japanese-inspired sakura/sunrise reference and was refined against live screenshots. This describes the original visual evolution, **not a permanent cultural requirement**: the owner later explicitly said the Hub need not be Japanese-themed and approved the broader photographic exploration in section 10.

- Warm **brown-and-gold top masthead**, a distinct Sunrise-over-water symbol, subtle blossom ornament.
- **Sakura tree canopy from the upper-left**, mountain/sunrise horizon and soft pastel landscape behind hero and card row. The page should feel designed and illustrated, not like a plain dashboard.
- Headline “Welcome to Taiyou’s Personal Hub!”, short supporting line, and “Explore • Read • Watch • Discover” motto.
- Desktop **four-across** portraits, tablet two-across, narrow/mobile one-across.
- At common 100% desktop viewports, aim to show header, hero, complete cards **and footer without unnecessary page scrolling**. At zoom/mobile, allow natural vertical scroll and eliminate horizontal overflow. Never force zoom.
- Portraits occupy the actual tile face; **no names, button graphics, badges, “Explore novels”, “Coming soon”, etc. baked inside**. The one visible HTML library title is below each portrait.
- The Novel and Manga image-and-title surfaces navigate as full accessible links; Anime and Movies & TV are inert until the owner verifies a real deployment. Planned state is conveyed non-visually for assistive technology.
- Preserve colour contrast, keyboard order, skip link, reduced motion, text alternatives and functional focus.
- Six selectable persistent themes: Midnight, Charcoal, Plum, Sepia, Paper and Ocean. **Sepia is the current first-visit default**; earlier work temporarily described Midnight as default. Theme is local and not shared with independent apps.

The final portrait illustrations are **the exact high-detail generated artwork shown to the owner**, cropped into `apps/hub/public/art/{novels,manga,anime,movies-tv}-art.webp` (1086 × 1448). This identity is protected by SHA-256 checks in `scripts/verify-hub-static.mjs`. The prior `*.avif` full-card art remains in the repository as history/rollback, **not** the current card source. The sunrise logo is `apps/hub/public/branding/hub-sun-logo.svg`, with SVG favicon and header blossom asset.

## 4. Traceable implementation chronology

| PR | Change and historical significance |
| --- | --- |
| [#1](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/1) | Initial five-repository plan, Shared Core/npm workspaces, basic Hub, agent/security/architecture docs. No backend/SSO |
| [#2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/2) | Safe destination handling, accessible navigation, real npm lockfile, Node 22 Windows/Linux and browser CI |
| [#3](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/3) | Two-real-consumer prerequisite and RFC process for any shared-code extraction |
| [#5](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/5) | Firefox/WebKit keyboard, privacy and WCAG automation in addition to Chromium |
| [#6](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/6) | Strict static response headers and deployment planning |
| [#8](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/8) | Six theme selections and local persistence with pre-React no-flash bootstrap; first more distinctive cards |
| [#10](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/10), [#11](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/11) | Independent live production smoke and documentation of verified HTTP/security delivery |
| [#12](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/12) | Draft raster-logo integration **closed unmerged** after an owner-approved Hub-specific SVG direction superseded it |
| [#13](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/13) | Deployment `/release.json` with exact commit SHA to reject stale Cloudflare releases |
| [#14](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/14) | Desktop 4 × 1 layout and activation of the already live **Manga Library** destination |
| [#15](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/15) | Detailed illustrated initial homepage and Sepia default; full-card art with printed labels was still used |
| [#16](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/16) | Higher-resolution artwork, seamless background and desktop viewport-fit work |
| [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17) | Reference composition, compact cards, code-defined sunrise logo and SVG favicon |
| [#18](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/18) | Larger, more faithful gold half-sun, water ribbons, floral ornament and background positioning |
| [#19](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/19) | Correct **layout** concept (art-only, titles underneath) but an incorrect simplified set of SVG illustrations; merged then superseded |
| [#20](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/20) | **Artwork correction:** exact high-detail approved illustrations, not simplistic substitutes; removes wrong SVGs, verifies hashes, passes CI, live deployed |
| [#21](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/21) | Comprehensive project documentation, AI-agent playbook and dynamic documentation checks |
| [#22](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/22) | Large cinematic code-rendered poster composition; the implementation used real HTML/CSS but was later judged too large/busy |
| [#23](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/23) | Removed visible welcome/motto and reduced posters to a centred midsize scenic gallery; fixed a background cutoff; latest verified production SHA `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc` |

This list tracks merged milestones and the noteworthy superseded PR. For exact merge dates, commits and checks, consult each GitHub PR/run; do not infer unrecorded outcomes from a title.

## 5. What went wrong and what we learnt

### A. GitHub Actions initially failed to allocate runners
**Observed:** early workflows failed with no executed steps, before application tests ran.  
**Cause/status:** not evidence of defective source; runner/entitlement/visibility limitations were investigated. The owner made Shared Core public, and real Actions jobs started. A trusted Node 22 workflow generated a committed root lockfile, then the temporary workflow was removed.  
**Rule:** distinguish “runner never started” from “test failed”. Never mark tests passing unless a run at the exact code SHA executed and succeeded.

### B. An early workflow lacked a committed lockfile
**Observed:** `npm ci` could not be considered reproducible without the workspace `package-lock.json`.  
**Resolution:** an actual runner-generated lockfile was committed and both OS matrices use `npm ci`; do not edit the lockfile manually or switch CI to unpinned install.

### C. Deployment check could accept a stale live build
**Problem:** a Cloudflare deployment status or plain HTTP 200 did not prove the newest master revision was live.  
**Resolution:** `apps/hub/vite.config.ts` emits `/release.json` from `CF_PAGES_COMMIT_SHA`/`GITHUB_SHA`; `scripts/verify-hub-live.mjs` compares it with the exact merged `master` SHA and checks security headers. Transient propagation is retried before failure.  
**Rule:** green CI, merged PR, Cloudflare build and verified served revision are different claims.

### D. Multiple versions of the Sun mark
**Observed:** changing design direction left an asset-blocked raster-logo PR and stale “temporary logo still pending” documentation.  
**Resolution:** the owner approved a **distinct Hub-specific original SVG** later refined in PRs #17/#18; PR #12 was closed without merging. In November 2026, the owner explicitly approved a new exploration using the exact shared Sun WebP marks already used by Novel and Manga. Those files are copied byte-for-byte into `docs/assets/` as reference assets; the Hub still uses its SVG until a separate implementation is reviewed.  
**Rule:** do not confuse the archived raster ZIP with the shared Sun WebPs. Do not change independent apps' logos. Use the current Hub SVG in production until the new prototype is accepted.

### E. Incorrect artwork substituted for artwork shown to the owner
**Observed:** PR #19 introduced simplified SVG drawings while the owner had approved a much richer detailed four-panel illustration. The titles-under-art layout was correct, but the **art itself did not match the supplied example**. The owner challenged the mismatch.  
**Resolution:** PR #20 crops the actual illustrated source into four high-quality WebP portraits, checks exact hashes, removes the incorrect SVGs and verifies the layout. Live smoke for merge `55046158c38b0ccb6fa6d80c37c2866ee3d676cd` passed.  
**Rule:** a generated **preview image is not implementation**. If the user approves specific imagery, commit/reuse its exact rendered asset, not a text description or imitation. Compare screenshot with source before release.

### F. Screenshots before asynchronous image decode/paint
**Observed:** early CI screenshots showed empty portrait areas although structural image checks and navigation passed.  
**Resolution:** Playwright captures wait for image `decode()` and a compositor paint interval.  
**Rule:** verify actual pixels and timing, not only image DOM nodes or nativeWidth; attach visual evidence for design changes.

### G. Stale tests after CSS/DOM refactors
**Observed:** earlier tests expected old CSS selectors such as `.hub-card-image-complete` after the artwork-only refactor; an SVG namespace URL also triggered an overbroad external-resource regex.  
**Resolution:** correct the tests for the new component boundary, keep negative security checks appropriately scoped, re-run CI.  
**Rule:** inspect **all** browser tests and static-asset verifiers when renaming class/asset paths; never silence a real regression by deleting coverage.

### H. Large-video library storage and scope constraints
**Observed from owner planning:** video-library storage demands on the order of hundreds of GB were not practical under the proposed affordable hosting/storage setup.  
**Current decision:** pause Anime and Movies & TV development; concentrate on novels and manga. Maintain planned navigation only.  
**Rule:** do not infer working Anime or Movies & TV applications from the existence of Hub images or repository scaffolds. Reopen only after an explicit cost/storage architecture decision.

## 6. What exists now and what does not

**Verified production baseline at the start of this update:** master `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc` is a static React Hub with four responsive immersive cards, Novel/Manga public links, planned Anime/Movies cards, six local themes, Hub-specific SVG logo, optional build-time contracts/UI, strict static headers, CI and exact-commit live smoke. Matching [CI 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995) and [live smoke 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985) passed. The Golden Archive/Cinematic Passage and shared Sun logo assets in `docs/assets/` are prototype references, not implemented UI.

**Not present:** central auth/SSO; account profile; synced themes across apps; unified progress, tags, ratings, search or collections; media files/streaming; shared private-data backend; published packages; enforced cross-app adoption; true functional Anime and Movies & TV apps.

The experimental types include hypothetical cross-media metadata; their existence is **not** proof of shared persistence.

## 7. Decisions that must stay reversible

1. Keep all media apps independently deployable.
2. No mandatory Hub uptime for media readers.
3. Make small, evidence-backed cross-repo contracts, not a forced framework.
4. Keep authorisation, private HF datasets, OAuth and owner-mode logic in owning apps.
5. Use approved exact imagery and preserve easy rollback.
6. Keep release verification SHA-specific and transparent about untested manual checks.
7. Distinguish prototype, planned, merged, verified live and owner-accepted visual quality.

## 8. Source/provenance and limits of this history

This narrative reconciles repository history, linked PR descriptions, code and the owner's Hub design feedback through 21 November 2026. It records design directions at a useful level, **not** a verbatim transcript of every discussion. No unpublished technical details about the independent media apps are implied. At each future milestone, update this record with date, PR URL, decision, trade-offs, test run and rollback. If a fact here conflicts with actual code or later production evidence, **code and measured verification win**, and this document must be corrected.


## 9. Cinematic, code-first visual restoration (21 November 2026)

The owner compared **image(6), the ambitious full-page vision**, with **image(7), the live Hub**, and reported that the latter felt like a much cheaper duplicate. The most consequential differences were: the artwork row occupied only the central portion rather than nearly the full viewport; excessive hero spacing pushed the cards down; the scenic sky faded abruptly into a large dark band; and the tiny bare illustrations and separate captions lost the rich, integrated editorial feel of the reference.

The updated instruction was **explicitly to implement the homepage in code**, not to generate or supply another standalone image. The solution is a rewritten, consolidated Hub stylesheet and a stateless `immersive` card variant rendered in React: large 3:4 original images, a progressive lower gradient, accessible live HTML captions, descriptions, statuses and calls to action, full-card links for Novel and Manga, and inert planned cards. It preserves the original approved exact WebP files, the SVG Sunrise brand, six themes, all safe link rules and responsive reflow. The reference's label panels are code, **not a composite screenshot or new generated raster**.

This explicitly **supersedes the former titles-below composition** but does **not** reverse the earlier rejection of imitated/simplified art. The legacy `imageOnly` variant remains supported in Shared Core for compatibility; it is no longer the Hub's homepage presentation. At all times, the current approved code and verified deployed revision take precedence over this historical description.

### I. Screenshot paint race during cinematic redesign

During reference comparison, the browser occasionally captured blank purple/red third and fourth tiles even though the original WebP elements reported successfully decoded, causing misleading visual screenshots. The code now uses non-negative card stacking levels and `tests/visual-evidence.ts` validates **pixel variation in each rendered card** before saving CI screenshots. This test explicitly fails if the picture is still blank; it does not assume element presence or `naturalWidth` proves visual correctness.


## J. Removing excess copy and tuning the scene-first homepage (21 November 2026)

After the full-width cinematic rebuild, the owner found the four posters **too large** and the visible welcome headline, supporting sentence and motto unnecessary. The next refinement removed the entire visual hero, left an accessible hidden H1, reduced the 4 × 1 desktop poster row to a moderate centred gallery size and gave the original sakura/Fuji landscape more surrounding space. The online image investigation and explicit **keep existing original licensed art** decision are preserved in [Scenery research](SCENERY_RESEARCH.md). This choice does not reopen the earlier simplified-SVG mistake or alter the exact WebP artwork hashes.


### Avoiding clipped landscape backgrounds in dark and light themes

The initial hero-free screenshot showed an abrupt horizontal colour band above the footer because the prior `background-position: center calc(45% - 180px)` moved the cover-sized AVIF **up beyond the painted main surface**, exposing the underlying theme background. It was especially obvious in Charcoal. The fix restores `background-position: center 45%` while keeping `background-size: cover`, and the browser regression now asserts both properties. Actual 1600×900 Sepia and Charcoal screenshots confirm a continuous painterly landscape fading naturally into the footer.
