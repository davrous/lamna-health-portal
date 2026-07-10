# Data schemas

> The mock JSON stores in `/data` are the demo's database. TypeScript validates
> them against `lib/types.ts` at build time (`resolveJsonModule` is enabled), so
> these schemas and the types are always kept in sync. Fictional data only.

## `data/members.json` → `Member[]`

Array of members. Shape (see `lib/types.ts` for the authoritative types):

```jsonc
{
  "id": "LH-2024-04815",            // human-readable member id
  "firstName": "Dana",
  "lastName": "Okoro",
  "dateOfBirth": "1987-03-12",      // ISO yyyy-mm-dd
  "email": "dana.okoro@example.com",
  "phone": "(555) 0142-8890",
  "address": {                       // Address
    "street": "418 Cedar Hollow Ave",
    "city": "Rivertown",
    "state": "OR",
    "zip": "97005"
  },
  "memberSince": "2021-01-01",       // ISO date first enrolled
  "plan": {                          // Plan
    "name": "Lamna Complete Care",
    "type": "PPO",                  // PlanType: "PPO" | "HMO" | "EPO" | "HDHP"
    "network": "Lamna Preferred Network",
    "effectiveDate": "2026-01-01",   // ISO date
    "renewalDate": "2027-01-01",     // ISO date
    "monthlyPremium": 284            // USD
  },
  "coverage": {                      // Coverage
    "deductible": {                  // Accumulator
      "individual": 1500,
      "family": 3000,
      "metIndividual": 620,
      "metFamily": 940
    },
    "outOfPocketMax": {              // Accumulator
      "individual": 6000,
      "family": 12000,
      "metIndividual": 1180,
      "metFamily": 1750
    },
    "coinsuranceRate": 0.2,          // 0–1, member share after deductible
    "copays": {                      // Copays (USD)
      "primaryCare": 25,
      "specialist": 45,
      "urgentCare": 60,
      "emergencyRoom": 250
    }
  },
  "primaryCareProviderId": "PRV-1001", // references Provider.id, or null
  "dependents": [                     // Dependent[]
    {
      "firstName": "Miles",
      "lastName": "Okoro",
      "relationship": "spouse",       // "spouse" | "child" | "domestic-partner"
      "dateOfBirth": "1985-09-30"
    }
  ]
}
```

Existing member ids (for referencing from other data): `LH-2024-04815`,
`LH-2023-01192`.

## `data/providers.json` → `Provider[]`

```jsonc
{
  "id": "PRV-1001",                  // provider id
  "name": "Dr. Priya Raman",
  "specialty": "Primary Care / Family Medicine",
  "organization": "Rivertown Family Health",
  "address": { "street": "...", "city": "...", "state": "OR", "zip": "97005" },
  "phone": "(555) 0134-2201",
  "acceptingNewPatients": true,
  "inNetwork": true,
  "rating": 4.8                      // 0–5
}
```

Existing provider ids: `PRV-1001` … `PRV-1006`.

## `data/claims.json` → `Claim[]`

The fictional claim store, served over HTTP by the mock API route handlers
(`app/api/claims/`). References existing member ids and is consistent with
`docs/claims-api.openapi.yaml` and the `Claim` model in `lib/types.ts`:

```jsonc
{
  "id": "CLM-2026-0001",             // pattern: CLM-YYYY-NNNN
  "memberId": "LH-2024-04815",       // references Member.id
  "dateOfService": "2026-05-14",     // ISO yyyy-mm-dd
  "provider": "Rivertown Family Health",
  "amount": 420,                     // USD
  "status": "Paid"                   // ClaimStatus: Received | In review |
                                     //   Processed | Paid | Denied
}
```

### Claim models in `lib/types.ts`

```ts
export type ClaimStatus =
  | "Received"
  | "In review"
  | "Processed"
  | "Paid"
  | "Denied";

export interface Claim {
  /** Human-readable claim id, e.g. "CLM-2026-0001". */
  id: string;
  /** References Member.id. */
  memberId: string;
  /** ISO date (yyyy-mm-dd) the service was rendered. */
  dateOfService: string;
  /** Display name of the servicing provider. */
  provider: string;
  /** Billed amount in USD. */
  amount: number;
  status: ClaimStatus;
}
```
