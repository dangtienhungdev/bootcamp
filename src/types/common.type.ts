export type Response<T> = {
	docs: T
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

export type Params = {
	page?: number
	limit?: number
	search?: string
	sort?: string
	order?: string
}
