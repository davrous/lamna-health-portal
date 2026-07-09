import type { Copays } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/format";

interface CopayGridProps {
  copays: Copays;
}

// Maps the Copays model to display rows. Add a row here if a new copay type is
// introduced in lib/types.ts.
const COPAY_ROWS: Array<{ key: keyof Copays; label: string }> = [
  { key: "primaryCare", label: "Primary care visit" },
  { key: "specialist", label: "Specialist visit" },
  { key: "urgentCare", label: "Urgent care" },
  { key: "emergencyRoom", label: "Emergency room" },
];

/** A tidy grid of the member's copay amounts by visit type. */
export function CopayGrid({ copays }: CopayGridProps) {
  return (
    <Card>
      <CardHeader
        title="Your copays"
        description="What you pay at the time of each visit."
      />
      <CardBody>
        <div className="grid grid-cols-2 gap-3">
          {COPAY_ROWS.map((row) => (
            <div
              key={row.key}
              className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <p className="text-2xl font-semibold text-slate-900">
                {formatCurrency(copays[row.key])}
              </p>
              <p className="mt-0.5 text-sm text-slate-500">{row.label}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
