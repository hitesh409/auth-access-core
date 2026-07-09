/** Format an ISO-like datetime string (e.g. "2026-06-13T09:14:00") for display. */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const day = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${day}, ${time}`;
}

/** Date-only form (e.g. "13 Jun 2026") for at-a-glance chips. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Human-readable span between two ISO datetimes (e.g. "5 months", "12 days").
 * Computed from the record's own timestamps so it stays stable regardless of
 * the current date — unlike a relative-to-now value against historical demo data.
 */
export function durationBetween(startIso: string, endIso: string): string {
  const ms = new Date(endIso).getTime() - new Date(startIso).getTime();
  if (!Number.isFinite(ms) || ms <= 0) return '—';

  const days = Math.floor(ms / 86400000);
  if (days >= 30) {
    const months = Math.round(days / 30);
    return `${months} month${months === 1 ? '' : 's'}`;
  }
  if (days >= 1) return `${days} day${days === 1 ? '' : 's'}`;

  const hours = Math.max(1, Math.round(ms / 3600000));
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}
