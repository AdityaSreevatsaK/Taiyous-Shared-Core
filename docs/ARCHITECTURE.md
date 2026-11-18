# System Architecture: Five Independent Apps, One Optional Hub

## Topology
```text
                Taiyou's Personal Hub
              (this repo, apps/hub)
                          |
          optional HTTPS navigation links
        /          |            |           \
    Novels         Manga       Anime       Movies & TV
 (existing app)  (future app) (future app) (future app)
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
- `apps/hub`: four module tiles, novels link to verified production address and other links are explicit 'Coming later', no data storage.
- Source tests for contracts, URL validation, server-rendered card semantics and Chromium keyboard/responsive behaviour. Typecheck/build/browser execution is still gated on a real install and working GitHub Actions runners.
No login, datastore, media APIs, service worker or auto-deployment.

## Context boundaries
**Identity:** a shared MediaIdentity is only a candidate *reference*, not a universal storage row. Movie and TV differ, manga uses pages and anime uses episodes. Each app's detailed domain models and progress are authoritative locally.

**Auth:** Cloudflare Pages hostnames are distinct origins. A Secure HttpOnly cookie set by the Novel Library does not automatically work in other apps. Do not weaken cookie scope to emulate SSO. A future identity service needs deliberate redirect/callback/cookie/CSRF/logout design.

**Data:** no shared database for now. Future cross-library search and collections require explicit opt-in data exchange and private server-side permission checks. No client that reads all four private stores directly.

**UI:** share only repeated stateless presentation after at least two real consumers. Scope CSS carefully. A shared dark theme should not force every app into a single layout.

## Runtime failure behaviour
The novel, manga, anime and movies/TV apps MUST function independently when this hub is inaccessible. A planned module without a verified HTTPS link renders a non-interactive status tile rather than a dead button. A malformed or non-HTTPS public URL is rejected.

## Deployment
The hub has no production deployment yet. CI typechecks/tests/builds with no credentials and no paid services. Future Cloudflare Pages deployments need manual owner approval, verified routes, CSP/accessibility review and a rollback plan. Private GitHub repo visibility has no bearing on whether a deployed Pages site is public.
