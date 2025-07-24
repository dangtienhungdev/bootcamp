import { Card, Input, Space, Table, Tag, Typography } from 'antd'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useGetPermissionsQuery } from '../../services/permission.service'

const { Title } = Typography
const { Search } = Input

const PermissionPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageSize, setPageSize] = useState(10)

  const {
    data: permissionsData,
    isLoading,
    error
  } = useGetPermissionsQuery(
    {
      search,
      page: currentPage,
      limit: pageSize
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false
    }
  )

  const columns = [
    {
      title: 'Permission Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Tag color='purple' style={{ fontSize: '14px', padding: '4px 8px' }}>
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
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => (
        <Tag color='orange' style={{ fontSize: '12px', padding: '2px 6px' }}>
          {slug}
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
    // setCurrentPage(1) // Reset to first page when searching
  }

  const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    const newPage = pagination.current || 1
    const newPageSize = pagination.pageSize || 10

    // setCurrentPage(newPage)
    // setPageSize(newPageSize)
    navigate({
      pathname: '/permissions',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  return (
    <div>
      <Title level={2}>Permission Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Search
            placeholder='Search permissions...'
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
          dataSource={permissionsData?.docs || []}
          loading={isLoading}
          rowKey='_id'
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: permissionsData?.totalDocs || 0,
            showSizeChanger: true,
            // showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} permissions`,
            pageSizeOptions: ['10', '20', '50'],
            onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
          }}
        />
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Error loading permissions. Please try again.</Typography.Text>
        </Card>
      )}
    </div>
  )
}

export default PermissionPage
