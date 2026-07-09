import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { PortalHeader } from "@/components/layout/PortalHeader";
import { getCurrentMember } from "@/lib/members";

/**
 * Shared shell for every authenticated portal page (Overview, Coverage,
 * Providers, Documents). Fetches the signed-in member once and renders the
 * persistent chrome: sidebar (desktop), mobile nav, and the top header.
 */
export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  const member = await getCurrentMember();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      {/* Content column is offset by the fixed sidebar width on desktop. */}
      <div className="flex min-h-screen flex-col md:pl-64">
        <PortalHeader member={member} />
        <MobileNav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
