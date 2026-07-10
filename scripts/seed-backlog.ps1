#Requires -Version 5.1
<#
.SYNOPSIS
    Seeds a fictional-but-realistic engineering backlog (labels + sprint
    milestones + issues) into the Lamna Health portal repo for the compete demo
    (Act 0: "engineering backlog view — multiple issues, sprints, deadlines").

.DESCRIPTION
    Uses the GitHub CLI (`gh`). Idempotent-ish: labels are upserted with --force,
    milestones are skipped if a milestone of the same title already exists, and
    issues are skipped if an open issue with the same title already exists.

    The flagship "Add claims status lookup to the member portal" item is
    intentionally NOT created here — that is the on-camera Act 1 issue you assign
    to the Copilot coding agent live (see docs/backlog-issue.md).

    All data is fictional. Internal enablement only — no real PHI/PII.

.PARAMETER Repo
    owner/name of the target repository. Defaults to davrous/lamna-health-portal.

.PARAMETER Apply
    Actually create the labels/milestones/issues. Without it, the script does a
    dry run and only prints what it would do.

.EXAMPLE
    ./scripts/seed-backlog.ps1
    # dry run — prints the plan, changes nothing

.EXAMPLE
    ./scripts/seed-backlog.ps1 -Apply
    # creates labels, 2 sprint milestones, and 10 issues on GitHub
#>
[CmdletBinding()]
param(
    [string]$Repo = "davrous/lamna-health-portal",
    [switch]$Apply
)

$ErrorActionPreference = "Stop"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Plan($msg) { Write-Host "    [dry-run] $msg" -ForegroundColor DarkGray }

# --- preflight ---------------------------------------------------------------
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw "GitHub CLI (gh) not found. Install it from https://cli.github.com/ and run 'gh auth login'."
}
try { gh auth status 1>$null 2>$null } catch { throw "Not logged in. Run 'gh auth login' first." }

if (-not $Apply) {
    Write-Host "DRY RUN — no changes will be made. Re-run with -Apply to create everything.`n" -ForegroundColor Yellow
}
Write-Step "Target repo: $Repo"

# --- 1. labels ---------------------------------------------------------------
$labels = @(
    @{ name = "type: feature";        color = "1D76DB"; desc = "New member-facing capability" }
    @{ name = "type: bug";            color = "D73A4A"; desc = "Something is broken" }
    @{ name = "type: tech-debt";      color = "C5DEF5"; desc = "Refactor / cleanup / maintainability" }
    @{ name = "type: security";       color = "B60205"; desc = "Security or HIPAA-related work" }
    @{ name = "type: accessibility";  color = "5319E7"; desc = "WCAG / a11y compliance" }
    @{ name = "type: performance";    color = "FBCA04"; desc = "Latency / rendering / load" }
    @{ name = "type: chore";          color = "BFDADC"; desc = "Tooling, CI, housekeeping" }
    @{ name = "priority: P0";         color = "B60205"; desc = "Blocker — must fix now" }
    @{ name = "priority: P1";         color = "D93F0B"; desc = "High priority" }
    @{ name = "priority: P2";         color = "FBCA04"; desc = "Normal priority" }
    @{ name = "area: coverage";       color = "0E8A16"; desc = "Coverage page / plan details" }
    @{ name = "area: providers";      color = "0E8A16"; desc = "Provider directory" }
    @{ name = "area: documents";      color = "0E8A16"; desc = "Documents page" }
    @{ name = "area: overview";       color = "0E8A16"; desc = "Overview / dashboard" }
    @{ name = "area: platform";       color = "0E8A16"; desc = "Shell, nav, build, cross-cutting" }
    @{ name = "open-enrollment";      color = "0052CC"; desc = "Open Enrollment 2027 release" }
    @{ name = "HIPAA";                color = "5319E7"; desc = "Requires HIPAA review / audit trail" }
    @{ name = "points: 2";            color = "EDEDED"; desc = "Estimate: 2 story points" }
    @{ name = "points: 3";            color = "EDEDED"; desc = "Estimate: 3 story points" }
    @{ name = "points: 5";            color = "EDEDED"; desc = "Estimate: 5 story points" }
    @{ name = "points: 8";            color = "EDEDED"; desc = "Estimate: 8 story points" }
)

Write-Step "Labels ($($labels.Count))"
foreach ($l in $labels) {
    if ($Apply) {
        gh label create $l.name --repo $Repo --color $l.color --description $l.desc --force | Out-Null
        Write-Host "    upserted: $($l.name)"
    } else {
        Write-Plan "label: $($l.name) (#$($l.color))"
    }
}

# --- 2. milestones (sprints) -------------------------------------------------
$milestones = @(
    @{ title = "Sprint 24 · Open Enrollment Hardening"; due = "2026-07-24T23:59:59Z"; desc = "Two-week sprint. Harden the portal ahead of the Open Enrollment 2027 code freeze (2026-10-26)." }
    @{ title = "Sprint 25 · Member Experience";         due = "2026-08-07T23:59:59Z"; desc = "Two-week sprint. Member-experience improvements for Open Enrollment 2027." }
)

Write-Step "Milestones ($($milestones.Count))"
$existingMs = @()
if ($Apply) {
    $existingMs = gh api "repos/$Repo/milestones?state=all&per_page=100" --jq '.[].title' 2>$null
}
foreach ($m in $milestones) {
    if ($Apply) {
        if ($existingMs -contains $m.title) {
            Write-Host "    exists, skipping: $($m.title)"
        } else {
            gh api "repos/$Repo/milestones" -f title="$($m.title)" -f state="open" -f description="$($m.desc)" -f due_on="$($m.due)" | Out-Null
            Write-Host "    created: $($m.title) (due $($m.due.Substring(0,10)))"
        }
    } else {
        Write-Plan "milestone: $($m.title) (due $($m.due.Substring(0,10)))"
    }
}

# --- 3. issues ---------------------------------------------------------------
$sprint24 = "Sprint 24 · Open Enrollment Hardening"
$sprint25 = "Sprint 25 · Member Experience"

$issues = @(
    @{
        title = "Rotate expiring TLS certificate & enable HSTS on the portal domain"
        milestone = $sprint24
        labels = @("type: security", "priority: P0", "area: platform", "open-enrollment", "HIPAA", "points: 2")
        body = @'
The TLS certificate for the member portal domain expires **2026-08-15** — before
the Open Enrollment 2027 freeze. Rotate it and harden transport security so the
release passes the HIPAA transport-security review.

### Acceptance criteria
- [ ] Reissue and install the TLS certificate; verify chain and OCSP stapling.
- [ ] Add a `Strict-Transport-Security` header (`max-age=63072000; includeSubDomains; preload`) via `next.config.ts` headers().
- [ ] Redirect all HTTP → HTTPS at the Container App ingress.
- [ ] SSL Labs grade A or better; capture the report for the audit trail.

### Notes
Blocker for the release — nothing ships until transport security passes review.
HIPAA sign-off required.
'@
    }
    @{
        title = "Plan comparison view for Open Enrollment"
        milestone = $sprint24
        labels = @("type: feature", "priority: P1", "area: coverage", "open-enrollment", "points: 8")
        body = @'
Members renewing during Open Enrollment need to compare their current plan against
available options side by side before they pick one.

### Acceptance criteria
- [ ] New "Compare plans" view reachable from the Coverage page.
- [ ] Compare premium, deductible, out-of-pocket max, coinsurance, and the copay grid across up to 3 plans.
- [ ] Read plan data through the typed service layer in `/lib` (no direct `/data` imports).
- [ ] Reuse `Card`/`CardBody`, `DataList`/`DataItem`, `Badge`, and `CopayGrid`.
- [ ] Responsive: stacks to a single column on mobile.

### Notes
Follow `AGENTS.md` conventions. Mirror the existing `app/(portal)/coverage/` patterns.
Highest-value Open Enrollment feature — flag for design review.
'@
    }
    @{
        title = "Deductible accumulator shows the family total on individual-only plans"
        milestone = $sprint24
        labels = @("type: bug", "priority: P1", "area: coverage", "points: 3")
        body = @'
On the Coverage page, members with **individual-only** plans (no dependents) see
the *family* deductible progress instead of their individual progress. Reported by
support; several open-enrollment renewals affected.

### Steps to reproduce
1. Sign in as a member with an empty `dependents` array (e.g. `LH-2023-01192`).
2. Open **Coverage**.
3. The deductible bar reflects `metFamily` / `family` rather than `metIndividual` / `individual`.

### Expected
Individual-only plans show the **individual** accumulator; family plans show family.

### Acceptance criteria
- [ ] `CoverageAccumulators` picks the correct accumulator based on whether the member has dependents.
- [ ] Verified against both fixtures in `data/members.json`.
- [ ] No change to `lib/types.ts` accumulator shape.
'@
    }
    @{
        title = "Sidebar navigation fails WCAG 2.1 AA keyboard focus order"
        milestone = $sprint24
        labels = @("type: accessibility", "priority: P2", "area: platform", "points: 5")
        body = @'
An a11y audit flagged the left navigation: focus order skips the active item,
focus outlines are suppressed, and the mobile nav toggle is not announced to
screen readers. Blocks our WCAG 2.1 AA attestation.

### Acceptance criteria
- [ ] Logical, visible focus order through `Sidebar` and `MobileNav`.
- [ ] Visible focus ring on all interactive elements (do not remove default outlines without a replacement).
- [ ] `aria-current="page"` on the active `NAV_ITEMS` entry.
- [ ] Mobile nav toggle has an accessible name and `aria-expanded`.
- [ ] Re-run axe; zero serious/critical violations on the shell.
'@
    }
    @{
        title = "Move provider search onto the typed service layer"
        milestone = $sprint24
        labels = @("type: tech-debt", "priority: P2", "area: providers", "points: 5")
        body = @'
The provider directory still filters `data/providers.json` inline in the page
component, bypassing `lib/providers.ts`. This violates our "all data access goes
through `/lib`" rule and blocks reuse by the upcoming Foundry provider agent.

### Acceptance criteria
- [ ] Add typed `searchProviders(...)` to `lib/providers.ts`; export from `lib/index.ts`.
- [ ] `app/(portal)/providers/page.tsx` calls the service; no direct `/data` import remains.
- [ ] Behavior unchanged (specialty + in-network filtering).
- [ ] `npm run build` and `npm run lint` pass.
'@
    }
    @{
        title = '"In-network" badge is wrong for out-of-state clinics'
        milestone = $sprint25
        labels = @("type: bug", "priority: P1", "area: providers", "points: 3")
        body = @'
`ProviderCard` shows an **in-network** badge for some out-of-state clinics that are
actually out-of-network, which could mislead members about their cost share.

### Acceptance criteria
- [ ] Badge reflects the provider's real network status, including out-of-state cases.
- [ ] Add a fixture covering an out-of-state, out-of-network provider.
- [ ] `Badge` variant/colour matches status (in-network vs out-of-network).
'@
    }
    @{
        title = "Download plan documents as a single combined PDF"
        milestone = $sprint25
        labels = @("type: feature", "priority: P2", "area: documents", "points: 5")
        body = @'
On the Documents page, members want to download all of their plan documents
(summary, ID card, forms) as one combined PDF instead of one file at a time.

### Acceptance criteria
- [ ] "Download all (PDF)" action on `app/(portal)/documents/page.tsx`.
- [ ] Merges the selected documents in listed order into a single PDF.
- [ ] Filename includes the member id and plan year.
- [ ] Reuse existing `Card`/`Button` styling; no new design system.

### Notes
Server-side generation preferred so member documents are never assembled in the browser.
'@
    }
    @{
        title = "Overview page LCP > 4s on slow 3G"
        milestone = $sprint25
        labels = @("type: performance", "priority: P2", "area: overview", "points: 3")
        body = @'
Lab testing shows the Overview page Largest Contentful Paint exceeds 4s on
throttled 3G, mostly from eagerly rendering the member ID card and quick-link cards.

### Acceptance criteria
- [ ] Lazy-load `MemberIdCard`; render the quick-link cards from `NAV_ITEMS` above the fold first.
- [ ] LCP under 2.5s on the simulated 3G profile.
- [ ] No layout shift regression (CLS < 0.1).
- [ ] Capture before/after Lighthouse numbers in the PR.
'@
    }
    @{
        title = "Spanish (es-US) localization for the portal shell"
        milestone = $sprint25
        labels = @("type: feature", "priority: P2", "area: platform", "open-enrollment", "points: 8")
        body = @'
A large share of members prefer Spanish during Open Enrollment. Localize the portal
shell (navigation, headers, common labels) as the first step toward full i18n.

### Acceptance criteria
- [ ] Introduce an i18n approach consistent with Next 16 App Router (check `node_modules/next/dist/docs/`).
- [ ] Extract shell strings (`NAV_ITEMS` labels/descriptions, `PageHeader`, common UI) into message catalogs.
- [ ] Provide `en-US` and `es-US` catalogs; language switcher in `PortalHeader`.
- [ ] No hard-coded user-facing strings left in the shell components.

### Notes
Scope is the shell only; page-body copy is a follow-up. Coordinate with content review.
'@
    }
    @{
        title = "Add Vitest + CI test workflow for lib/ services"
        milestone = $sprint25
        labels = @("type: chore", "priority: P2", "area: platform", "points: 3")
        body = @'
There is no test runner today, so service-layer changes ship unverified. Add Vitest
and a CI workflow so `/lib` services are covered before the release.

### Acceptance criteria
- [ ] Add `vitest` + `@testing-library/react`; add a `"test": "vitest"` script.
- [ ] Unit tests for `lib/members.ts` and `lib/providers.ts` (member-scoping, filtering).
- [ ] `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm run build`, `npm test` on PRs.
- [ ] Green on `main`.

### Notes
Unblocks the "add unit tests" criterion on future feature issues.
'@
    }
)

Write-Step "Issues ($($issues.Count))"
$existingIssues = @()
if ($Apply) {
    $existingIssues = gh issue list --repo $Repo --state all --limit 200 --json title --jq '.[].title' 2>$null
}
$created = 0
foreach ($i in $issues) {
    if ($Apply -and ($existingIssues -contains $i.title)) {
        Write-Host "    exists, skipping: $($i.title)"
        continue
    }

    if ($Apply) {
        $tmp = New-TemporaryFile
        Set-Content -Path $tmp -Value $i.body -Encoding utf8
        $labelArgs = @()
        foreach ($lbl in $i.labels) { $labelArgs += @("--label", $lbl) }
        $url = gh issue create --repo $Repo --title $i.title --body-file $tmp --milestone $i.milestone @labelArgs
        Remove-Item $tmp -Force
        Write-Host "    created: $url"
        $created++
    } else {
        Write-Plan "issue: [$($i.milestone.Split('·')[0].Trim())] $($i.title)  {$($i.labels -join ', ')}"
    }
}

Write-Host ""
if ($Apply) {
    Write-Host "Done. Created $created issue(s), plus labels and milestones." -ForegroundColor Green
    Write-Host "Backlog: https://github.com/$Repo/issues   ·   Milestones: https://github.com/$Repo/milestones"
} else {
    Write-Host "Dry run complete. Re-run with -Apply to create everything on GitHub." -ForegroundColor Yellow
}
