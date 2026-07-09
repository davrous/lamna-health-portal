import { cn } from "@/lib/cn";
import { formatCurrency, toPercentOfLimit } from "@/lib/format";

interface ProgressBarProps {
  /** Amount applied so far. */
  value: number;
  /** The maximum/limit. */
  max: number;
  /** Accessible label describing what the bar represents. */
  label: string;
  className?: string;
}

/**
 * Horizontal progress bar showing "$X of $Y" — used for the deductible and
 * out-of-pocket accumulators on the Coverage page.
 */
export function ProgressBar({ value, max, label, className }: ProgressBarProps) {
  const percent = toPercentOfLimit(value, max);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          <span className="font-semibold text-slate-900">
            {formatCurrency(value)}
          </span>{" "}
          of {formatCurrency(max)}
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
