import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CustomerListResponse, CustomerQueryParams } from '../types/customer.type'

import { getAuthData } from '@/utils/auth-storage'

// Customer API configuration
export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
    prepareHeaders: (headers) => {
      const { accessToken } = getAuthData()
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomerListResponse, CustomerQueryParams>({
      query: (params) => ({
        url: '/customers',
        method: 'GET',
        params: {
          search: params.search || '',
          limit: params.limit || 10,
          page: params.page || 1
        }
      })
    })
  })
})

export const { useGetCustomersQuery } = customerApi
