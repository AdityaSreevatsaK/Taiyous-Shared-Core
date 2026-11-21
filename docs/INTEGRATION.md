# Cross-Repository Integration and Coordination Contract

## Exact repository roles
- **Shared Core (this repo):** build-time contracts/UI and parent hub.
- **Novels:** production EPUB data, reader, progress, HF OAuth and existing Cloudflare functions.
- **Manga:** private image-page and reading experience.
- **Anime:** series/season/episode tracking.
- **Movies & TV:** discriminated film/TV catalogue and watch tracking.

The parent hub has **four media tiles** despite five repositories. Movies and TV share one app and are two `MediaKind` types, not two separate deployments.

## How the hub links to apps
- `VITE_NOVELS_URL` defaults to verified https://taiyous-personal-library.pages.dev/.
- `VITE_MANGA_URL` defaults to the verified https://taiyous-manga-library.pages.dev/; `VITE_ANIME_URL` and `VITE_MOVIES_TV_URL` remain empty/planned until the owner verifies actual HTTPS deployments.
- `apps/hub/src/catalogue.ts` rejects non-HTTPS/malformed destinations.
- No fake 'Launch' actions, iframe embedding or private query parameters.
- An app does not need hub uptime to load, resume or work offline.

## Cross-repo package adoption
Private npm workspaces work **inside Shared Core only**. `@taiyou/contracts` and `@taiyou/ui` cannot be assumed importable from another private repo. Do not publish them until a concrete versioning/distribution ADR covers access control, semver, release pipeline, update tooling and rollback. Consider private GitHub Packages with scoped read permissions or a dedicated release process only when at least two apps need identical stable functionality.

**Mandatory RFC entry point:** [docs/rfcs/TEMPLATE.md](rfcs/TEMPLATE.md) and [the RFC process](rfcs/README.md). Require two independent media-app consumers, exact proposed interface, runtime validation, accessibility, release version, distribution/permissions, consumer tests, bundle-size impact, migration, rollback and separate owning-app approval. A Shared Core RFC does not authorise edits to the other repositories.

## Auth boundary
Different Cloudflare `pages.dev` hostnames do not share origin-scoped sessions. The Novel app's encrypted OAuth cookie belongs only to that app. Future central SSO needs identity provider, redirect URL registry, CSRF, PKCE, logout, token lifetimes, per-app authorisation and failure isolation, documented in an ADR. No token storage in a Vite environment variable or hub URL.

## Shared collection and search roadmap
Begin with separate app-specific collections/tags and progress. A future unified collection key may reference `MediaIdentity` only and require explicit user consent to resolve private metadata. Aggregated search must be access-controlled and return a minimal permitted preview, never copy raw novel book text or private manga image assets. Unavailable modules remain usable independently.

## Coordination protocol for parallel agents
For shared APIs send an RFC containing the owning app, exact consumer, interface definition, input validation, intended tests, package version, dependencies, compatibility issue and rollback. Shared Core reviews export impact, then each media session approves adoption in its own repo. No silent cross-repo edits.

## Release contract
All five projects keep independent branch protections and build pipelines. No tag in Shared Core creates a Novel Library release. The owner has approved safe, reviewed Hub PR merges and existing Cloudflare Pages Git-based deployments after matching-SHA green CI. **New hosting origins, privacy changes, secrets, paid infrastructure, cross-repo deployment and release publishing still require separate explicit approval.**
