import type React from 'react'
import { useCurrentUserPermissions } from './use-current-user-permissions'

export const withPermission = (permission: PermissionName) => {
  return (Component: React.ComponentType<any>) => {
    return (props: any) => {
      const { hasPermission, isLoading } = useCurrentUserPermissions()

      if (isLoading) {
        return <div>Loading...</div>
      }

      if (!hasPermission(permission)) {
        return <div>Bạn không có quyền truy cập vào trang này</div>
      }

      return <Component {...props} />
    }
  }
}
