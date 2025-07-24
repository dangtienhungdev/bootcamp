import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'

const { Content: AntContent } = Layout

const Content: React.FC = () => {
  return (
    <AntContent
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: '#fff',
        borderRadius: 8,
        overflow: 'auto'
      }}
    >
      <Outlet />
    </AntContent>
  )
}

export default Content
