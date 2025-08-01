import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Staff, StaffListResponse, StaffQueryParams } from '../types/staff.type'

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
      })
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

export const { useGetStaffsQuery, useGetCurrentStaffQuery } = staffApi
