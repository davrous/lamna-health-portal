import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { getInNetworkProviders } from "@/lib/providers";
import { getCurrentMember } from "@/lib/members";

export const metadata: Metadata = { title: "Providers" };

export default async function ProvidersPage() {
  const [providers, member] = await Promise.all([
    getInNetworkProviders(),
    getCurrentMember(),
  ]);

  // Show the member's primary care provider first, then the rest.
  const sorted = [...providers].sort((a, b) => {
    if (a.id === member.primaryCareProviderId) return -1;
    if (b.id === member.primaryCareProviderId) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Providers"
        description="In-network doctors and clinics available under your plan."
        action={<Badge tone="brand">{sorted.length} in network</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            isPrimary={provider.id === member.primaryCareProviderId}
          />
        ))}
      </div>
    </div>
  );
}
