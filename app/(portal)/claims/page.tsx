import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ClaimsList } from "@/components/claims/ClaimsList";
import { getClaimsForCurrentMember } from "@/lib/claims";

export const metadata: Metadata = { title: "Claims" };

export default async function ClaimsPage() {
  const claims = await getClaimsForCurrentMember();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Claims"
        description="Track the status and history of your submitted claims."
        action={<Badge tone="brand">{claims.length} claims</Badge>}
      />

      <ClaimsList claims={claims} />
    </div>
  );
}
