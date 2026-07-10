# Anthropic twin repo (competitor panel — Act 1, right side)

> For the split-screen, create a **twin** repo (e.g. `lamna-portal-anthropic`):
> the *same* app and the *same* backlog issue, but wired to **Claude Code GitHub
> Actions** instead of the GitHub Copilot coding agent. On camera, the twin shows
> the **gap** vs. the Microsoft side.
>
> This is a **plan** for a separate repo. Nothing here wires Claude into this
> repo — the example workflow lives under `docs/anthropic-twin/claude.yml` and is
> meant to be copied into the twin repo's `.github/workflows/claude.yml`.

## Setup for the twin repo

1. Duplicate this portal into a new repo `lamna-portal-anthropic` (same app,
   same `docs/`, same backlog issue from `docs/backlog-issue.md`).
2. Install the **Claude GitHub App** on the twin repo.
3. Add the workflow at `.github/workflows/claude.yml` (copy from
   `docs/anthropic-twin/claude.yml` in this repo).
4. Add repo secret **`ANTHROPIC_API_KEY`** (a *per-developer* API key stored in
   repo secrets — call this out on camera).
5. On an issue or PR comment, type `@claude` to trigger a PR.

## The gap to show on camera (overlay label)

> **No built-in security scan · No enterprise identity**

- **No built-in security scan step** — there is no equivalent of default CodeQL
  scanning + Copilot Autofix in the loop; the XSS bug would ship unflagged unless
  a scanner is added manually.
- **No enterprise identity** — actions run under a per-developer Anthropic API
  key kept in repo secrets, not a governed enterprise identity (contrast with
  Entra Agent ID / Agent 365 on the Microsoft side).
- **Per-developer key in repo secrets** — key sprawl and weaker auditability.

## Contrast (for narration)

| Capability                     | Microsoft (Copilot coding agent) | Anthropic twin (Claude Code Action) |
| ------------------------------ | -------------------------------- | ----------------------------------- |
| Security scan on every PR      | Default CodeQL + Copilot Autofix | Not built in                        |
| Identity / governance          | Entra Agent ID + Agent 365       | Per-developer API key in secrets    |
| Audit trail                    | PR review + audit log            | Limited                             |
| Enterprise grounding (MCP)     | Coding-agent MCP configuration   | Manual                              |
