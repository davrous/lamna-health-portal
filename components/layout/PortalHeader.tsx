import type { Member } from "@/lib/types";
import { Logo } from "@/components/brand/Logo";

interface PortalHeaderProps {
  member: Member;
}

/** Two-letter initials for the avatar, e.g. "Dana Okoro" -> "DO". */
function initials(member: Member): string {
  return `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`.toUpperCase();
}

/**
 * Sticky top bar for the portal. Shows the compact logo on mobile and the
 * signed-in member (avatar, name, member ID) on the right at all sizes.
 */
export function PortalHeader({ member }: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6">
      {/* Compact logo stands in for the sidebar on small screens. */}
      <div className="md:hidden">
        <Logo compact />
      </div>
      <div className="hidden md:block" />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium leading-tight text-slate-900">
            {member.firstName} {member.lastName}
          </p>
          <p className="text-xs leading-tight text-slate-500">
            ID {member.id}
          </p>
        </div>
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
          aria-hidden
        >
          {initials(member)}
        </span>
      </div>
    </header>
  );
}
