export function parseDaysParam(url: URL, defaultDays = 30, maxDays = 365): number {
  const rawDays = url.searchParams.get('days')
  const parsed = rawDays ? Number(rawDays) : NaN

  if (!Number.isFinite(parsed)) return defaultDays
  if (parsed < 1) return defaultDays
  if (parsed > maxDays) return maxDays

  return parsed
}
