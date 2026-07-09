import type { Provider } from "@/lib/types";
import { MapPin, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProviderCardProps {
  provider: Provider;
  /** Highlights this provider as the member's primary care provider. */
  isPrimary?: boolean;
}

/** A single provider result: name, specialty, contact info, and status badges. */
export function ProviderCard({ provider, isPrimary = false }: ProviderCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-900">{provider.name}</h3>
          <p className="text-sm text-brand-700">{provider.specialty}</p>
          <p className="text-sm text-slate-500">{provider.organization}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
          {provider.rating.toFixed(1)}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <span>
            {provider.address.street}
            <br />
            {provider.address.city}, {provider.address.state}{" "}
            {provider.address.zip}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          {provider.phone}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {isPrimary && <Badge tone="brand">Your PCP</Badge>}
        <Badge tone={provider.inNetwork ? "success" : "warning"}>
          {provider.inNetwork ? "In network" : "Out of network"}
        </Badge>
        <Badge tone={provider.acceptingNewPatients ? "accent" : "neutral"}>
          {provider.acceptingNewPatients
            ? "Accepting patients"
            : "Not accepting patients"}
        </Badge>
      </div>
    </article>
  );
}
