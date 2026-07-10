/**
 * Domain models for the Lamna Health member portal.
 * -----------------------------------------------------------------------------
 * These types are the single contract shared by three layers:
 *   1. the mock JSON in /data (validated against them at build time),
 *   2. the typed service layer in /lib,
 *   3. the React components that render them.
 *
 * WHEN ADDING A NEW FEATURE (e.g. Claims): add its model to this file first,
 * then create a matching service in /lib (see members.ts / providers.ts for the
 * pattern). Nothing else in the app needs to know where the data comes from.
 */

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export type PlanType = "PPO" | "HMO" | "EPO" | "HDHP";

export interface Plan {
  /** Marketing name of the plan, e.g. "Lamna Complete Care". */
  name: string;
  type: PlanType;
  /** In-network name shown to members. */
  network: string;
  /** ISO date (yyyy-mm-dd) the coverage became active. */
  effectiveDate: string;
  /** ISO date (yyyy-mm-dd) the plan renews. */
  renewalDate: string;
  /** Member's share of the monthly premium, in USD. */
  monthlyPremium: number;
}

/**
 * A running total with an annual limit — used for both the deductible and the
 * out-of-pocket maximum. `met*` fields are how much has been applied so far.
 */
export interface Accumulator {
  individual: number;
  family: number;
  metIndividual: number;
  metFamily: number;
}

export interface Copays {
  primaryCare: number;
  specialist: number;
  urgentCare: number;
  emergencyRoom: number;
}

export interface Coverage {
  deductible: Accumulator;
  outOfPocketMax: Accumulator;
  /** Member's coinsurance share after the deductible is met (0–1). */
  coinsuranceRate: number;
  copays: Copays;
}

export type DependentRelationship = "spouse" | "child" | "domestic-partner";

export interface Dependent {
  firstName: string;
  lastName: string;
  relationship: DependentRelationship;
  dateOfBirth: string;
}

export interface Member {
  /** Human-readable member ID, e.g. "LH-2024-04815". */
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: Address;
  /** ISO date the member first enrolled with Lamna Health. */
  memberSince: string;
  plan: Plan;
  coverage: Coverage;
  /** References Provider.id, or null if no PCP has been selected. */
  primaryCareProviderId: string | null;
  dependents: Dependent[];
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  organization: string;
  address: Address;
  phone: string;
  acceptingNewPatients: boolean;
  inNetwork: boolean;
  /** Average member rating, 0–5. */
  rating: number;
}

/**
 * Lifecycle status of a claim. See docs/claims-domain.md for the rules:
 *   Received → In review → Processed → Paid   (Denied is terminal from In review)
 */
export type ClaimStatus =
  | "Received"
  | "In review"
  | "Processed"
  | "Paid"
  | "Denied";

/**
 * A single medical claim. Matches docs/claims-api.openapi.yaml and the mock
 * store in data/claims.json (served by the /api/claims route handlers).
 */
export interface Claim {
  /** Human-readable claim id, e.g. "CLM-2026-0001". */
  id: string;
  /** References Member.id — claims are always scoped to their owner. */
  memberId: string;
  /** ISO date (yyyy-mm-dd) the service was rendered. */
  dateOfService: string;
  /** Display name of the servicing provider. */
  provider: string;
  /** Billed amount in USD. */
  amount: number;
  status: ClaimStatus;
}
