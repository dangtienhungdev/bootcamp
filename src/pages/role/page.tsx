import { Card, Input, Space, Table, Tag, Typography } from 'antd'
import { useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { useGetRolesQuery } from '../../services/role.service'

const { Title } = Typography
const { Search } = Input

const RolePage = () => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const {
    data: rolesData,
    isLoading,
    error
  } = useGetRolesQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
          {name}
        </Tag>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => <span style={{ color: '#666' }}>{description || 'No description'}</span>
    },
    {
      title: 'Permissions Count',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: any[]) => (
        <Tag color='green' style={{ fontSize: '14px', padding: '4px 8px' }}>
          {permissions?.length || 0} permissions
        </Tag>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span style={{ color: '#666', fontSize: '12px' }}>{new Date(createdAt).toLocaleDateString()}</span>
      )
    }
  ]

  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current)
    setPageSize(pagination.pageSize)
  }

  return (
    <div>
      <Title level={2}>Role Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Search
            placeholder='Search roles...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />
        </Space>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={rolesData?.docs || []}
          loading={isLoading}
          rowKey='_id'
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: rolesData?.totalDocs || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} roles`,
            pageSizeOptions: ['10', '20', '50'],
            onChange: handleTableChange
          }}
        />
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Error loading roles. Please try again.</Typography.Text>
        </Card>
      )}
    </div>
  )
}

export default RolePage
