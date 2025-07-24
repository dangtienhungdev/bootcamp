// Generic query parameters for paginated APIs with search functionality
export type QueryParams = {
  search?: string
  limit?: number
  page?: number
}

// Generic paginated response structure that can be used with any entity
export type PaginatedResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
