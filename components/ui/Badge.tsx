import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "brand" | "accent" | "neutral" | "success" | "warning";

const toneStyles: Record<BadgeTone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-600/20",
  accent: "bg-accent-50 text-accent-700 ring-accent-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

/** Small pill label used for statuses like plan type or network participation. */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
