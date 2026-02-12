export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)

  if (!response.ok) {
    let errorMessage = `Error ${response.status}`
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (parseError) {
      console.warn('Could not parse error response', parseError)
    }
    throw new Error(errorMessage)
  }
  if (response.status === 204) return {} as T

  return response.json()
}