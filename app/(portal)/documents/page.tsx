import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Documents" };

// Placeholder document list for the demo. These are sample entries only — no
// real files are attached. When wiring real documents, promote this to a typed
// service in /lib (e.g. lib/documents.ts) following the members/providers pattern.
const DOCUMENTS = [
  {
    id: "DOC-SBC",
    title: "Summary of Benefits & Coverage",
    type: "PDF",
    updated: "2026-01-01",
    description: "A plain-language overview of what your plan covers.",
  },
  {
    id: "DOC-IDCARD",
    title: "Digital ID Card",
    type: "PDF",
    updated: "2026-01-01",
    description: "A printable copy of your member ID card.",
  },
  {
    id: "DOC-BENEFITS",
    title: "2026 Benefits Guide",
    type: "PDF",
    updated: "2025-11-15",
    description: "Detailed benefits, exclusions, and how to use your plan.",
  },
  {
    id: "DOC-FORMULARY",
    title: "Prescription Drug Formulary",
    type: "PDF",
    updated: "2026-02-01",
    description: "The list of covered medications and their tiers.",
  },
] as const;

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Documents"
        description="Plan summaries, forms, and other important paperwork."
      />

      <Card>
        <ul className="divide-y divide-slate-100">
          {DOCUMENTS.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center gap-4 px-5 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-slate-900">
                    {doc.title}
                  </p>
                  <Badge tone="neutral">{doc.type}</Badge>
                </div>
                <p className="truncate text-sm text-slate-500">
                  {doc.description}
                </p>
              </div>
              <div className="hidden text-right text-xs text-slate-400 sm:block">
                Updated
                <br />
                {formatDate(doc.updated)}
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Download className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Download</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <p className="text-xs text-slate-400">
        Sample documents shown for demonstration. No files are attached in this
        prototype.
      </p>
    </div>
  );
}
