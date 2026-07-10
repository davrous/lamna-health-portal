# Backlog issue — paste into a new GitHub Issue

> Copy the title and body below into a new Issue, then assign it to the GitHub
> Copilot coding agent on camera (Act 1). This is the feature Copilot builds
> live — do **not** implement it on `main` ahead of time. See `Demo-Build-Spec.md`
> Section 4 for the reference implementation and `docs/` for the grounding.

---

**Title:** `Add claims status lookup to the member portal`

**Body:**

```
Add the "Claims" section to the Lamna Health member portal so members can look up the status of a claim.
The repo is already prepared for this (see config/navigation.ts and docs/).

Acceptance criteria:
- Add Claim + ClaimStatus models to lib/types.ts.
- Add a lib/claims.ts service following the lib/members.ts / lib/providers.ts pattern; export from lib/index.ts.
- Add data/claims.json (fictional) referencing existing member IDs; members only see their own claims.
- Create app/(portal)/claims/page.tsx (list) and app/(portal)/claims/[id]/page.tsx (status timeline:
  Received > In review > Processed > Paid). Reuse Badge, Card, DataList, PageHeader, ProgressBar.
- Uncomment the Claims entry in config/navigation.ts (import ReceiptText from lucide-react).
- Validate input on the claim lookup field.
- (If a test runner is present) add unit tests for lib/claims.ts.

Follow AGENTS.md, docs/claims-api.openapi.yaml, and docs/claims-domain.md. Next 16: check node_modules/next/dist/docs/.
```
