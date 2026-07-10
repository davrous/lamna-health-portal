# Engineering backlog — Lamna Health Member Portal

> **Purpose:** fictional but realistic backlog for the side-by-side compete demo
> (**Act 0 — Opening**: "Engineering backlog view: multiple issues, sprints,
> deadlines visible"). Everything here is invented for internal enablement — no
> real PHI/PII. Run [`scripts/seed-backlog.ps1`](../scripts/seed-backlog.ps1)
> to create these as real GitHub Issues + Milestones + Labels so they render on
> the repo's **Issues** tab and a **Project** board on camera.

## Context

The platform team is racing to land a member-experience release **before Open
Enrollment 2027 opens on 2026-11-01** (code freeze **2026-10-26**). Every change
ships under HIPAA — security-scanned, reviewed, audit-trailed. Two sprints are
in flight.

> **Note:** the flagship *"Add claims status lookup to the member portal"* item
> is intentionally **kept out of this seed** — it's the on-camera backlog item
> assigned to the Copilot coding agent in Act 1 (see
> [`docs/backlog-issue.md`](./backlog-issue.md)). Create it live during the
> recording so it drops into the top of the board.

## Sprints (Milestones)

| Sprint | Milestone | Due | Committed points |
| ------ | --------- | --- | ---------------- |
| 24 | Open Enrollment Hardening | **2026-07-24** | 23 |
| 25 | Member Experience | **2026-08-07** | 22 |

## Sprint 24 · Open Enrollment Hardening — due 2026-07-24

| # | Title | Type | Priority | Points | Area |
| - | ----- | ---- | -------- | ------ | ---- |
| 1 | Rotate expiring TLS cert & enable HSTS on the portal domain | security | **P0** | 2 | platform |
| 2 | Plan comparison view for Open Enrollment | feature | P1 | 8 | coverage |
| 3 | Deductible accumulator shows *family* total on individual plans | bug | P1 | 3 | coverage |
| 4 | Sidebar navigation fails WCAG 2.1 AA keyboard focus order | accessibility | P2 | 5 | platform |
| 5 | Move provider search onto the typed service layer | tech-debt | P2 | 5 | providers |

## Sprint 25 · Member Experience — due 2026-08-07

| # | Title | Type | Priority | Points | Area |
| - | ----- | ---- | -------- | ------ | ---- |
| 6 | "In-network" badge wrong for out-of-state clinics | bug | P1 | 3 | providers |
| 7 | Download plan documents as a combined PDF | feature | P2 | 5 | documents |
| 8 | Overview page LCP > 4s on slow 3G | performance | P2 | 3 | overview |
| 9 | Spanish (es-US) localization for the portal shell | feature | P2 | 8 | platform |
| 10 | Add Vitest + CI test workflow for `lib/` services | chore | P2 | 3 | platform |

## Labels used

- **type:** `feature` · `bug` · `tech-debt` · `security` · `accessibility` · `performance` · `chore`
- **priority:** `P0` (blocker) · `P1` (high) · `P2` (normal)
- **area:** `coverage` · `providers` · `documents` · `overview` · `platform`
- **theme:** `open-enrollment` · `HIPAA`
- **points:** `2` · `3` · `5` · `8`

## How to seed it on GitHub

```powershell
# from the repo root, with the GitHub CLI installed and authenticated:
gh auth status
./scripts/seed-backlog.ps1                    # dry run: prints what it will do
./scripts/seed-backlog.ps1 -Apply             # actually creates labels/milestones/issues
```

Optional, to get the **board** view for Act 0:

```powershell
# create a Project and add every open issue to it (needs the `project` scope):
gh auth refresh -s project
gh project create --owner davrous --title "Member Portal — Open Enrollment"
# then: gh project item-add <number> --owner davrous --url <issue-url>
```
