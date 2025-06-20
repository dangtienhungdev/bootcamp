import type { BaseResponse, PaginatedResponse } from '@/types/common.type';

import type { Category } from '@/types/category.type';
import axiosInstance from '@/configs/instances/axios';

export interface GetCategoriesParams {
	page?: number;
	limit?: number;
}

export const categoriesApi = {
	getCategories: async (
		params?: GetCategoriesParams
	): Promise<BaseResponse<PaginatedResponse<Category>>> => {
		const response = await axiosInstance.get('/categories', { params });
		return response.data;
	},

	getCategory: async (id: string): Promise<BaseResponse<Category>> => {
		const response = await axiosInstance.get(`/categories/${id}`);
		return response.data;
	},

	createCategory: async (
		category: Partial<Category>
	): Promise<BaseResponse<Category>> => {
		const response = await axiosInstance.post('/categories', category);
		return response.data;
	},

	updateCategory: async (
		id: string,
		category: Partial<Category>
	): Promise<BaseResponse<Category>> => {
		const response = await axiosInstance.put(`/categories/${id}`, category);
		return response.data;
	},

	deleteCategory: async (id: string): Promise<BaseResponse<null>> => {
		const response = await axiosInstance.delete(`/categories/${id}`);
		return response.data;
	},
};
