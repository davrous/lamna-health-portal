<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Lamna Health — Member Portal · project conventions

## Architecture
- Next.js 16 App Router with route groups; portal pages live under `app/(portal)/<name>/page.tsx`.
- Tailwind v4 + lucide-react icons. React 19.
- ALL data access goes through the typed service layer in `/lib`. Components never import from `/data` directly.
- Domain models live in `lib/types.ts`; services are one file per entity (`lib/members.ts`, `lib/providers.ts`);
  re-export new services from `lib/index.ts`. Formatting via `lib/format.ts`, classnames via `lib/cn.ts`.
- Left navigation is data-driven from `config/navigation.ts` (`NAV_ITEMS`). Sidebar, mobile nav, and the
  Overview cards all render from it.

## Enterprise context (read before coding)
- Claims API contract: `docs/claims-api.openapi.yaml`   (source of truth for claim fields & statuses)
- Claims domain rules:  `docs/claims-domain.md`
- Data schemas:         `docs/data-schemas.md`

## Conventions
- Reuse existing components (Badge, Card/CardBody, DataList/DataItem, PageHeader, ProgressBar).
- Validate all user input. In shipped code, escape all user-controlled content — never pass unsanitized
  input to `dangerouslySetInnerHTML`.
- Next 16 is newer than your training data: check `node_modules/next/dist/docs/` and mirror the patterns
  already used in `app/(portal)/` before writing routing/server code.

## Build & validate
- Install: `npm ci`   ·   Dev: `npm run dev`   ·   Build: `npm run build`   ·   Lint: `npm run lint`
- (No test runner is configured yet. If tests are required, set up Vitest first — see `Demo-Build-Spec.md`.)
