# Shared Core RFCs

A request for shared code begins here, **not** with a new exported helper or a copy of another app's source.

## When to propose reuse
At least two **independent media applications** must demonstrate the same concrete need. The Hub and `@taiyou/ui` within this one repository do not count as two consuming media applications. Similar names alone are not evidence of identical semantics. Keep novel progress, manga pages, episodes, watch history, HF adapters, OAuth and owner mode in their owning repositories.

## Proposal workflow
1. Open an RFC using [TEMPLATE.md](TEMPLATE.md) on a focused branch. Fill in both consumer cases with actual owning-repo links, needs and expected usage.
2. Identify data ownership, security/privacy, accessibility and runtime validation. Provide the proposed exported TypeScript interface and example usage without exposing private datasets.
3. Assess bundle/network cost, distribution/semver, CI permissions, backwards compatibility and rollback. Workspace version `0.0.0` is neither published nor stable.
4. Obtain architecture review from Shared Core and opt-in approval from **each consuming repository owner/agent**. Their code remains untouched by this review.
5. Only after an RFC is accepted, implement a small shared-package PR with unit, consumer and accessibility tests. Do not include unrelated backend changes.
6. Prepare independent consumer adoption PRs, pinned versions, migration plans and rollback. Never force all apps to deploy together.
7. Document actual consumers, version provenance and migration outcomes. Close the RFC as rejected or superseded if the abstraction is not useful.

## Statuses
`Draft`, `In review`, `Accepted`, `Rejected`, `Superseded`. An accepted RFC approves a design direction, **not** a deployment, release tag, cross-origin SSO or private-data transfer.

## Existing state
No shared-package release, sibling consumer adoption, cross-origin authentication or shared backend has been approved. `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` remain private experimental workspace source.
