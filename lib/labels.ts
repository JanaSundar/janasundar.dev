/** Removes repeats regardless of case ("ts", "TS"), keeping the first spelling of each. */
export function uniqueLabels(labels: string[]) {
  const seen = new Set<string>();

  return labels.filter((label) => {
    const key = label.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Whether two labels are the same label, ignoring case. */
export const sameLabel = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
