/**
 * Formats a date using `Intl.DateTimeFormat`. Kept dependency-free on purpose:
 * add `date-fns` only if you need heavier date arithmetic.
 *
 * Date-only strings (`YYYY-MM-DD`) are read as a calendar day so the formatted
 * day does not shift with the server timezone.
 */
function toDate(value: Date | string): Date {
  if (value instanceof Date) {
    return value;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const year = Number(match?.[1]);
  const month = Number(match?.[2]);
  const day = Number(match?.[3]);

  if (!year || !month || !day) {
    return new Date(value);
  }

  return new Date(year, month - 1, day);
}

export function formatDate(date: Date | string, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(toDate(date));
}

/**
 * Formats a date as month and year only (e.g. `Ekim 2026`, `October 2026`).
 */
export function formatMonthYear(date: Date | string, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(toDate(date));
}
