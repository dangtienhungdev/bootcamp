import type { PaginatedResponse, QueryParams } from './common.type'

export type Staff = {
  _id: string
  fullName: string
  email: string
  password: string
  phone: string
  slug: string
  birthDay: string | null
  avatar: string | null
  addresses: any[]
  role: string
  position: string | null
  department: string | null
  employeeId: string
  isVerified: boolean
  verificationToken: string
  isActive: boolean
  passwordResetExpires: string | null
  passwordResetToken: string | null
  createdAt: string
  updatedAt: string
}

export type CreateStaffType = {
  fullName: string
  email: string
  phone: string
  password: string
  passwordConfirm: string
  department: string
  position: string
  employeeId: string
  role: string
}

export type StaffAddress = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export type UpdateStaffType = {
  fullName: string
  email: string
  phone: string
  birthDay?: string
  avatar?: string
  addresses?: StaffAddress[]
  role?: string
  position?: string
  department?: string
  employeeId?: string
  isVerified?: boolean
  isActive?: boolean
}

// Re-export common types for staff-specific usage
export type StaffQueryParams = QueryParams
export type StaffListResponse = PaginatedResponse<Staff>
