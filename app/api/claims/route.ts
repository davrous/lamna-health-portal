import { NextResponse, type NextRequest } from "next/server";
import claimsData from "@/data/claims.json";
import { getCurrentMember } from "@/lib/members";
import type { Claim, ClaimStatus } from "@/lib/types";

/**
 * Mock Claims API — GET /api/claims
 * -----------------------------------------------------------------------------
 * Serves the fictional claim store in data/claims.json over HTTP, matching the
 * contract in docs/claims-api.openapi.yaml. This is the backend the future
 * Claims portal feature (and the Foundry claims agent) query against.
 *
 * Member scoping: results are always limited to the signed-in member — a member
 * can never see another member's claims (see docs/claims-domain.md).
 */

// Always run at request time; never prerender/cache this mock endpoint.
export const dynamic = "force-dynamic";

// The `as Claim[]` cast is validated against the Claim type at build time
// (resolveJsonModule is enabled).
const claims = claimsData as Claim[];

const CLAIM_STATUSES: ClaimStatus[] = [
  "Received",
  "In review",
  "Processed",
  "Paid",
  "Denied",
];

export async function GET(request: NextRequest) {
  const statusParam = request.nextUrl.searchParams.get("status");

  // Validate the optional status filter against the known enum.
  if (
    statusParam !== null &&
    !CLAIM_STATUSES.includes(statusParam as ClaimStatus)
  ) {
    return NextResponse.json(
      {
        error: `Invalid status filter. Expected one of: ${CLAIM_STATUSES.join(
          ", ",
        )}.`,
      },
      { status: 400 },
    );
  }

  // Scope to the signed-in member — members only ever see their own claims.
  const member = await getCurrentMember();
  let result = claims.filter((claim) => claim.memberId === member.id);

  if (statusParam) {
    result = result.filter((claim) => claim.status === statusParam);
  }

  return NextResponse.json(result);
}
