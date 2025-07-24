import React, { useState } from 'react'

import { Layout } from 'antd'
import Content from './components/content'
import Header from './components/header'
import Sidebar from './components/sidebar/sidebar'

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
        <Content />
      </Layout>
    </Layout>
  )
}

export default MainLayout
