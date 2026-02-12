export type AsyncState<T, E = string> = {
  data: T | null
  isLoading: boolean
  error: E | null
}