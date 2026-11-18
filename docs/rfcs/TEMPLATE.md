# RFC-XXX: [Name of proposed genuinely reusable component or contract]

**Status:** Draft
**Proposing application and owner:**
**Independent consumer A (repository, use case, proposed owner):**
**Independent consumer B (repository, use case, proposed owner):**
**Proposer / reviewers:**
**Date / target revision:**
**Linked issues, source investigations and design references:**

> Copy this template to `docs/rfcs/NNN-short-name.md`. Do not count Shared Core and its Hub as two independent media-app consumers. Redact all personal catalogue/media data, secrets, tokens and owner credentials.

## 1. Problem and evidence
Describe the user-facing problem in each independent application, using concrete files, screenshots with non-sensitive fixtures, or issue links. Explain why keeping two local implementations would be worse than one shared contract. What measurable duplication, defect or maintenance cost exists today?

| Evidence | Consumer A | Consumer B |
| --- | --- | --- |
| Existing UX/API | | |
| Required behaviour | | |
| Domain differences | | |
| Contact/approver | | |
| Acceptance criteria | | |

## 2. Explicit scope and non-goals
Define the smallest shared surface. List media-specific logic that **stays with each app**, including progress, catalogue persistence, auth, owner mode and format-specific rendering. State whether the Hub needs this component at all. The shared package must not become a runtime dependency on the Hub.

## 3. Proposed public API
Include precise types, input/output examples, defaults, error behaviour, events and accessibility semantics. Document SSR, keyboard, focus and screen-reader behaviour for UI exports. Include positive and negative examples. No unrelated backend or domain-specific data may leak into the types.

```ts
// Proposed only: replace with concrete exported API after review.
// export interface ProposedProps { ... }
```

## 4. Validation and threat model
- Trust boundaries and untrusted input sources:
- Runtime schema validation beyond TypeScript:
- Authentication/authorisation required by the **owning app**:
- Injection, cross-origin, XSS, URL, SSR and data-leak risks:
- Data minimisation, personally identifiable information and logging:
- What happens if a consumer is offline, fails or uses an older version:
- Browser security policy implications:

## 5. Versioning and distribution
- Current package and experimental API inventory:
- Proposed package name, entrypoints and exact semantic version:
- Distribution choice, private-registry permissions and why:
- Dependency/peer dependency matrix; Node, React and browser compatibility:
- Lockfile, published files, exports map and licence:
- Consumer version pinning and release provenance:
- Ownership and approvals for package publishing:
- No floating Git refs, unreviewed direct-source copies or auto-publishing:

## 6. Accessibility and design
Record keyboard/focus/ARIA semantics, screen-reader and touch behaviour, WCAG contrast considerations, semantic token usage, CSS isolation, dark/light modes, responsive widths, reduced motion and visual-review fixtures. Components cannot rely on global CSS selectors within a consuming app.

## 7. Performance and operational cost
Measure estimated and actual source/bundle changes (raw and gzip), new network/JS dependencies, critical render impact, hydration/SSR and caching consequences. Identify maintenance obligations and alternatives with smaller cost.

## 8. Testing and consumer acceptance
| Gate | Shared package | Consumer A | Consumer B |
| --- | --- | --- | --- |
| Typecheck and build | | | |
| Pure/runtime unit tests and negative cases | | | |
| Accessibility and keyboard tests | | | |
| Browser/screenshot/responsive tests | | | |
| Old/new version compatibility | | | |
| Offline/failure behaviour | | | |
| No private data/credentials | | | |

State exact commands, platforms, test SHA, what could not be exercised, and which workflows actually ran. **Never treat pre-runner GitHub Actions failures as successful testing.**

## 9. Migration and rollback
Describe opt-in adoption PR order, adapters needed for existing novel IDs/data models, feature flags if relevant, error handling, version pinning, rollback commits and how both apps continue working independently during outages. No changes to another repository are authorised by creating this RFC.

## 10. Alternatives and decision
Compare:
1. Keep per-app implementations.
2. Shared stateless component or pure contract.
3. More elaborate shared infrastructure (normally rejected unless justified).

Explain the choice, rejected alternatives and conditions to revisit it.

## 11. Sign-off and follow-up
- [ ] Two independent media-app consumer needs confirmed.
- [ ] Shared Core architecture/security/accessibility reviewed.
- [ ] Domain ownership and storage separation preserved.
- [ ] Distribution, semver and rollback approved.
- [ ] Both consuming application owners approve their **own** future adoption PRs.
- [ ] No private data, media or secrets added.
- [ ] No publish, deployment or SSO implied.
- [ ] Implementation PR and per-consumer test evidence attached after acceptance.

**Decision:** Pending
**Decision date and reviewer:**
**Accepted version, implementation PR and consumer PRs:** Pending
