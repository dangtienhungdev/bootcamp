import type { ParamsCategory } from '@/types/category.type'
import { categoryApi } from '@/apis/category.api'
import { useQuery } from '@tanstack/react-query'

export const useCategories = (params?: ParamsCategory) => {
	const result = useQuery({
		queryKey: [categoryApi.getCategories.name, params],
		queryFn: () => categoryApi.getCategories(params)
	})

	const { data, ...rest } = result
	const categories = data?.docs || []

	return { categories, ...rest }
}
