"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Claim, ClaimStatus } from "@/lib/types";

const statusTone: Record<ClaimStatus, "success" | "warning" | "accent" | "brand" | "neutral"> = {
  Paid: "success",
  Processed: "brand",
  "In review": "accent",
  Received: "neutral",
  Denied: "warning",
};

interface ClaimsListProps {
  claims: Claim[];
}

/**
 * Client component — handles the live search input and filters the list
 * without a round-trip to the server.
 */
export function ClaimsList({ claims }: ClaimsListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = searchTerm.trim()
    ? claims.filter(
        (claim) =>
          claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
          claim.status.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : claims;

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="space-y-1.5">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID, provider, or status…"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        {searchTerm && (
          <p className="text-sm text-slate-500">
            You searched for: {searchTerm}
          </p>
        )}
      </div>

      {/* Claims list */}
      {filtered.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-sm text-slate-500">No claims found.</p>
          </CardBody>
        </Card>
      ) : (
        <ul className="space-y-3">
          {filtered.map((claim) => (
            <li key={claim.id}>
              <Link
                href={`/claims/${claim.id}`}
                className="group block rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-mono text-sm font-semibold text-slate-900">
                      {claim.id}
                    </p>
                    <p className="text-sm text-slate-600">{claim.provider}</p>
                    <p className="text-xs text-slate-400">
                      {formatDate(claim.dateOfService)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-base font-semibold text-slate-900">
                      {formatCurrency(claim.amount)}
                    </span>
                    <Badge tone={statusTone[claim.status]}>{claim.status}</Badge>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
