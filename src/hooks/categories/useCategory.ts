import { categoriesApi, type GetCategoriesParams } from '@/apis/categories.api';
import { useQuery } from '@tanstack/react-query';

export const useCategory = (params?: GetCategoriesParams) => {
	const result = useQuery({
		queryKey: [categoriesApi.getCategories.name, params],
		queryFn: () => categoriesApi.getCategories(params),
	});
	const { data: categoriesResponse } = result;

	const categories = categoriesResponse?.data.items || [];
	const pagination = categoriesResponse?.data;

	return {
		...result,
		categories,
		pagination,
	};
};
