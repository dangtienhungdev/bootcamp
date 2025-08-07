import './sidebar.css'

import { Layout, Menu } from 'antd'
import { AlertTriangle, Folder, Key, LayoutDashboard, Package, Shield } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PERMISSIONS } from '@/guard/permissions-guard'
import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import React from 'react'

const { Sider } = Layout

interface SidebarProps {
  collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { hasPermission, isLoading } = useCurrentUserPermissions()

  // build menu items based on permissions
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

    // roles
    if (
      hasPermission(PERMISSIONS.VIEW_ROLES) ||
      hasPermission(PERMISSIONS.VIEW_ROLE) ||
      hasPermission(PERMISSIONS.CREATE_ROLE) ||
      hasPermission(PERMISSIONS.UPDATE_ROLE) ||
      hasPermission(PERMISSIONS.DELETE_ROLE) ||
      hasPermission(PERMISSIONS.MANAGE_ROLE_PERMISSIONS)
    ) {
      items[0].children.push({
        key: '/roles',
        icon: <Shield size={18} />,
        label: 'Vai trò'
      })
    }

    // permissions
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

    // add user management
    const userManagement = []

    // customers
    if (hasPermission(PERMISSIONS.VIEW_CUSTOMER)) {
      userManagement.push({
        key: '/customers',
        label: 'Danh sách người dùng'
      })
    }

    // staffs
    if (
      hasPermission(PERMISSIONS.VIEW_PERMISSIONS) ||
      hasPermission(PERMISSIONS.CREATE_PERMISSION) ||
      hasPermission(PERMISSIONS.UPDATE_PERMISSION) ||
      hasPermission(PERMISSIONS.DELETE_PERMISSION)
    ) {
      userManagement.push({
        key: '/staffs',
        label: 'Quản lý nhân viên'
      })
    }

    if (userManagement.length > 0) {
      items.push({
        key: 'user-group',
        label: 'Quản lý người dùng',
        type: 'group',
        children: [
          {
            key: 'users',
            icon: <AlertTriangle size={18} />,
            label: 'Quản lý người dùng',
            children: userManagement
          }
        ]
      })
    }

    // addd product system
    const productManagement = []

    // category
    if (
      hasPermission(PERMISSIONS.CREATE_CATEGORY) ||
      hasPermission(PERMISSIONS.GET_CATEGORY) ||
      hasPermission(PERMISSIONS.GET_ALL_CATEGORIES) ||
      hasPermission(PERMISSIONS.UPDATE_CATEGORY) ||
      hasPermission(PERMISSIONS.DELETE_CATEGORY)
    ) {
      productManagement.push({
        key: '/categories',
        icon: <Folder size={18} />,
        label: 'Danh mục sản phẩm'
      })
    }

    // product
    if (
      hasPermission(PERMISSIONS.CREATE_PRODUCT) ||
      hasPermission(PERMISSIONS.GET_PRODUCT) ||
      hasPermission(PERMISSIONS.GET_ALL_PRODUCTS) ||
      hasPermission(PERMISSIONS.UPDATE_PRODUCT) ||
      hasPermission(PERMISSIONS.DELETE_PRODUCT)
    ) {
      productManagement.push({
        key: '/products',
        icon: <Package size={18} />,
        label: 'Danh sách sản phẩm'
      })
    }

    if (productManagement.length > 0) {
      items.push({
        key: 'product-system',
        label: 'Hệ thống sản phẩm',
        type: 'group',
        children: productManagement
      })
    }

    return items
  }

  const menuItems = buildMenuItems()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
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
