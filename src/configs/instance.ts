import axios from 'axios'

const accessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODcxMzNlZmU3MzVkODZhOGFiZGZiMzEiLCJlbWFpbCI6ImR1bmdAZ21haWwuY29tIiwicm9sZSI6IjY3ZDQ3YzQ5NDRlN2U0NzZkMTAzY2U5YyIsInVzZXJUeXBlIjoic3RhZmYiLCJpYXQiOjE3NTI4NDg2ODksImV4cCI6MTc1MjkzNTA4OX0.MNkgjZaTidRZdyob6RByBa9L2rXEn4sK2f-vfgkaR_w'

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' }
})

// Add a request interceptor
instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		config.headers.Authorization = `Bearer ${accessToken}`
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	}
)

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error)
	}
)

export default instance
