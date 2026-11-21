# Shared Core Security and Data-Minimisation Rules

## Assets and threat model
The Hub is a static navigation app and currently holds NO user catalogue, credentials, media text or private images. Risks include linking to spoofed domains, leaking auth credentials in URLs, XSS from untrusted metadata, cross-origin cookies, malicious package publishing, dependency compromise, and accidental public release of private files.

## Controls implemented in the scaffold
- Hub registry accepts public-looking HTTPS navigation links only, rejecting credentials, local/IP hosts, non-default ports and URL queries/fragments. The shared card also prevents obvious invalid links. Domain ownership still needs manual deployment verification.
- Planned modules without valid links render non-interactive cards.
- No fetch of private media and no shared authentication.
- Namespaced cross-media IDs validate safe segments.
- Shared UI component is presentational and has no network/storage side effects.

## Hard controls before release
1. Recheck each configured domain belongs to the owner. Never copy URLs from untrusted PR metadata.
2. No `VITE_*` secrets, tokens, personal reviews or private file paths in the frontend. Published static JavaScript is visible to everyone regardless of repo visibility.
3. Content-Security-Policy, frame/clickjacking policy, referrer policy, dependency scanning and header validation on the deployed Cloudflare project.
4. Accessible keyboard/focus behaviour; no open redirects from arbitrary query parameters.
5. Avoid `dangerouslySetInnerHTML` for titles and descriptions.
6. Pin and audit third-party packages; add lockfile, deterministic CI install and PR review.
7. Use least-privilege Actions tokens. No release or publishing permissions in ordinary PR workflows.
8. If a shared package ever handles data, enforce schema validation, revision checks, explicit auth and tenant/scope boundaries, with threat review in an ADR.

## Auth / SSO decisions
There is currently no cross-app SSO. Same-origin HttpOnly cookies from the Novel Library do not authenticate the other deployments. Do not weaken SameSite or copy OAuth tokens to browser storage to make the experience appear unified.

## Repo/public visibility
Shared Core source is now **public by explicit owner action**. The existing Novel Library source is also public, while its Hugging Face dataset is private. Manga, Anime and Movies & TV were last recorded as private; do not change their visibility. Public GitHub source and future Cloudflare Pages access are separate privacy decisions. Never put private data, source secrets or credentials in static assets, screenshots or Actions artifacts.

## External rights and stock-photo references
Do not copy private media, novels, manga pages/covers, anime frames or film/TV stills into this repository. The composite moodboard in `docs/assets/featured-visual-moodboard.webp` shows two Pexels stock-photo design references; their source URLs, photographer credits and the [Pexels licence](https://www.pexels.com/license/) are recorded in `docs/FEATURED_VISUAL_OPTIONS.md`. Pexels permits free website use and modification, with no attribution requirement (credit is appreciated), but prohibits standalone redistribution. The repository therefore does not contain the raw photos as separate files. Pexels also warns that additional property, trademark, privacy or other rights may apply to depicted subjects; recheck any such rights before a production/commercial use. Do not hotlink Pexels from the app. If a photo is chosen for production, obtain it from the original source page, self-host it as part of the actual site design and preserve its provenance. The shared Sun logo WebPs are exact copies of public brand assets already used by the owner's Novel and Manga apps; do not modify those sibling repositories as part of Hub work.

## Emergency response
If private content or credentials are accidentally committed, cease publishing, rotate/revoke affected tokens, inspect commit history and deployed assets, coordinate with the owner before history rewriting, and record remediation. Do not treat deleting a file in the newest commit as proof secrets are gone.
