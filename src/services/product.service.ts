import type { ParamProduct, Product } from '@/types/product.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PaginatedResponse } from '@/types/common.type'
import { getAuthData } from '@/utils/auth-storage'
import { omit } from 'lodash'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
    prepareHeaders: (headers) => {
      const { accessToken } = getAuthData()
      headers.set('Authorization', `Bearer ${accessToken}`)
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // get products
    getProducts: builder.query<PaginatedResponse<Product>, Partial<ParamProduct>>({
      query: (params: Partial<ParamProduct> = {}) => ({
        url: '/products',
        params
      })
    }),

    // cập nhật sản phẩm
    updateProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: 'PATCH',
        body: omit(product, ['_id', 'createdAt', 'updatedAt'])
      })
    })
  })
})

export const { useGetProductsQuery, useUpdateProductMutation } = productApi
