export function decodeLocation(str?: string | null) {
  if (!str) return '_'
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}