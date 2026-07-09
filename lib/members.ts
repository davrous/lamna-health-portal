import membersData from "@/data/members.json";
import type { Member } from "./types";

/**
 * Member service
 * -----------------------------------------------------------------------------
 * Reads member data from the mock JSON store. Every function is `async` on
 * purpose: today it resolves from a local file, but the signatures already
 * match a real API/DB, so swapping the source later is a drop-in change with
 * no edits at the call sites.
 *
 * This is the pattern to copy for new domains (e.g. a future `claims.ts`).
 */

// The `as Member[]` cast is safe because the JSON is validated against the
// Member type by TypeScript at build time (resolveJsonModule is enabled).
const members = membersData as Member[];

/**
 * The member currently "signed in" for this demo. In a real app this id would
 * come from the auth session/context instead of a hard-coded constant.
 */
const CURRENT_MEMBER_ID = "LH-2024-04815";

/** All members in the system. */
export async function getMembers(): Promise<Member[]> {
  return members;
}

/** A single member by id, or null if not found. */
export async function getMemberById(id: string): Promise<Member | null> {
  return members.find((member) => member.id === id) ?? null;
}

/**
 * The signed-in member for the current session.
 * Throws if the configured demo member is missing so problems surface early.
 */
export async function getCurrentMember(): Promise<Member> {
  const member = await getMemberById(CURRENT_MEMBER_ID);
  if (!member) {
    throw new Error(
      `getCurrentMember: no member found for id "${CURRENT_MEMBER_ID}". Check data/members.json.`,
    );
  }
  return member;
}
