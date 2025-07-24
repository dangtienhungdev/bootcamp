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

// Re-export common types for staff-specific usage
export type StaffQueryParams = QueryParams
export type StaffListResponse = PaginatedResponse<Staff>
