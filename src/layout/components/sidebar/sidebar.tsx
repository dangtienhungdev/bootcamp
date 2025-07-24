import './sidebar.css'

import { Badge, Layout, Menu } from 'antd'
import {
  AlertTriangle,
  CheckSquare,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageCircle,
  Settings,
  Shield,
  Users
} from 'lucide-react'
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
      label: 'General',
      type: 'group',
      children: [
        {
          key: '/',
          icon: <LayoutDashboard size={18} />,
          label: 'Dashboard'
        },
        {
          key: '/tasks',
          icon: <CheckSquare size={18} />,
          label: 'Tasks'
        },
        {
          key: '/apps',
          icon: <Settings size={18} />,
          label: 'Apps'
        },
        {
          key: '/chats',
          icon: <MessageCircle size={18} />,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Chats</span>
              <Badge count={1} size='small' />
            </div>
          )
        },
        {
          key: '/users',
          icon: <Users size={18} />,
          label: 'Users'
        },
        {
          key: '/secured',
          icon: <Shield size={18} />,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Secured by Clerk</span>
              <ChevronRight size={14} />
            </div>
          )
        }
      ]
    },
    {
      key: 'pages',
      label: 'Pages',
      type: 'group',
      children: [
        {
          key: '/auth',
          icon: <FileText size={18} />,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Auth</span>
              <ChevronRight size={14} />
            </div>
          )
        },
        {
          key: 'errors',
          icon: <AlertTriangle size={18} />,
          label: 'Errors',
          children: [
            {
              key: '/errors/unauthorized',
              label: 'Unauthorized'
            },
            {
              key: '/errors/forbidden',
              label: 'Forbidden'
            },
            {
              key: '/errors/not-found',
              label: 'Not Found'
            },
            {
              key: '/errors/internal-server-error',
              label: 'Internal Server Error'
            },
            {
              key: '/errors/maintenance',
              label: 'Maintenance Error'
            }
          ]
        }
      ]
    },
    {
      key: 'other',
      label: 'Other',
      type: 'group',
      children: [
        {
          key: '/settings',
          icon: <Settings size={18} />,
          label: (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Settings</span>
              <ChevronRight size={14} />
            </div>
          )
        },
        {
          key: '/help',
          icon: <HelpCircle size={18} />,
          label: 'Help Center'
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
