import type { ReactNode } from "react";

interface DataListProps {
  children: ReactNode;
}

/** A responsive label/value grid for displaying record details. */
export function DataList({ children }: DataListProps) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
      {children}
    </dl>
  );
}

interface DataItemProps {
  label: string;
  children: ReactNode;
}

/** A single label/value pair inside a <DataList>. */
export function DataItem({ label, children }: DataItemProps) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">{children}</dd>
    </div>
  );
}
