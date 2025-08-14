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

export type CreateCustomerType = Pick<Customer, 'fullName' | 'email' | 'phone' | 'isVerified'>
export type UpdateCustomerType = Pick<Customer, 'fullName' | 'email' | 'phone' | 'isVerified'>

export type WishlistItem = {
  _id: string
  productId: string
  productName: string
  productPrice: number
  productImage: string
  addedAt: string
}

export type WishlistResponse = {
  customerId: string
  items: WishlistItem[]
  totalItems: number
}

// Re-export common types for customer-specific usage
export type CustomerQueryParams = QueryParams
export type CustomerListResponse = PaginatedResponse<Customer>
