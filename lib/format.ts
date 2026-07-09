/**
 * Display formatting helpers.
 * Keep all user-facing number/date formatting here so currency, dates, and
 * percentages look consistent across every page.
 */

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 0,
});

/** e.g. 1500 -> "$1,500" */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** e.g. "2025-01-01" -> "January 1, 2025" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/** e.g. 0.2 -> "20%" */
export function formatPercent(rate: number): string {
  return percentFormatter.format(rate);
}

/** Clamp a value to the 0–100 range (handy for progress bars). */
export function toPercentOfLimit(applied: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(100, Math.max(0, (applied / limit) * 100));
}
