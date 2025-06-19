import { productsApi, type GetProductsParams } from '@/apis/products.api';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (params?: GetProductsParams) => {
	const result = useQuery({
		queryKey: [productsApi.getProducts.name, params],
		queryFn: () => productsApi.getProducts(params),
	});
	const { data: productsResponse } = result;

	const products = productsResponse?.data.items || [];
	const pagination = productsResponse?.data;

	return {
		...result,
		products,
		pagination,
	};
};
