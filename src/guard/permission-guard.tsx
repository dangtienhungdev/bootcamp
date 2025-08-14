import type React from 'react'
import type { PermissionName } from './permissions-guard'
import { useCurrentUserPermissions } from './use-current-user-permissions'

interface PermissionGuardProps {
  perrmission: PermissionName
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const PermissionGuard = ({ perrmission, children, fallback }: PermissionGuardProps) => {
  const { hasPermission, isLoading, isAdmin } = useCurrentUserPermissions()

  if (isLoading) {
    return fallback
  }

  if (isAdmin) {
    return <>{children}</>
  }

  if (!hasPermission(perrmission)) {
    return fallback
  }

  return <>{children}</>
}
