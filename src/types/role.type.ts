import type { PaginatedResponse, QueryParams } from './common.type'

import type { Permission } from './permission.type'

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
