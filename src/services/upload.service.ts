import type { UploadImageRequest, UploadImageResponse } from '@/types/upload.type'
import { getAuthData } from '@/utils/auth-storage'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
    prepareHeaders: (headers) => {
      const { accessToken } = getAuthData()
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`)
      }
      // Don't set Content-Type for multipart/form-data, let the browser set it automatically
      return headers
    }
  }),
  tagTypes: ['Upload'],
  endpoints: (builder) => ({
    uploadImage: builder.mutation<UploadImageResponse, UploadImageRequest>({
      query: ({ file, description }) => {
        const formData = new FormData()
        formData.append('file', file)
        if (description) {
          formData.append('description', description)
        }

        return {
          url: '/upload/image',
          method: 'POST',
          body: formData
        }
      },
      invalidatesTags: ['Upload']
    })
  })
})

export const { useUploadImageMutation } = uploadApi
