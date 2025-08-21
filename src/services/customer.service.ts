import type {
  CreateCustomerType,
  Customer,
  CustomerListResponse,
  CustomerQueryParams,
  UpdateCustomerType,
  WishlistResponse
} from '../types/customer.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
    // exampleFunction: builder.query<Data đầu ra, đata đầu vào>({
    getCustomers: builder.query<CustomerListResponse, CustomerQueryParams>({
      query: (params) => ({
        url: '/customers',
        method: 'GET',
        params
      }),
      providesTags: ['Customer']
    }),

    // Create customer (register)
    createCustomer: builder.mutation<Customer, CreateCustomerType>({
      query: (customer) => ({
        url: '/register',
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
    }),

    // Get customer wishlist by ID
    getCustomerWishlistById: builder.query<WishlistResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/customers/${id}/wishlist`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [{ type: 'Customer', id }]
    })
  })
})

export const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerWishlistQuery,
  useGetCustomerWishlistByIdQuery
} = customerApi
