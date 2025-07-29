import { useGetCurrentStaffQuery } from '@/services/staff.service'
import { useGetRoleByIdQuery } from '@/services/role.service'

// Permission names from the provided JSON
export const PERMISSIONS = {
  // Product permissions
  GET_PRODUCT: 'get_product',
  CREATE_PRODUCT: 'create_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  GET_ALL_PRODUCTS: 'get-all-products',
  GET_PRODUCT_BY_SLUG: 'get-product-by-slug',

  // Category permissions
  DELETE_CATEGORY: 'delete_category',
  UPDATE_CATEGORY: 'update_category',
  GET_ALL_CATEGORIES: 'get-all-categories',

  // User permissions
  CREATE_USER: 'create-user',

  // Role permissions
  VIEW_ROLES: 'view-roles',
  CREATE_ROLE: 'create-role',
  VIEW_ROLE: 'view-role',
  UPDATE_ROLE: 'update-role',
  DELETE_ROLE: 'delete-role',
  MANAGE_ROLE_PERMISSIONS: 'manage-role-permissions',

  // Permission permissions
  VIEW_PERMISSIONS: 'view-permissions',
  CREATE_PERMISSION: 'create-permission',
  UPDATE_PERMISSION: 'update-permission',
  DELETE_PERMISSION: 'delete-permission',

  // Customer permissions
  VIEW_CUSTOMER: 'view-customer',

  // Cart permissions
  CREATE_CART: 'create-cart',
  VIEW_CART: 'view-cart',
  UPDATE_CART: 'update-cart',
  DELETE_CART: 'delete-cart',
  ADD_CART_ITEM: 'add-cart-item',
  DELETE_CART_ITEM: 'delete-cart-item',
  UPDATE_CART_ITEM: 'update-cart-item',

  // Upload permissions
  UPLOAD_IMAGE: 'upload-image',
  UPLOAD_IMAGES: 'upload-images',

  // Staff permissions
  CREATE_STAFF: 'create-staff',
  VIEW_STAFF: 'view-staff',
  UPDATE_STAFF: 'update-staff',
  DELETE_STAFF: 'delete-staff'
} as const

export type PermissionName = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// Hook to get current user's permissions
export const useCurrentUserPermissions = () => {
  const { data: currentStaff } = useGetCurrentStaffQuery()
  const { data: userRole } = useGetRoleByIdQuery(currentStaff?.role || '', {
    skip: !currentStaff?.role
  })

  const userPermissions = userRole?.permissions?.map(p => p.name) || []

  return {
    permissions: userPermissions,
    hasPermission: (permission: PermissionName) => userPermissions.includes(permission),
    hasAnyPermission: (permissions: PermissionName[]) => permissions.some(p => userPermissions.includes(p)),
    hasAllPermissions: (permissions: PermissionName[]) => permissions.every(p => userPermissions.includes(p)),
    isLoading: !currentStaff || !userRole,
    currentStaff,
    userRole
  }
}

// Higher-order component for permission-based rendering
export const withPermission = (permission: PermissionName) => {
  return (Component: React.ComponentType<any>) => {
    return (props: any) => {
      const { hasPermission, isLoading } = useCurrentUserPermissions()

      if (isLoading) {
        return null // or loading spinner
      }

      if (!hasPermission(permission)) {
        return null
      }

      return <Component {...props} />
    }
  }
}

// Component for conditional rendering based on permissions
export const PermissionGuard: React.FC<{
  permission: PermissionName
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ permission, children, fallback = null }) => {
  const { hasPermission, isLoading } = useCurrentUserPermissions()

  if (isLoading) {
    return fallback
  }

  if (!hasPermission(permission)) {
    return fallback
  }

  return <>{children}</>
}

// Component for rendering based on multiple permissions (any)
export const AnyPermissionGuard: React.FC<{
  permissions: PermissionName[]
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ permissions, children, fallback = null }) => {
  const { hasAnyPermission, isLoading } = useCurrentUserPermissions()

  if (isLoading) {
    return fallback
  }

  if (!hasAnyPermission(permissions)) {
    return fallback
  }

  return <>{children}</>
}

// Component for rendering based on multiple permissions (all)
export const AllPermissionsGuard: React.FC<{
  permissions: PermissionName[]
  children: React.ReactNode
  fallback?: React.ReactNode
}> = ({ permissions, children, fallback = null }) => {
  const { hasAllPermissions, isLoading } = useCurrentUserPermissions()

  if (isLoading) {
    return fallback
  }

  if (!hasAllPermissions(permissions)) {
    return fallback
  }

  return <>{children}</>
}