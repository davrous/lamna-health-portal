import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { DataItem, DataList } from "@/components/ui/DataList";
import { getClaimById, CLAIM_TIMELINE } from "@/lib/claims";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { ClaimStatus } from "@/lib/types";

// Claim id format: CLM-YYYY-NNNN
const CLAIM_ID_PATTERN = /^CLM-\d{4}-\d{4}$/;

const statusTone: Record<ClaimStatus, "success" | "warning" | "accent" | "brand" | "neutral"> = {
  Paid: "success",
  Processed: "brand",
  "In review": "accent",
  Received: "neutral",
  Denied: "warning",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Claim ${id}` };
}

export default async function ClaimDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Validate the id shape before touching data.
  if (!CLAIM_ID_PATTERN.test(id)) {
    notFound();
  }

  const claim = await getClaimById(id);
  if (!claim) {
    notFound();
  }

  const isDenied = claim.status === "Denied";

  // Determine which timeline steps are complete / active / pending.
  // When a claim is Denied the timeline stops at "In review" and shows Denied.
  const activeIndex = isDenied
    ? CLAIM_TIMELINE.indexOf("In review")
    : CLAIM_TIMELINE.indexOf(claim.status);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <Link
          href="/claims"
          className="mt-1 flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Claims
        </Link>
      </div>

      <PageHeader
        title={claim.id}
        description={`Service date: ${formatDate(claim.dateOfService)}`}
        action={<Badge tone={statusTone[claim.status]}>{claim.status}</Badge>}
      />

      {/* Claim details */}
      <Card>
        <CardHeader title="Claim details" />
        <CardBody>
          <DataList>
            <DataItem label="Claim ID">
              <span className="font-mono">{claim.id}</span>
            </DataItem>
            <DataItem label="Provider">{claim.provider}</DataItem>
            <DataItem label="Date of service">
              {formatDate(claim.dateOfService)}
            </DataItem>
            <DataItem label="Billed amount">
              {formatCurrency(claim.amount)}
            </DataItem>
            <DataItem label="Status">
              <Badge tone={statusTone[claim.status]}>{claim.status}</Badge>
            </DataItem>
          </DataList>
        </CardBody>
      </Card>

      {/* Status timeline */}
      <Card>
        <CardHeader
          title="Claim timeline"
          description="The progress of your claim through our review process."
        />
        <CardBody>
          <ol className="relative space-y-0">
            {CLAIM_TIMELINE.map((step, index) => {
              // For denied claims, all steps up to and including "In review"
              // are complete; the rest are pending (never reached).
              const isComplete = isDenied
                ? index <= activeIndex
                : index < activeIndex;
              const isActive = !isDenied && index === activeIndex;
              const isDone = isComplete || isActive;
              const isPending = index > activeIndex;

              return (
                <li
                  key={step}
                  className={cn(
                    "relative flex gap-4 pb-8 last:pb-0",
                    "before:absolute before:left-[11px] before:top-6 before:h-full before:w-0.5 before:last:hidden",
                    isDone ? "before:bg-brand-200" : "before:bg-slate-100",
                  )}
                >
                  <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center">
                    {isDone ? (
                      <CheckCircle2
                        className="h-6 w-6 text-brand-600"
                        aria-hidden
                      />
                    ) : (
                      <Circle
                        className={cn(
                          "h-6 w-6",
                          isPending ? "text-slate-200" : "text-slate-300",
                        )}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="pt-0.5">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isDone ? "text-slate-900" : "text-slate-400",
                      )}
                    >
                      {step}
                    </p>
                    {isActive && (
                      <p className="mt-0.5 text-xs text-brand-600">
                        Current status
                      </p>
                    )}
                  </div>
                </li>
              );
            })}

            {/* Denied state — shown as a terminal branch after "In review" */}
            {isDenied && (
              <li className="relative flex gap-4">
                <div className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center">
                  <XCircle
                    className="h-6 w-6 text-amber-500"
                    aria-hidden
                  />
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-slate-900">Denied</p>
                  <p className="mt-0.5 text-xs text-amber-600">
                    This claim has been denied.
                  </p>
                </div>
              </li>
            )}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
