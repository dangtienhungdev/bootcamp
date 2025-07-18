import type { ParamProduct, Product } from '@/types/product.type'

import type { Response } from '@/types/common.type'
import { productApi } from '@/apis/product.api'
import { useQuery } from '@tanstack/react-query'

export const useProducts = (params?: ParamProduct) => {
	const result = useQuery<Response<Product[]>>({
		queryKey: [productApi.getAllProducts.name, params],
		queryFn: () => productApi.getAllProducts(params)
	})

	const { data, ...rest } = result
	const products = data?.docs || []

	return { products, ...rest }
}
