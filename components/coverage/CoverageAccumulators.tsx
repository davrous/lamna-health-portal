import type { Coverage } from "@/lib/types";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface CoverageAccumulatorsProps {
  coverage: Coverage;
}

/**
 * Shows how much of the deductible and out-of-pocket maximum has been used,
 * for both the individual and the whole family.
 */
export function CoverageAccumulators({ coverage }: CoverageAccumulatorsProps) {
  const { deductible, outOfPocketMax } = coverage;

  return (
    <Card>
      <CardHeader
        title="Spending this year"
        description="How much of your annual limits you've used so far."
      />
      <CardBody className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Deductible
          </h3>
          <ProgressBar
            label="Individual"
            value={deductible.metIndividual}
            max={deductible.individual}
          />
          <ProgressBar
            label="Family"
            value={deductible.metFamily}
            max={deductible.family}
          />
        </div>

        <div className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Out-of-pocket maximum
          </h3>
          <ProgressBar
            label="Individual"
            value={outOfPocketMax.metIndividual}
            max={outOfPocketMax.individual}
          />
          <ProgressBar
            label="Family"
            value={outOfPocketMax.metFamily}
            max={outOfPocketMax.family}
          />
        </div>
      </CardBody>
    </Card>
  );
}
