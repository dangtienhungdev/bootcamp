import type { CreateStaffType, Staff, StaffListResponse, StaffQueryParams, UpdateStaffType } from '../types/staff.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getAuthData } from '@/utils/auth-storage'

// Staff API configuration
export const staffApi = createApi({
  reducerPath: 'staffApi',
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
  tagTypes: ['Staff'],
  endpoints: (builder) => ({
    // lấy ra danh sách nhân viên
    getStaffs: builder.query<StaffListResponse, StaffQueryParams>({
      query: (params) => ({
        url: '/staff',
        method: 'GET',
        params: {
          search: params.search || '',
          limit: params.limit || 10,
          page: params.page || 1
        }
      }),
      providesTags: ['Staff']
    }),

    // tạo mới nhân viên
    createStaff: builder.mutation<Staff, CreateStaffType>({
      query: (staff) => ({
        url: '/staff/register',
        method: 'POST',
        body: staff
      }),
      invalidatesTags: ['Staff']
    }),

    // lấy thông tin nhân viên theo ID
    getStaffById: builder.query<Staff, { id: string }>({
      query: ({ id }) => ({
        url: `/staff/${id}`,
        method: 'GET'
      }),
      providesTags: (result, error, { id }) => [{ type: 'Staff', id }]
    }),

    // cập nhật thông tin nhân viên
    updateStaff: builder.mutation<Staff, { id: string; staff: UpdateStaffType }>({
      query: ({ id, staff }) => ({
        url: `/staff/${id}`,
        method: 'PATCH',
        body: staff
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }, 'Staff']
    }),

    // xóa nhân viên
    deleteStaff: builder.mutation<Staff, { id: string }>({
      query: ({ id }) => ({
        url: `/staff/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Staff']
    }),

    // lấy ra thông tin chi tiết người đăng nhập hiện tại
    getCurrentStaff: builder.query<Staff, void>({
      query: () => ({
        url: `/staff/me`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetStaffsQuery,
  useCreateStaffMutation,
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useGetCurrentStaffQuery
} = staffApi
