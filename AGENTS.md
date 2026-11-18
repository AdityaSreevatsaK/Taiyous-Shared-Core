# AI Agent Rules for Shared Core and the Personal Hub

This is the **cross-repository architecture coordination repository**, not the owner of every media application's product development. Your session must actively prevent unnecessary shared abstractions and coupling.

## Exact responsibilities
- Own `packages/contracts`: carefully versioned common primitives, namespaced media references and documented compatibility rules.
- Own `packages/ui`: **stateless** reusable presentational components with accessible semantics and minimal peer dependencies.
- Own `apps/hub`: premium responsive personal gateway, honest active/planned link states, no private media data or central authentication.
- Own cross-app design/integration documentation and architectural decision records.
- Coordinate proposals from Manga, Anime, Movies & TV and Novel Library agents without editing those repos from this session.

## Mandatory onboarding every session
1. Inspect latest `master`, branches, pull requests, workflows and deployment state.
2. Read `README.md`, this `AGENTS.md` and every relevant `docs/*.md`.
3. Build a source inventory with implemented vs planned behaviour; verify all links/versions.
4. Run `npm install`, `npm run typecheck`, `npm test` and `npm run build`.
5. State current blockers, then implement an approved increment with tests on a short-lived branch, review diff and make a PR.
6. Report exact results, what was not exercised, links to PR and any integration changes other agents must adopt.

## Non-negotiable separation
- Shared Core must not contain EPUB, manga page parsing, anime season tracking, film watch status, storage repositories or OAuth handlers that are specific to one application.
- Never move Novel Library code just because it has a useful name. Prefer a careful **adapter boundary**, extraction proposal, tests and staged migration.
- No runtime dependency from any app to the live hub. A broken hub must not block opening novels or tracking media directly.
- No cross-repo code edits without explicit authorisation. Each owning session independently reviews shared API adoption.
- No Git submodules or floating Git dependencies. No shared backend until a specific ADR with genuine measurable value is approved.

## Shared package release policy
Current packages are private workspaces at version 0.0.0. They are NOT published, stable or installed by independent apps. Proposals require: name, concrete two-consumer need, source API and tests, privacy/permissions, package boundary, semantic version, migration, rollback, bundle-size impact and integration PR plan. A change to exported types is a potential breaking change even if TypeScript compiles locally.

## Security and user data
No secrets, private media, OAuth sessions, owner passphrases, personal tags/ratings/comments or library catalogues in the hub or shared code. Only verified HTTPS public app destinations may be shown. No client-side aggregation of private datasets across origins. Never claim the user is globally authenticated without an authorised identity service. Vite `VITE_*` variables are public. No auto-deploy or production secret handling without owner approval.

## Design/quality principles
React 18 and TypeScript strict, minimal dependencies, semantic UI, keyboard navigation, clear focus, colour contrast, mobile-first layout, zero decorative fake controls and honest offline/error/loading states. CSS must not leak global styling into consuming apps: make future shared style tokens semantic and opt-in. Accessibility tests at 320/390/768/1280 widths. Do not over-engineer simple route links into service orchestration.

## Safe workflow and hard stops
Write ADRs for auth, persistence, cross-media collections, cross-app search and package publishing. No force pushes, publicisation of private repositories, release tags, commercial services, paid APIs in CI, or destructive data operations without approval. If a plan requires altering the live Novel Library, submit a proposal to its owning session rather than making the change here.

## First milestone
Finish and verify the hub scaffold and docs, generate a reproducible npm lockfile, add functional keyboard/mobile tests for link state, and consider the first small reused component only after another app requests it. No need to invent a central identity service.
