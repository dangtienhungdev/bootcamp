import './sidebar.css'

import { AlertTriangle, Key, LayoutDashboard, Shield } from 'lucide-react'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import React from 'react'

const { Sider } = Layout

interface SidebarProps {
  collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: any[] = [
    {
      key: 'general',
      label: 'Chung',
      type: 'group',
      children: [
        {
          key: '/',
          icon: <LayoutDashboard size={18} />,
          label: 'Bảng điều khiển'
        },
        {
          key: '/roles',
          icon: <Shield size={18} />,
          label: 'Vai trò'
        },
        {
          key: '/permissions',
          icon: <Key size={18} />,
          label: 'Quyền hạn'
        }
      ]
    },
    {
      key: 'user-group',
      label: 'Quản lý người dùng',
      type: 'group',
      children: [
        {
          key: 'users',
          icon: <AlertTriangle size={18} />,
          label: 'Quản lý người dùng',
          children: [
            {
              key: '/customers',
              label: 'Danh sách người dùng'
            },
            {
              key: '/staffs',
              label: 'Quản lý nhân viên'
            }
          ]
        }
      ]
    }
  ]

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
