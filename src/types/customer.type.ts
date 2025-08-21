import type { PaginatedResponse, QueryParams } from './common.type'

export type Customer = {
  _id: string
  fullName: string
  email: string
  password: string
  phone: string
  slug: string
  birthDay: string | null
  avatar: string | null
  addresses: CustomerAddress[]
  role: string
  paymentMethods: CustomerPaymentMethod[]
  company: string | null
  website: string | null
  isEmailVerified: boolean
  isVerified: boolean
  verificationToken: string
  isActive: boolean
  passwordResetExpires: string | null
  passwordResetToken: string | null
  totalOrders: number
  totalSpent: number
  wishlist: string[]
  createdAt: string
  updatedAt: string
}

export type CreateCustomerType = {
  fullName: string
  email: string
  phone: string
  password: string
  passwordConfirm: string
}

export type CustomerAddress = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export type CustomerPaymentMethod = {
  cardNumber: string
  cardHolderName: string
  expiryDate: string
  cvv: string
  bank: string
}

export type UpdateCustomerType = {
  fullName: string
  email: string
  phone: string
  birthDay?: string
  avatar?: string
  addresses?: CustomerAddress[]
  role?: string
  paymentMethods?: CustomerPaymentMethod[]
  company?: string
  website?: string
  isActive?: boolean
}

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

// create
