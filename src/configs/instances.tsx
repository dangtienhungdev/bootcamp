import { getAuthData } from '@/utils/auth-storage'
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_BE || 'http://103.216.119.111:8900/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthData()
    // You can add auth tokens or other headers here
    config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    // For example, redirect to login on 401
    if (error.response && error.response.status === 401) {
      // window.location.href = '/login';
    }
    return Promise.reject(error)
  }
)

export default instance
