import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DataItem, DataList } from "@/components/ui/DataList";
import { MemberIdCard } from "@/components/coverage/MemberIdCard";
import { CoverageAccumulators } from "@/components/coverage/CoverageAccumulators";
import { CopayGrid } from "@/components/coverage/CopayGrid";
import { getCurrentMember } from "@/lib/members";
import { getProviderById } from "@/lib/providers";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";

export const metadata: Metadata = { title: "My Coverage" };

export default async function CoveragePage() {
  const member = await getCurrentMember();
  const pcp = member.primaryCareProviderId
    ? await getProviderById(member.primaryCareProviderId)
    : null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Coverage"
        description="Your plan details, spending, and what you pay for care."
      />

      {/* Top row: digital ID card + core member/plan facts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MemberIdCard member={member} />

        <Card>
          <CardHeader
            title="Plan details"
            action={<Badge tone="brand">{member.plan.type}</Badge>}
          />
          <CardBody>
            <DataList>
              <DataItem label="Member">
                {member.firstName} {member.lastName}
              </DataItem>
              <DataItem label="Member ID">
                <span className="font-mono">{member.id}</span>
              </DataItem>
              <DataItem label="Plan">{member.plan.name}</DataItem>
              <DataItem label="Network">{member.plan.network}</DataItem>
              <DataItem label="Effective date">
                {formatDate(member.plan.effectiveDate)}
              </DataItem>
              <DataItem label="Renewal date">
                {formatDate(member.plan.renewalDate)}
              </DataItem>
              <DataItem label="Monthly premium">
                {formatCurrency(member.plan.monthlyPremium)}
              </DataItem>
              <DataItem label="Coinsurance">
                {formatPercent(member.coverage.coinsuranceRate)} after deductible
              </DataItem>
            </DataList>
          </CardBody>
        </Card>
      </div>

      {/* Spending + copays */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CoverageAccumulators coverage={member.coverage} />
        <CopayGrid copays={member.coverage.copays} />
      </div>

      {/* Primary care + dependents */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Primary care provider" />
          <CardBody>
            {pcp ? (
              <div>
                <p className="font-semibold text-slate-900">{pcp.name}</p>
                <p className="text-sm text-brand-700">{pcp.specialty}</p>
                <p className="text-sm text-slate-500">{pcp.organization}</p>
                <p className="mt-2 text-sm text-slate-600">{pcp.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No primary care provider selected yet.
              </p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Covered dependents"
            description={`${member.dependents.length} covered under this plan`}
          />
          <CardBody>
            {member.dependents.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {member.dependents.map((dependent) => (
                  <li
                    key={`${dependent.firstName}-${dependent.dateOfBirth}`}
                    className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {dependent.firstName} {dependent.lastName}
                    </span>
                    <Badge tone="neutral">
                      {dependent.relationship.replace("-", " ")}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">No dependents on file.</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
