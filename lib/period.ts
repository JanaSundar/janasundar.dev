/** "2021-05" as "05/21". */
function formatMonth(value: string) {
  const [year, month] = value.split('-');
  return `${month}/${year.slice(2)}`;
}

/** A job's dates as "05/21 — Now", or "07/19 — 04/21" once it has ended. */
export function formatPeriod(start: string, end?: string) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Now'}`;
}
