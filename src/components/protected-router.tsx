import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import { Button, Result, Spin } from 'antd'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  permission: PermissionName
  fallback?: string
}

const ProtectedRouter = ({ children, permission, fallback = '/' }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const { hasPermission, isLoading, currentStaff } = useCurrentUserPermissions()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' tip='Đang kiểm tra quyền truy cập...' />
      </div>
    )
  }

  if (!currentStaff) {
    return <Navigate to={'/login'} replace />
  }

  if (!hasPermission(permission)) {
    return (
      <Result
        status='403'
        title='403'
        subTitle='Bạn không có quyền truy cập vào trang này'
        extra={
          <Button type='primary' onClick={() => navigate(fallback)}>
            Quay lại trang chủ
          </Button>
        }
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRouter
