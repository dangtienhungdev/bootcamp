import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CreatePermissionPayload, PermissionListResponse, PermissionQueryParams } from '../types/permission.type'

import { getAuthData } from '@/utils/auth-storage'

// Permission API configuration
export const permissionApi = createApi({
  reducerPath: 'permissionApi',
  tagTypes: ['Permission'],
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
      },
      providesTags: (result) => {
        return result
          ? // successful query
            [
              ...result.docs.map(({ _id }) => ({ type: 'Permission', id: _id }) as const),
              { type: 'Permission', id: 'LIST' }
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Permission', id: 'LIST' }]
      }
    }),

    // create permissions
    createPermission: builder.mutation<Permissions, CreatePermissionPayload>({
      query: (payload) => ({
        url: '/permissions',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: [{ type: 'Permission', id: 'LIST' }]
    })
  })
})

export const { useGetPermissionsQuery, useCreatePermissionMutation } = permissionApi
