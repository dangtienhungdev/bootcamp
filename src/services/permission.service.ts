import type { Permission, PermissionListResponse, PermissionQueryParams } from '../types/permission.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getAuthData } from '@/utils/auth-storage'

// Permission API configuration
export const permissionApi = createApi({
  reducerPath: 'permissionApi',
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
    getPermissions: builder.query<PermissionListResponse, PermissionQueryParams>({
      query: (params) => {
        return {
          url: '/permissions',
          method: 'GET',
          params: {
            search: params.search || '',
            limit: params.limit || 10,
            page: params.page || 1
          }
        }
      }
    }),
    createPermission: builder.mutation<Permission, { name: string; description: string }>({
      query: (body) => ({
        url: '/permissions',
        method: 'POST',
        body
      })
    })
  })
})

export const { useGetPermissionsQuery, useCreatePermissionMutation } = permissionApi
