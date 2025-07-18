import type { ParamProduct, Product } from '@/types/product.type'

import type { Response } from '@/types/common.type'
import instance from '@/configs/instance'

export const productApi = {
	// get all products
	getAllProducts: async (params?: ParamProduct): Promise<Response<Product[]>> => {
		const response = await instance.get(`/products`, { params })
		return response.data
	}
}
