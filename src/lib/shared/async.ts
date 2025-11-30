export type FetchState<T> = {
  data: T | null
  isLoading: boolean
  error: string | null
}