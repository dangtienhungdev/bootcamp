import type { ParamProduct, Product } from '@/types/product.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PaginatedResponse } from '@/types/common.type'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
    prepareHeaders: (headers) => {
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
    })
  })
})

export const { useGetProductsQuery } = productApi
