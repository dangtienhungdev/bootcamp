import type { PaginatedResponse, QueryParams } from './common.type'

export type Customer = {
  _id: string
  fullName: string
  email: string
  phone: string
  isVerified: boolean
  totalOrders: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

// Re-export common types for customer-specific usage
export type CustomerQueryParams = QueryParams
export type CustomerListResponse = PaginatedResponse<Customer>
