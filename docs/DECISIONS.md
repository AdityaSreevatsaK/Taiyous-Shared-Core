# Accepted Decisions and Open ADRs

**ADR-001: Five repositories.** Shared Core/hub, Novels, Manga, Anime and Movies & TV. Four frontend media destinations. Decision avoids a five-app monorepo and allows independent deployment.

**ADR-002: Hub inside Shared Core initially.** A separate `apps/hub` workspace keeps five repos total. If hub changes outgrow package release cadence, propose a sixth repo later, with evidence.

**ADR-003: Shared Core has no always-on backend.** Build-time packages only, hub as optional navigation. No runtime dependency.

**ADR-004: Cross-media identity is namespaced and minimal.** Existing novel IDs and domain-specific progress remain intact. No forced schema migration.

**ADR-005: Auth not shared until designed.** Existing HF OAuth is origin-specific; cross-app SSO is an explicit future design, not a free feature.

**ADR-006: Experimental packages are private and unpublished.** Only promote an API after two actual consumers and migration/rollback plan.

**ADR-007: Honest app status.** Only Novel Library has a verified production link. Others are visibly planned; no dummy data or inactive controls disguised as features.

## Open ADRs
- Choice of hub hostname, Cloudflare Pages account/project and access policy.
- Hub's relationship to future central settings and user profile.
- Private package distribution (GitHub Packages or alternative) and release automation.
- Whether a cross-media collection registry is worth its security/sync cost.
- Cross-site auth identity, session revocation, owner actions and CSRF.
- Data portability/export contract across separate apps.

## New ADR template
For a proposed choice create `docs/adr/NNN-title.md` with Status, Context, Options, Decision, Alternatives rejected, Security and privacy consequences, Data migration, Operational cost, Compatibility, Tests, Rollback and Owner sign-off. Avoid retroactively editing accepted decisions without recording supersession.
