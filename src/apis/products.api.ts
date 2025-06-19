import type { BaseResponse, PaginatedResponse } from '@/types/common.type';

import type { Product } from '@/types/product.type';
import axiosInstance from '@/configs/instances/axios';

export interface GetProductsParams {
	page?: number;
	limit?: number;
}

export const productsApi = {
	getProducts: async (
		params?: GetProductsParams
	): Promise<BaseResponse<PaginatedResponse<Product>>> => {
		const response = await axiosInstance.get('/products', { params });
		return response.data;
	},

	getProduct: async (id: string): Promise<BaseResponse<Product>> => {
		const response = await axiosInstance.get(`/products/${id}`);
		return response.data;
	},

	createProduct: async (
		product: Partial<Product>
	): Promise<BaseResponse<Product>> => {
		const response = await axiosInstance.post('/products', product);
		return response.data;
	},

	updateProduct: async (
		id: string,
		product: Partial<Product>
	): Promise<BaseResponse<Product>> => {
		const response = await axiosInstance.put(`/products/${id}`, product);
		return response.data;
	},

	deleteProduct: async (id: string): Promise<BaseResponse<null>> => {
		const response = await axiosInstance.delete(`/products/${id}`);
		return response.data;
	},
};
