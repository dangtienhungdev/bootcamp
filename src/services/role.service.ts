import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RoleListResponse, RoleQueryParams } from '../types/role.type'

import { getAuthData } from '@/utils/auth-storage'

// Role API configuration
export const roleApi = createApi({
  reducerPath: 'roleApi',
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
    getRoles: builder.query<RoleListResponse, RoleQueryParams>({
      query: (params) => ({
        url: '/roles',
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

export const { useGetRolesQuery } = roleApi
