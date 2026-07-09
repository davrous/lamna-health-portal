import providersData from "@/data/providers.json";
import type { Provider } from "./types";

/**
 * Provider service
 * -----------------------------------------------------------------------------
 * Reads provider data from the mock JSON store. Mirrors the shape of
 * members.ts so the whole service layer stays predictable and easy to extend.
 */

const providers = providersData as Provider[];

/** All providers, in or out of network. */
export async function getProviders(): Promise<Provider[]> {
  return providers;
}

/** A single provider by id, or null if not found. */
export async function getProviderById(id: string): Promise<Provider | null> {
  return providers.find((provider) => provider.id === id) ?? null;
}

/** Only providers that participate in a Lamna network. */
export async function getInNetworkProviders(): Promise<Provider[]> {
  return providers.filter((provider) => provider.inNetwork);
}
