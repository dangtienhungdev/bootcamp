import type { Category, CreateCategoryType } from '@/types/category.type'
import type { PaginatedResponse, QueryParams } from '@/types/common.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Auth API configuration
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    }
  }),
  endpoints: (builder) => ({
    // create
    createCategory: builder.mutation<Category, CreateCategoryType>({
      query: (category) => ({
        url: '/categories',
        method: 'POST',
        body: category
      })
    }),

    // get all
    getCategories: builder.query<PaginatedResponse<Category>, QueryParams>({
      query: ({ search, limit, page }) => ({
        url: '/categories',
        params: { search, limit, page }
      })
    }),

    // cập nhật thông tin
    updateCategory: builder.mutation<Category, { id: string; category: CreateCategoryType }>({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: 'PATCH',
        body: category
      })
    }),

    // delete
    deleteCategory: builder.mutation<Category, { id: string }>({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi
