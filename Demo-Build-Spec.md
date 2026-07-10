# Lamna Health — Side-by-Side Demo · Repo Preparation Spec (v2, aligned to the real repo)

> **What this is:** a brief for **GitHub Copilot** to prepare the **existing** repository
> [`davrous/lamna-health-portal`](https://github.com/davrous/lamna-health-portal) for recording a
> ~3-minute side-by-side compete video. The app is **already built and well structured** — this spec
> does **not** re-scaffold it. It adds the demo grounding, wires the "Claims" backlog item cleanly, and
> sets up everything needed to film. Everything is fictional and HIPAA-safe (internal enablement, not a
> customer deliverable).

> **How to use:** commit this file to the repo root (e.g. `DEMO-BUILD-SPEC.md`) or paste it into a Copilot
> chat, then work through the **Task list for Copilot** (Section 12). Assign the backlog **issue**
> (Section 6) to the Copilot coding agent on camera for Act 1.

---

## 0. Verified repo facts (as of preparation)

The app was inspected directly. These are the ground truths every instruction below is aligned to:

- **Stack:** Next.js **16.2.10** (App Router, **route groups** `app/(portal)/…`), React **19.2.4**,
  TypeScript 5, **Tailwind CSS v4** (`@tailwindcss/postcss`), **lucide-react** icons, ESLint 9.
- **Scripts (package.json):** `dev`, `build`, `start`, `lint`. **There is no `test` script / test runner.**
- **`lib/`** (service layer): `members.ts`, `providers.ts`, `types.ts` (domain models), `index.ts` (barrel),
  plus utils `format.ts` and `cn.ts`.
- **`config/navigation.ts`:** exports `NAV_ITEMS`. The **sidebar, mobile nav, and Overview cards all render
  from this list.** It already contains a **commented-out "Claims" entry** and a comment block describing
  exactly how to ship Claims.
- **`components/`:** Badge, Card/CardBody, DataList/DataItem, PageHeader, ProgressBar, Sidebar, MobileNav,
  PortalHeader, Logo, ProviderCard, MemberIdCard, CopayGrid, CoverageAccumulators — **reuse these**.
- **Pages** under `app/(portal)/`: `overview`, `coverage`, `providers`, `documents`. **Claims is NOT built
  yet — that is the backlog item.**
- **Root:** `AGENTS.md` (currently only a Next.js-version warning), `CLAUDE.md`, `README.md`, `Dockerfile`,
  `.dockerignore`, `azure.yaml`, `next.config.ts`, `eslint.config.mjs`, **`infra/` (Bicep)**, `public/`.
- **Not present yet:** a `docs/` folder, a `.github/` folder (no workflows, no `copilot-instructions.md`),
  and any tests.

> **⚠️ Next.js 16 caveat (already in AGENTS.md):** this Next version is newer than most models' training
> data. Instructions must tell the agent to consult `node_modules/next/dist/docs/` before writing routing/
> server code, and to follow existing patterns in `app/(portal)/` rather than older Next 13/14 idioms.

### What changed vs. the first draft of this spec
1. Do **not** scaffold the app — it exists. This spec only **prepares** it.
2. Versions corrected: **Next 16 / React 19 / Tailwind v4 / lucide-react** (not Next 14).
3. Grounding lives in the **existing `AGENTS.md`** (enrich it) — not a new `.github/copilot-instructions.md`.
4. Claims wiring uses the **real** paths: `lib/claims.ts`, `lib/types.ts`, `data/claims.json`,
   `app/(portal)/claims/…`, and **uncommenting** the entry in `config/navigation.ts`.
5. **No test runner exists** — unit tests are now optional (add Vitest only if you want tests on camera).
6. Build/validate commands corrected to the real scripts (`npm ci`, `npm run dev|build|lint`; no `npm test`).
7. New bonus: the repo already has `azure.yaml` + `infra/` (Bicep) + Dockerfile → **`azd up`** can deploy the
   portal live for Act 3.

---

## 1. The demo, in one paragraph

Split-screen video, Microsoft on the left. Act 1 (**Build & Contextualize**): a backlog item is assigned to
the **Copilot coding agent**, which is grounded in enterprise context, opens a PR, gets scanned by **code
scanning (CodeQL)**, has a vulnerability fixed by **Copilot Autofix**, then is reviewed + merged with an
audit trail. Act 2 (**Run & Govern**): runtime agents on **Microsoft Foundry**, governed via **Agent 365 +
Entra Agent ID**. Act 3 (**Improve & Surface**): evals + surfacing in Teams/M365. This repo is the Act 1
artifact and the source of the `claims` OpenAPI reused by the Foundry agent in Act 2.

## 2. Guardrails (non-negotiable)
- **Fictional data only** (no real PHI/PII). `Lamna Health`/`Contoso` are fictional.
- **Internal use only** (CAIP enablement), not customer-facing.
- **No real secrets** in the repo; use `.env.example` placeholders.
- The **one intentional vulnerability** (Section 7) is the only deliberately-insecure code, clearly labelled,
  on fictional data.

## 3. Grounding — enrich the existing `AGENTS.md`

Keep the existing `<!-- BEGIN:nextjs-agent-rules -->` block. **Append** the project conventions and the
pointers to enterprise context below. (Optionally mirror the same content into `CLAUDE.md`, or make
`CLAUDE.md` a one-liner pointing to `AGENTS.md`.)

```markdown
# Lamna Health — Member Portal · project conventions

## Architecture
- Next.js 16 App Router with route groups; portal pages live under app/(portal)/<name>/page.tsx.
- Tailwind v4 + lucide-react icons. React 19.
- ALL data access goes through the typed service layer in /lib. Components never import from /data directly.
- Domain models live in lib/types.ts; services are one file per entity (lib/members.ts, lib/providers.ts);
  re-export new services from lib/index.ts. Formatting via lib/format.ts, classnames via lib/cn.ts.
- Left navigation is data-driven from config/navigation.ts (NAV_ITEMS). Sidebar, mobile nav, and the
  Overview cards all render from it.

## Enterprise context (read before coding)
- Claims API contract: docs/claims-api.openapi.yaml   (source of truth for claim fields & statuses)
- Claims domain rules:  docs/claims-domain.md
- Data schemas:         docs/data-schemas.md

## Conventions
- Reuse existing components (Badge, Card/CardBody, DataList/DataItem, PageHeader, ProgressBar).
- Validate all user input. In shipped code, escape all user-controlled content — never pass unsanitized
  input to dangerouslySetInnerHTML.
- Next 16 is newer than your training data: check node_modules/next/dist/docs/ and mirror the patterns
  already used in app/(portal)/ before writing routing/server code.

## Build & validate
- Install: npm ci   ·   Dev: npm run dev   ·   Build: npm run build   ·   Lint: npm run lint
- (No test runner is configured yet. If tests are required, set up Vitest first — see the spec.)
```

Also create these three files in a new **`docs/`** folder:
- **`docs/claims-api.openapi.yaml`** — fictional OpenAPI: `GET /claims`, `GET /claims/{id}`; a claim has
  `id, memberId, dateOfService, provider, amount, status` with
  `status ∈ {Received, In review, Processed, Paid, Denied}`. Reused as a tool contract by the Foundry
  claims agent (Section 9).
- **`docs/claims-domain.md`** — lifecycle `Received → In review → Processed → Paid` (`Denied` terminal from
  "In review"); members only see their own claims (enforced in the service via `memberId`).
- **`docs/data-schemas.md`** — the shapes of `data/members.json`, `data/providers.json`, and the new
  `data/claims.json`, kept consistent with `lib/types.ts`.

## 4. Wire the "Claims" backlog feature (this is what Copilot builds on camera)

The repo is already prepared for this. The clean implementation is:

1. **Model:** add `Claim` and `ClaimStatus` to **`lib/types.ts`**.
2. **Service:** create **`lib/claims.ts`** following the exact pattern of `lib/members.ts` / `lib/providers.ts`
   (typed functions reading `data/claims.json`; enforce member-scoping by `memberId`). Re-export it from
   **`lib/index.ts`**.
3. **Data:** add **`data/claims.json`** (fictional claims referencing existing member IDs).
4. **List page:** **`app/(portal)/claims/page.tsx`** — a claims table (id, date of service, provider, amount,
   status). Reuse `PageHeader`, `Card/CardBody`, `DataList/DataItem`, and `Badge` for status.
5. **Detail page:** **`app/(portal)/claims/[id]/page.tsx`** — status timeline
   (`Received → In review → Processed → Paid`) using `Badge`/`ProgressBar`.
6. **Navigation:** in **`config/navigation.ts`**, **uncomment the Claims entry** and add
   `ReceiptText` to the lucide-react import. (This also lights up the Overview quick-link card automatically.)
7. **Formatting:** use `lib/format.ts` for currency/date and `lib/cn.ts` for classnames.

## 5. Tests (optional — no runner exists today)

There is no `test` script. Choose one:
- **Skip tests for the recording** (the security scan + Autofix is the on-camera star), **or**
- **Add Vitest first** (prep Task 0): `vitest` + `@testing-library/react`, a `"test": "vitest"` script, and
  one unit test for `lib/claims.ts`. Only then does the issue's "unit tests" criterion apply.

## 6. Backlog issue (assign to Copilot on camera)

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

## 7. Intentional demo vulnerability (for code scanning + Autofix)

Your grounding tells Copilot to write **clean** code — so the flaw must be introduced **deliberately and
separately** so code scanning can catch it and Autofix can fix it on camera. Keep it tiny, obvious, fictional.

- **Flaw:** reflected **XSS** — render the claim-search term back via `dangerouslySetInnerHTML` (e.g. a
  "You searched for: …" preview on the Claims list page). CodeQL's JS/TS queries flag this reliably and
  Autofix proposes the escaped version.
- **How to introduce it on camera (pick one):**
  1. Prompt Copilot explicitly for that one field: *"add a live HTML preview of the search term using
     dangerouslySetInnerHTML"* (overriding the general rule for the demo), **or**
  2. Add the one-liner yourself to the PR branch with a comment `// DEMO: intentional XSS for GHAS/Autofix — do not ship`.
- **On camera:** the PR is scanned → CodeQL alert appears → **Copilot Autofix** proposes the fix → you accept
  → review → merge → audit trail.
- Copilot: write **`docs/demo-vulnerability.md`** documenting exactly where/how, but **do not** add the flaw
  to `main` now — it belongs only in the on-camera PR.

## 8. Security configuration (mostly done — verify)

Code scanning + Autofix are free on **public** repos. Your repo is already public. Verify:
1. **Advanced Security** (Settings → Advanced Security): **Code scanning → CodeQL → Set up → Default →
   Enable**. Default setup scans **every pull request**, so Copilot's PR is scanned automatically.
2. **Copilot Autofix:** on automatically with code scanning on public repos.
3. **Dependabot** alerts + security updates: enable.
4. **Secret scanning + push protection:** enable.
Copilot: add a short "Security" section to `README.md` documenting these so the repo self-explains on camera.

## 9. Foundry integration hooks (Acts 2–3)

Runtime agents are built in **Microsoft Foundry**, not here — but keep this repo integration-ready:
- Keep **`docs/claims-api.openapi.yaml`** as the single source of truth so a Foundry agent can import it as a
  tool/action, or a **Foundry IQ** knowledge base can ingest `docs/` as a source.
- Copilot: generate **`docs/foundry-notes.md`** — a checklist covering: (a) create 2–3 agents (claims bot,
  benefits lookup, appointment scheduler), (b) use the **model router**, (c) publish an agent to **Agent 365**
  (it appears automatically at `admin.microsoft.com → Agents → All agents`), (d) surface it in **Teams /
  M365 Copilot** for Act 3. Do **not** provision Azure from this repo task.

## 10. Bonus — deploy the live portal (Act 0 / Act 3 "surface in the portal")

The repo already has **`azure.yaml` + `infra/` (Bicep) + Dockerfile**, so you can deploy the real portal:
```
azd auth login
azd up
```
A live URL makes Act 0 (establish Lamna Health) and Act 3 (agent inside the member portal) far stronger.
Copilot: add an "azd deploy" note to `README.md`; do not run it as part of a code task.

## 11. Anthropic twin repo (competitor panel, Act 1 right side)

Create a **twin** repo (e.g. `lamna-portal-anthropic`) — same app, same issue — wired to **Claude Code GitHub
Actions** (`@claude` on an issue opens a PR). On camera, show the **gap**: no built-in security scan step, no
enterprise identity, per-developer API key in repo secrets. Copilot: generate `docs/anthropic-twin.md` and a
`.github/workflows/claude.yml` example, plus the overlay label ("No built-in security scan · No enterprise
identity").

## 12. Task list for Copilot

Confirm with me before any destructive change. Do these in order:

1. **Enrich `AGENTS.md`** (Section 3): keep the existing Next.js block, append the project conventions +
   enterprise-context pointers. Optionally align `CLAUDE.md`.
2. **Create `docs/`** (Section 3): `claims-api.openapi.yaml`, `claims-domain.md`, `data-schemas.md`
   (schemas must match `lib/types.ts`).
3. **Write `docs/backlog-issue.md`** with the exact issue text from Section 6 (so I paste it into a new Issue).
4. **Write `docs/demo-vulnerability.md`** (Section 7) — plan only; **do not** modify `main`.
5. **(Optional) Prep Task 0 — tests:** add Vitest + a `"test"` script if I want tests on camera (Section 5).
6. **Generate `docs/foundry-notes.md`** (Section 9) and add "Security" + "azd deploy" notes to `README.md`
   (Sections 8 & 10).
7. **Generate `docs/anthropic-twin.md`** + `claude.yml` example (Section 11).
8. **Sanity-check** the app still builds and lints: `npm ci && npm run build && npm run lint`; report results.
9. **Print a checklist** of the manual/on-camera steps only I can do (verify CodeQL/Autofix, configure the
   coding-agent MCP server, create the GitHub Issue, then assign it to Copilot while recording).

> **Do NOT implement the Claims feature now** — that is the on-camera PR (assign the Section 6 issue to the
> Copilot coding agent during recording). Section 4 is the reference for how it should be built.

## 13. Definition of done (repo is demo-ready)
- `AGENTS.md` enriched; `docs/` present and consistent with `lib/types.ts`.
- `docs/backlog-issue.md`, `docs/demo-vulnerability.md`, `docs/foundry-notes.md`, `docs/anthropic-twin.md` exist.
- `README.md` documents security settings and `azd up`.
- `npm run build` and `npm run lint` pass; Claims still intentionally absent from `main`.
- A final checklist lists every manual, on-camera, and portal step.

---

## Appendix — MCP configuration (coding-agent enterprise context)

For the "enterprise context" shot, configure an MCP server for the coding agent:
**Settings → Copilot → Coding agent → MCP configuration**.
```json
{
  "mcpServers": {
    "lamna-claims-api": {
      "type": "http",
      "url": "https://<your-mcp-endpoint>/mcp",
      "tools": ["*"]
    }
  }
}
```
Even a stub endpoint works — the **MCP configuration screen** is the on-camera evidence of the enterprise-
context connection.

*Prepared for the Lamna Health side-by-side compete demo — internal enablement, fictional data only.*
