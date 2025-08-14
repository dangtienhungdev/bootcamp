import type { Category, CreateCategoryType } from '@/types/category.type'
import type { PaginatedResponse, QueryParams } from '@/types/common.type'
import { getAuthData } from '@/utils/auth-storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Auth API configuration
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    // create
    createCategory: builder.mutation<Category, CreateCategoryType>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    }),

    // get all
    getCategories: builder.query<PaginatedResponse<Category>, QueryParams>({
      query: ({ search, limit, page }) => ({
        url: '/categories',
        params: { search, limit, page }
      }),
      providesTags: ['Category']
    }),

    // cập nhật thông tin
    updateCategory: builder.mutation<Category, { id: string; category: CreateCategoryType }>({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: category
      }),
      invalidatesTags: ['Category']
    }),

    // delete
    deleteCategory: builder.mutation<Category, { id: string }>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    })
  })
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi
