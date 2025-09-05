import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [params] = useSearchParams()

  const searchParams = Object.fromEntries([...params])

  return searchParams
}
