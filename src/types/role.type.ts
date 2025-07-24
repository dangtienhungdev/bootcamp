import type { PaginatedResponse, QueryParams } from './common.type'

export type Permission = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  slug: string
}

export type Role = {
  _id: string
  name: string
  description: string
  permissions: Permission[]
  createdAt: string
  updatedAt: string
  slug: string
}

// Re-export common types for role-specific usage
export type RoleQueryParams = QueryParams
export type RoleListResponse = PaginatedResponse<Role>
