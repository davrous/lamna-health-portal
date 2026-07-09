/** Tiny class-name joiner: drops falsy values and joins the rest with spaces. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
