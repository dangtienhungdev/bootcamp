import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Role, RoleDetail, RoleListResponse, RolePayload, RoleQueryParams } from '../types/role.type'

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
  tagTypes: ['Role'],
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
      }),
      providesTags: ['Role']
    }),

    createRole: builder.mutation<Role, RolePayload>({
      query: (payload) => ({
        url: '/roles',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['Role']
    }),

    // lấy ra thông tin chi tiết vai trò
    getRoleById: builder.query<RoleDetail, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, id) => [{ type: 'Role', id }]
    }),

    // cập nhật vai trò
    updateRole: builder.mutation<Role, { id: string; name: string; description: string; permissions: string[] }>({
      query: ({ id, ...payload }) => ({
        url: `/roles/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }, 'Role']
    }),

    // xóa vai trò
    deleteRole: builder.mutation<Role, { id: string }>({
      query: ({ id }) => ({
        url: `/roles/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Role']
    }),

    // xóa nhiều permissions của role
    deleteRolePermissions: builder.mutation<RoleDetail, { id: string; permissionIds: string[] }>({
      query: ({ id, permissionIds }) => ({
        url: `/roles/${id}/permissions/bulk`,
        method: 'DELETE',
        body: { permissionIds }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }, 'Role']
    }),

    // thêm nhiều permissions cho role
    addRolePermissions: builder.mutation<RoleDetail, { id: string; permissionIds: string[] }>({
      query: ({ id, permissionIds }) => ({
        url: `/roles/${id}/permissions/bulk`,
        method: 'POST',
        body: { permissionIds }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }, 'Role']
    })
  })
})

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useDeleteRolePermissionsMutation,
  useAddRolePermissionsMutation
} = roleApi
