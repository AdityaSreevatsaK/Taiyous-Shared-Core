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
Four newly created repos are private; existing Novel Library source is public while its HF dataset remains private. Do not modify repository visibility without explicit consent. A private source repo may deploy to a public Cloudflare Pages URL, which needs separate privacy controls.

## External rights
No movies, novels, manga images or anime assets may be copied into this repository for examples. Use text-only placeholders or clearly original/generated fixture assets where approved. Link to existing user-owned applications only.

## Emergency response
If private content or credentials are accidentally committed, cease publishing, rotate/revoke affected tokens, inspect commit history and deployed assets, coordinate with the owner before history rewriting, and record remediation. Do not treat deleting a file in the newest commit as proof secrets are gone.
