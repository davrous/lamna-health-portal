import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardBody } from "@/components/ui/Card";
import { NAV_ITEMS } from "@/config/navigation";
import { getCurrentMember } from "@/lib/members";
import { getProviderById } from "@/lib/providers";
import { formatCurrency, formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Overview" };

export default async function OverviewPage() {
  const member = await getCurrentMember();
  const pcp = member.primaryCareProviderId
    ? await getProviderById(member.primaryCareProviderId)
    : null;

  // Small headline stats for the top of the dashboard.
  const stats = [
    { label: "Plan", value: member.plan.name },
    { label: "Member ID", value: member.id },
    { label: "Primary care", value: pcp?.name ?? "Not selected" },
    { label: "Monthly premium", value: formatCurrency(member.plan.monthlyPremium) },
  ];

  // Quick links = every nav item except Overview itself.
  const quickLinks = NAV_ITEMS.filter((item) => item.href !== "/overview");

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${member.firstName}`}
        description={`Your ${member.plan.name} plan renews on ${formatDate(
          member.plan.renewalDate,
        )}.`}
      />

      {/* Headline stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {stat.value}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Quick links to the rest of the portal */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Jump to
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-brand-600" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
