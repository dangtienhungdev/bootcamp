import { Avatar, Breadcrumb, Button, Dropdown, Layout, Typography } from 'antd'
import { ChevronDown, LogOut, Menu, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/contexts/auth-context'
import React from 'react'

const { Header: AntHeader } = Layout
const { Text } = Typography

interface HeaderProps {
  collapsed: boolean
  onCollapse: () => void
}

const Header: React.FC<HeaderProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Generate breadcrumb items based on current path
  const generateBreadcrumbItems = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const items = [{ title: 'Home' }]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      items.push({ title })
    })

    return items
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: 'View Profile',
      onClick: () => {
        // Handle profile view
        console.log('View profile clicked')
      }
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Logout',
      onClick: handleLogout
    }
  ]

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type='text'
          icon={collapsed ? <Menu /> : <Menu />}
          onClick={onCollapse}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />

        <Breadcrumb items={generateBreadcrumbItems()} style={{ fontSize: '14px' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Dropdown menu={{ items: userMenuItems }} placement='bottomRight' trigger={['click']}>
          <Button
            type='text'
            style={{
              height: 'auto',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Avatar
              size={32}
              style={{
                backgroundColor: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {user ? getUserInitials(user.fullName) : 'U'}
            </Avatar>

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.2' }}>{user?.fullName || 'User'}</div>
              <div style={{ fontSize: '12px', color: '#8c8c8c', lineHeight: '1.2' }}>
                {user?.email || 'user@example.com'}
              </div>
            </div>

            <ChevronDown size={14} style={{ color: '#8c8c8c' }} />
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header
