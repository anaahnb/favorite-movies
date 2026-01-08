export function getYearFromDate(date: string) {
  if (!date) return;

  return date.split('-')[0];
}

export function formatLastUpdate(date?: string) {
  if (!date) return ''

  const updated = new Date(date);
  const now = new Date();

  const diffMs = now.getTime() - updated.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';

  return updated.toLocaleDateString('pt-BR');
}
