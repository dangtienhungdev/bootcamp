import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PaginatedResponse } from '@/types/common.type'
import type { Product } from '@/types/product.type'

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
    getProducts: builder.query<PaginatedResponse<Product>, void>({
      query: () => '/products'
    })
  })
})

export const { useGetProductsQuery } = productApi
