import { useGetRoleByIdQuery } from '@/services/role.service'
import { useGetCurrentStaffQuery } from '@/services/staff.service'
import type { PermissionName } from './permissions-guard'

export const useCurrentUserPermissions = () => {
  const { data: currentStaff } = useGetCurrentStaffQuery()

  const { data: userRole } = useGetRoleByIdQuery(currentStaff?.role || '', {
    skip: !currentStaff?.role
  })

  const userPermissions = userRole?.permissions?.map((permission) => permission.name) || []

  // kiểm tra xem user có quyền truy cập vào component hay không
  const hasPermission = (permissions: PermissionName) => userPermissions.includes(permissions)

  // isLoading
  const isLoading = !currentStaff || !userRole

  return {
    hasPermission,
    permissions: userPermissions,
    currentStaff,
    userRole,
    isLoading
  }
}
