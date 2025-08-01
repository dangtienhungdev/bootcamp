import type { PaginatedResponse, QueryParams } from './common.type'

export type Permission = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  slug: string
}

// Re-export common types for permission-specific usage
export type PermissionQueryParams = QueryParams
export type PermissionListResponse = PaginatedResponse<Permission>

export type CreatePermissionPayload = {
  name: string
  description: string
}
