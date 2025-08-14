import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  CreateCustomerType,
  Customer,
  CustomerListResponse,
  CustomerQueryParams,
  UpdateCustomerType,
  WishlistResponse
} from '../types/customer.type'

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
  tagTypes: ['Customer'],
  endpoints: (builder) => ({
    // Get all customers
    getCustomers: builder.query<CustomerListResponse, CustomerQueryParams>({
      query: (params) => ({
        url: '/customers',
        method: 'GET',
        params: {
          search: params.search || '',
          limit: params.limit || 10,
          page: params.page || 1
        }
      }),
      providesTags: ['Customer']
    }),

    // Create customer
    createCustomer: builder.mutation<Customer, CreateCustomerType>({
      query: (customer) => ({
        url: '/customers',
        method: 'POST',
        body: customer
      }),
      invalidatesTags: ['Customer']
    }),

    // Get customer by ID
    getCustomerById: builder.query<Customer, { id: string }>({
      query: ({ id }) => ({
        url: `/customers/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [{ type: 'Customer', id }]
    }),

    // Update customer
    updateCustomer: builder.mutation<Customer, { id: string; customer: UpdateCustomerType }>({
      query: ({ id, customer }) => ({
        url: `/customers/${id}`,
        method: 'PATCH',
        body: customer
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }, 'Customer']
    }),

    // Delete customer
    deleteCustomer: builder.mutation<Customer, { id: string }>({
      query: ({ id }) => ({
        url: `/customers/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Customer']
    }),

    // Get customer wishlist
    getCustomerWishlist: builder.query<WishlistResponse, void>({
      query: () => ({
        url: '/customers/wishlist',
        method: 'GET'
      }),
      providesTags: ['Customer']
    })
  })
})

export const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerWishlistQuery
} = customerApi
