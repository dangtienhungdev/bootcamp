import { Card, Input, Space, Table, Tag, Typography } from 'antd'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useGetCustomersQuery } from '../../services/customer.service'

const { Title } = Typography
const { Search } = Input

const CustomerPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageSize, setPageSize] = useState(10)

  const {
    data: customersData,
    isLoading,
    error
  } = useGetCustomersQuery(
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
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => <span style={{ fontWeight: '500', color: '#1f2937' }}>{fullName}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <span style={{ color: '#374151' }}>{email}</span>
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => <span style={{ color: '#374151' }}>{phone}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? 'green' : 'red'} style={{ fontSize: '12px', padding: '2px 6px' }}>
          {isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
        </Tag>
      )
    },
    {
      title: 'Tổng đơn hàng',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: (totalOrders: number) => (
        <Tag color='blue' style={{ fontSize: '12px', padding: '2px 6px' }}>
          {totalOrders} đơn
        </Tag>
      )
    },
    {
      title: 'Tổng chi tiêu',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (totalSpent: number) => (
        <span style={{ color: '#059669', fontWeight: '500' }}>{totalSpent.toLocaleString('vi-VN')} ₫</span>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => (
        <span style={{ color: '#666', fontSize: '12px' }}>{new Date(createdAt).toLocaleDateString('vi-VN')}</span>
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
      pathname: '/customers',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  return (
    <div>
      <Title level={2}>Quản lý khách hàng</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Search
            placeholder='Tìm kiếm khách hàng...'
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
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khách hàng`,
            pageSizeOptions: ['10', '20', '50'],
            onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
          }}
        />
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Lỗi khi tải danh sách khách hàng. Vui lòng thử lại.</Typography.Text>
        </Card>
      )}
    </div>
  )
}

export default CustomerPage
