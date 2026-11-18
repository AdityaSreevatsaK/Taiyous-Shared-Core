# Shared Core and Personal Hub Roadmap

## Phase 0: foundation (current)
- [x] Five-repository architecture chosen.
- [x] Shared Core private npm workspace and navigation-only Hub scaffold.
- [x] Experimental identity/rating contracts and pure media card component.
- [x] Node 22 TypeScript/React/Vite build and initial tests.
- [x] Agent, architecture, security, integration, operations and decision documentation.
- [ ] Commit generated workspace `package-lock.json` and use locked CI install.
- [ ] Run and fix first GitHub CI on `master`, record its SHA.
- [ ] Confirm GitHub description/topics manually.

## Phase 1: excellent parent hub
- [ ] Owner approves design direction and responsive screenshot review.
- [ ] Add keyboard/mobile/browser tests, colour themes, accessible navigation and graceful error states.
- [ ] Keep unavailable modules plainly planned; no dummy redirects.
- [ ] Verify the Novel Library link remains valid without copying its data.

## Phase 2: identify REAL reusable code
- [ ] Ask at least two owners of media apps for the same UI/API requirement.
- [ ] Write RFC, API and versioning/rollback proposal.
- [ ] Add semantic tokens and 1–2 stateless components, not a universal media framework.
- [ ] Add package consumer fixtures and contract compatibility tests.

## Phase 3: controlled hub deployment
- [ ] Approve verified HTTPS domain and privacy posture.
- [ ] Manual Cloudflare Pages release, CSP, accessibility and rollback checks.
- [ ] Set optional module URLs only when each app is genuinely deployed.
- [ ] No shared private backend or SSO.

## Phase 4: optional advanced platform services
- [ ] Evaluate opt-in cross-library search and collections with a server-side authorisation threat model.
- [ ] Evaluate central identity only if repeated per-app logins justify the additional security/maintenance complexity.
- [ ] Split hub to a sixth repo only when release cycles or maintainership genuinely diverge.

## Explicit non-goals
Rewriting the working Novel Library, forcing universal chapter/episode progress, creating a mandatory microservice or proxying private media through the hub.
