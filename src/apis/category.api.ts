import type { Category, ParamsCategory } from '@/types/category.type'

import type { Response } from '@/types/common.type'
import instance from '@/configs/instance'

export const categoryApi = {
	// get all categories
	getCategories: async (params?: ParamsCategory): Promise<Response<Category[]>> => {
		const response = await instance.get('/categories', { params })
		return response.data
	}
}
