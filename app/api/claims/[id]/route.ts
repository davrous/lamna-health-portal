import { NextResponse, type NextRequest } from "next/server";
import claimsData from "@/data/claims.json";
import { getCurrentMember } from "@/lib/members";
import type { Claim } from "@/lib/types";

/**
 * Mock Claims API — GET /api/claims/{id}
 * -----------------------------------------------------------------------------
 * Returns a single claim by id, but only if it belongs to the signed-in member.
 * When it doesn't (or doesn't exist) we return 404 rather than 403 so claim
 * existence is never disclosed (see docs/claims-domain.md).
 */

export const dynamic = "force-dynamic";

const claims = claimsData as Claim[];

// Claim id format from docs/claims-api.openapi.yaml: CLM-YYYY-NNNN
const CLAIM_ID_PATTERN = /^CLM-\d{4}-\d{4}$/;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Validate the id shape before touching any data.
  if (!CLAIM_ID_PATTERN.test(id)) {
    return NextResponse.json(
      { error: "Invalid claim id. Expected format CLM-YYYY-NNNN." },
      { status: 400 },
    );
  }

  const member = await getCurrentMember();
  const claim = claims.find(
    (candidate) => candidate.id === id && candidate.memberId === member.id,
  );

  if (!claim) {
    return NextResponse.json({ error: "Claim not found." }, { status: 404 });
  }

  return NextResponse.json(claim);
}
