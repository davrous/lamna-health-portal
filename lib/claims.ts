import claimsData from "@/data/claims.json";
import { getCurrentMember } from "./members";
import type { Claim, ClaimStatus } from "./types";

/**
 * Claims service
 * -----------------------------------------------------------------------------
 * Reads claim data from the mock JSON store and scopes every result to the
 * signed-in member. Mirrors the pattern in lib/members.ts and lib/providers.ts.
 */

const claims = claimsData as Claim[];

/** All claims belonging to the currently signed-in member. */
export async function getClaimsForCurrentMember(): Promise<Claim[]> {
  const member = await getCurrentMember();
  return claims.filter((claim) => claim.memberId === member.id);
}

/**
 * A single claim by id, scoped to the current member.
 * Returns null when not found or when the claim belongs to a different member
 * (existence is never disclosed — see docs/claims-domain.md).
 */
export async function getClaimById(id: string): Promise<Claim | null> {
  const member = await getCurrentMember();
  return (
    claims.find(
      (claim) => claim.id === id && claim.memberId === member.id,
    ) ?? null
  );
}

/** The ordered lifecycle stages used for the status timeline. */
export const CLAIM_TIMELINE: ClaimStatus[] = [
  "Received",
  "In review",
  "Processed",
  "Paid",
];
