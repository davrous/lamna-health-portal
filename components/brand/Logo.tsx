import Link from "next/link";
import { HeartPulse } from "lucide-react";

interface LogoProps {
  /** Where the logo links to. Defaults to the marketing landing page. */
  href?: string;
  /** Hide the wordmark and show only the mark (used in tight spaces). */
  compact?: boolean;
}

/**
 * The Lamna Health wordmark: a rounded gradient "heart pulse" mark next to the
 * brand name. Reused in the landing header and the portal sidebar.
 */
export function Logo({ href = "/", compact = false }: LogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-600 text-white shadow-sm">
        <HeartPulse className="h-5 w-5" aria-hidden />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Lamna <span className="text-brand-600">Health</span>
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Member Portal
          </span>
        </span>
      )}
    </Link>
  );
}
