import './sidebar.css'

import { Key, LayoutDashboard, Shield, ShoppingBag, Users } from 'lucide-react'
import { Layout, Menu } from 'antd'
import { PERMISSIONS, useCurrentUserPermissions } from '@/utils/permissions-guard'
import { useLocation, useNavigate } from 'react-router-dom'

import React from 'react'

const { Sider } = Layout

interface SidebarProps {
  collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { hasPermission, isLoading } = useCurrentUserPermissions()

  // Build menu items based on permissions
  const buildMenuItems = () => {
    const items: any[] = [
      {
        key: 'general',
        label: 'Chung',
        type: 'group',
        children: [
          {
            key: '/',
            icon: <LayoutDashboard size={18} />,
            label: 'Bảng điều khiển'
          }
        ]
      }
    ]

    // Add Roles menu if user has role-related permissions
    if (
      hasPermission(PERMISSIONS.VIEW_ROLES) ||
      hasPermission(PERMISSIONS.CREATE_ROLE) ||
      hasPermission(PERMISSIONS.VIEW_ROLE) ||
      hasPermission(PERMISSIONS.UPDATE_ROLE) ||
      hasPermission(PERMISSIONS.DELETE_ROLE)
    ) {
      items[0].children.push({
        key: '/roles',
        icon: <Shield size={18} />,
        label: 'Vai trò'
      })
    }

    // Add Permissions menu if user has permission-related permissions
    if (
      hasPermission(PERMISSIONS.VIEW_PERMISSIONS) ||
      hasPermission(PERMISSIONS.CREATE_PERMISSION) ||
      hasPermission(PERMISSIONS.UPDATE_PERMISSION) ||
      hasPermission(PERMISSIONS.DELETE_PERMISSION)
    ) {
      items[0].children.push({
        key: '/permissions',
        icon: <Key size={18} />,
        label: 'Quyền hạn'
      })
    }

    // Add User Management group if user has user-related permissions
    const userManagementChildren = []

    if (hasPermission(PERMISSIONS.VIEW_CUSTOMER)) {
      userManagementChildren.push({
        key: '/customers',
        label: 'Danh sách người dùng'
      })
    }

    if (
      hasPermission(PERMISSIONS.VIEW_STAFF) ||
      hasPermission(PERMISSIONS.CREATE_STAFF) ||
      hasPermission(PERMISSIONS.UPDATE_STAFF) ||
      hasPermission(PERMISSIONS.DELETE_STAFF)
    ) {
      userManagementChildren.push({
        key: '/staffs',
        label: 'Quản lý nhân viên'
      })
    }

    if (userManagementChildren.length > 0) {
      items.push({
        key: 'user-group',
        label: 'Quản lý người dùng',
        type: 'group',
        children: [
          {
            key: 'users',
            icon: <Users size={18} />,
            label: 'Quản lý người dùng',
            children: userManagementChildren
          }
        ]
      })
    }

    // Add Product Management group if user has product-related permissions
    const productManagementChildren = []

    if (
      hasPermission(PERMISSIONS.GET_ALL_CATEGORIES) ||
      hasPermission(PERMISSIONS.UPDATE_CATEGORY) ||
      hasPermission(PERMISSIONS.DELETE_CATEGORY)
    ) {
      productManagementChildren.push({
        key: '/categories',
        icon: <ShoppingBag size={18} />,
        label: 'Quản lý danh mục'
      })
    }

    if (
      hasPermission(PERMISSIONS.GET_ALL_PRODUCTS) ||
      hasPermission(PERMISSIONS.CREATE_PRODUCT) ||
      hasPermission(PERMISSIONS.UPDATE_PRODUCT) ||
      hasPermission(PERMISSIONS.DELETE_PRODUCT)
    ) {
      productManagementChildren.push({
        key: '/products',
        icon: <ShoppingBag size={18} />,
        label: 'Quản lý sản phẩm'
      })
    }

    if (productManagementChildren.length > 0) {
      items.push({
        key: 'product-group',
        label: 'Quản lý sản phẩm',
        type: 'group',
        children: productManagementChildren
      })
    }

    return items
  }

  const menuItems = buildMenuItems()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // Don't render if still loading permissions
  if (isLoading) {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: '#ffffff',
          borderRight: '1px solid #e5e7eb'
        }}
        width={280}
      >
        <div
          style={{
            padding: '16px',
            textAlign: 'center',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '8px'
          }}
        >
          <h2
            style={{
              color: '#1f2937',
              margin: 0,
              fontSize: collapsed ? '16px' : '20px',
              fontWeight: 'bold'
            }}
          >
            {collapsed ? 'SA' : 'Shadcn Admin'}
          </h2>
        </div>
      </Sider>
    )
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb'
      }}
      width={280}
    >
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '8px'
        }}
      >
        <h2
          style={{
            color: '#1f2937',
            margin: 0,
            fontSize: collapsed ? '16px' : '20px',
            fontWeight: 'bold'
          }}
        >
          {collapsed ? 'SA' : 'Shadcn Admin'}
        </h2>
        {!collapsed && (
          <p
            style={{
              color: '#6b7280',
              margin: '4px 0 0 0',
              fontSize: '12px'
            }}
          >
            Vite + ShadcnUI
          </p>
        )}
      </div>

      <Menu
        theme='light'
        mode='inline'
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          background: '#ffffff',
          border: 'none'
        }}
        className='custom-sidebar-menu'
      />
    </Sider>
  )
}

export default Sidebar
