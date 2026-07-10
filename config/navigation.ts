import type { LucideIcon } from "lucide-react";
import { FileText, LayoutDashboard, ReceiptText, ShieldCheck, Stethoscope } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short helper text shown on the Overview page cards. */
  description: string;
}

/**
 * Single source of truth for the portal's left navigation.
 * -----------------------------------------------------------------------------
 * The sidebar and mobile nav both render themselves from this list, and the
 * Overview page uses it to build its "quick links" cards.
 *
 * TO SHIP THE UPCOMING "CLAIMS" FEATURE (currently a backlog item):
 *   1. add the model to lib/types.ts and a lib/claims.ts service,
 *   2. create app/(portal)/claims/page.tsx,
 *   3. uncomment the entry below.
 * No other navigation code needs to change.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: "/overview",
    icon: LayoutDashboard,
    description: "A snapshot of your plan and quick links.",
  },
  {
    label: "Coverage",
    href: "/coverage",
    icon: ShieldCheck,
    description: "Plan details, deductibles, and copays.",
  },
  {
    label: "Providers",
    href: "/providers",
    icon: Stethoscope,
    description: "Find in-network doctors and clinics.",
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
    description: "Plan summaries, ID cards, and forms.",
  },
  // Backlog — Claims (not built yet):
  { label: "Claims", href: "/claims", icon: ReceiptText, description: "Track claim status and history." },
];
