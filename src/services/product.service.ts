import type { CreateProductBody, ProductV2 } from '@/types/product-v2.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { PaginationV2 } from '@/types/common.type';

export const productApi = createApi({
	reducerPath: 'productApi',
	tagTypes: ['Product'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:8900/api/v1',
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q1NjUxZWI5NDk0N2MxNzAxMDZjYTQiLCJlbWFpbCI6ImRhbmd0aWVuaHVuZy5kZXZAZ21haWwuY29tIiwicm9sZSI6IjY3ZDQ3YzQ5NDRlN2U0NzZkMTAzY2U5YyIsInVzZXJUeXBlIjoic3RhZmYiLCJpYXQiOjE3NTIxNjIzMjMsImV4cCI6MTc1MjI0ODcyM30.F60B2LcbztjQBWexBL7VnxA_Zlkrg5PHen8W_xUSkoA`,
		},
	}),
	endpoints: (builder) => ({
		// Get all products
		getProducts: builder.query<PaginationV2<ProductV2>, void>({
			query: () => `/products?limit=100`,
			providesTags: (result) => {
				return result?.docs?.length
					? [
							...result.docs.map(
								({ _id }) =>
									({
										type: 'Product',
										id: _id,
									} as const)
							),
							{ type: 'Product', id: 'LIST' },
					  ]
					: [{ type: 'Product', id: 'LIST' }];
			},
		}),

		// create product
		createProduct: builder.mutation<ProductV2, CreateProductBody>({
			query: (product) => ({
				method: 'POST',
				body: product,
				url: '/products',
			}),
			invalidatesTags: [{ type: 'Product', id: 'LIST' }],
		}),
	}),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
