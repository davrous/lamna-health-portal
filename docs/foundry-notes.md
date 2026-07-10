# Microsoft Foundry integration notes (Acts 2–3)

> Runtime agents are built in **Microsoft Foundry**, not in this repo. This repo
> stays *integration-ready* so a Foundry agent can consume its artifacts. This is
> a **checklist** — do **not** provision Azure from a repo code task.

## What this repo provides to Foundry

- **`docs/claims-api.openapi.yaml`** — the single source of truth for claim
  fields and statuses. A Foundry agent imports it as a **tool/action**, or a
  **Foundry IQ** knowledge base ingests all of `docs/` as a grounding source.
- **`docs/claims-domain.md`** — lifecycle + access rules the claims agent should
  respect (members only see their own claims).
- **`docs/data-schemas.md`** — data shapes for consistent tool responses.

## Checklist

1. **Create 2–3 agents** in Foundry:
   - **Claims bot** — imports `docs/claims-api.openapi.yaml` as a tool; answers
     "what's the status of claim CLM-…?".
   - **Benefits lookup** — grounded on coverage/plan data (deductibles, copays).
   - **Appointment scheduler** — books/queries provider appointments.
2. **Use the model router** so each request is routed to an appropriate model
   (cost/latency/quality trade-off) instead of a single hard-coded model.
3. **Publish an agent to Agent 365** — once published it appears automatically at
   `admin.microsoft.com → Agents → All agents` (governed via Entra Agent ID).
4. **Surface it in Teams / M365 Copilot** for Act 3 (agent answering claim-status
   questions where members already work).

## Governance (Act 2)

- Agents run on **Microsoft Foundry**, governed via **Agent 365 + Entra Agent ID**
  (each agent gets an enterprise identity; access is auditable).

## Not in scope for repo tasks

- Do **not** run `az` / provisioning here. The only deploy this repo performs is
  the portal itself via `azd up` (see `README.md` → *Deploy to Azure*).
