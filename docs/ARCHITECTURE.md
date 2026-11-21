# System Architecture: Five Independent Apps, One Optional Hub

## Topology
```text
                Taiyou's Personal Hub
              (this repo, apps/hub)
                          |
          optional HTTPS navigation links
        /          |            |           \
    Novels         Manga       Anime       Movies & TV
 (live app)    (live app)   (planned)   (planned)
       |             |            |           |
 independent auth, local state, data store and deployments
```

Shared source-code packages (versioned, opt-in, **build-time only**):
```text
@taiyou/contracts ──► small cross-media types and pure helpers
@taiyou/ui        ──► stateless, accessible UI primitives
                    └─ consumed by apps ONLY after compatibility approval
```

## Why the hub belongs here initially
The owner wants five repositories total. Hosting `apps/hub` in Shared Core avoids a sixth repo for a simple navigation screen, while keeping the hub as a separate npm workspace with its own build artefact. If hub product needs and shared package releases diverge substantially, use an ADR to split it out later. It is not a service for other apps.

## Implemented
- Node 22 npm workspaces, React 18, TypeScript strict, Vite.
- `packages/contracts`: MediaKind and ModuleKey, namespaced ID builder with URL-safe segments, optional personal rating validator.
- `packages/ui`: a pure `MediaHubCard` React component that returns a link only when a configured destination is available.
- `apps/hub`: four immersive media cards using exact detailed WebP images and real HTML heading/description/status/CTA overlays; **Novel and Manga** have verified links, Anime and Movies & TV are non-interactive planned tiles; six local themes and no personal media data.
- Current deployed composition is the hero-free centred midsize 4 × 1 scenic gallery from PR #23. The shared Sun logo and photographic options in `docs/assets/` are approved design references only, not runtime dependencies.
- Executed CI verifies contracts, URL validation, card semantics, and Chromium/Firefox/WebKit responsive, keyboard and accessibility behaviour. Node 22 locked builds pass on Ubuntu and Windows. The former runner allocation blocker is resolved.
No login, datastore, media APIs or service worker. Cloudflare Pages Git integration is now connected, independent of GitHub Actions verification.

## Context boundaries
**Identity:** a shared MediaIdentity is only a candidate *reference*, not a universal storage row. Movie and TV differ, manga uses pages and anime uses episodes. Each app's detailed domain models and progress are authoritative locally.

**Auth:** Cloudflare Pages hostnames are distinct origins. A Secure HttpOnly cookie set by the Novel Library does not automatically work in other apps. Do not weaken cookie scope to emulate SSO. A future identity service needs deliberate redirect/callback/cookie/CSRF/logout design.

**Data:** no shared database for now. Future cross-library search and collections require explicit opt-in data exchange and private server-side permission checks. No client that reads all four private stores directly.

**UI:** share only repeated stateless presentation after at least two real consumers. Scope CSS carefully. A shared dark theme should not force every app into a single layout.

## Runtime failure behaviour
The novel, manga, anime and movies/TV apps MUST function independently when this hub is inaccessible. A planned module without a verified HTTPS link renders a non-interactive status tile rather than a dead button. A malformed or non-HTTPS public URL is rejected.

## Deployment
Cloudflare Pages is connected to `master`. The latest verified production baseline at the start of this documentation update is `09d4673ba01fb21216fcab8eda2fb01f8c4ebfbc`; [CI run 44923073995](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073995) and exact-SHA [live smoke 44923073985](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44923073985) passed, verifying HTTP 200, security headers, React/theme bootstrap and the served commit. Full manual visual, assistive-technology and access-policy review remains separate; never infer all user journeys are correct from a smoke test. CI typechecks/tests/builds with no credentials and no paid services. Repository visibility does not guarantee hosted site privacy.

## Present design and scope note (21 November 2026)

See [Project history](PROJECT_HISTORY.md), [Codebase reference](CODEBASE_REFERENCE.md) and [Featured visual options](FEATURED_VISUAL_OPTIONS.md). The live page is the PR #23 hero-free centred gallery: exact owner-approved detailed WebP art with HTML card overlays, the original sakura/Mount Fuji background and Hub-specific SVG sunrise branding. The owner has approved a **prototype exploration only** for a non-Japanese brown/gold split layout with Golden Archive or Cinematic Passage on the left, four tiles on the right and the shared Novel/Manga Sun mark. These references live under `docs/assets/` and are not part of the Hub runtime. Anime and Movies & TV remain placeholders, not functional private media services. This repository is **not** the home of shared Hugging Face storage or authentication.
