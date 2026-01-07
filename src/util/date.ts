export function getYearFromDate(date: string) {
  if (!date) return;

  return date.split('-')[0];
}