import { Card, Input, Space, Table, Typography } from 'antd'
import { PERMISSIONS, PermissionGuard } from '@/utils/permissions-guard'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { useGetCustomersQuery } from '../../services/customer.service'
import { useState } from 'react'

const { Title } = Typography
const { Search } = Input

const CustomerPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')

  const {
    data: customersData,
    isLoading,
    error
  } = useGetCustomersQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => <span style={{ fontWeight: '500', color: '#1f2937' }}>{fullName}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <span style={{ color: '#666' }}>{email}</span>
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => <span style={{ color: '#666' }}>{phone}</span>
    },
    {
      title: 'Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: boolean) => (
        <span style={{ color: isVerified ? '#52c41a' : '#ff4d4f' }}>{isVerified ? 'Yes' : 'No'}</span>
      )
    },
    {
      title: 'Total Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (totalOrders: number) => <span style={{ color: '#1890ff', fontWeight: '500' }}>{totalOrders || 0}</span>
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (totalSpent: number) => (
        <span style={{ color: '#52c41a', fontWeight: '500' }}>${totalSpent?.toFixed(2) || '0.00'}</span>
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
  }

  const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    const newPage = pagination.current || 1
    const newPageSize = pagination.pageSize || 10

    navigate({
      pathname: '/customers',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  return (
    <PermissionGuard permission={PERMISSIONS.VIEW_CUSTOMER}>
      <div>
        <Title level={2}>Customer Management</Title>

        <Card style={{ marginBottom: 16 }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Search
              placeholder='Search customers...'
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
            dataSource={customersData?.docs || []}
            loading={isLoading}
            rowKey='_id'
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: customersData?.totalDocs || 0,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`,
              pageSizeOptions: ['10', '20', '50'],
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
            }}
          />
        </Card>

        {error && (
          <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
            <Typography.Text type='danger'>Error loading customers. Please try again.</Typography.Text>
          </Card>
        )}
      </div>
    </PermissionGuard>
  )
}

export default CustomerPage
