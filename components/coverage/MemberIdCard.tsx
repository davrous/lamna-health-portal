import type { Member } from "@/lib/types";
import { HeartPulse } from "lucide-react";
import { formatDate } from "@/lib/format";

interface MemberIdCardProps {
  member: Member;
}

/**
 * A digital insurance ID card. Deliberately styled to feel like the physical
 * card members carry, using the brand gradient.
 */
export function MemberIdCard({ member }: MemberIdCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 p-6 text-white shadow-md">
      {/* Decorative watermark */}
      <HeartPulse
        className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 text-white/10"
        aria-hidden
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
            <HeartPulse className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-sm font-semibold tracking-tight">
            Lamna Health
          </span>
        </div>
        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">
          {member.plan.type}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
        <Field label="Member">
          {member.firstName} {member.lastName}
        </Field>
        <Field label="Member ID">
          <span className="font-mono">{member.id}</span>
        </Field>
        <Field label="Plan">{member.plan.name}</Field>
        <Field label="Network">{member.plan.network}</Field>
        <Field label="Effective">{formatDate(member.plan.effectiveDate)}</Field>
        <Field label="Renews">{formatDate(member.plan.renewalDate)}</Field>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/60">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold">{children}</p>
    </div>
  );
}
