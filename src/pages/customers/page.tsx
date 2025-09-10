import { Button, Card, Input, Modal, Space, Table, Tag, Typography, message } from 'antd'
import {
  CustomerDetailDrawer,
  CustomerFormDrawer,
  CustomerUpdateDrawer,
  WishlistDrawer
} from '../../features/customers/components'
import { DeleteOutlined, EditOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteCustomerMutation, useGetCustomersQuery } from '@/services/customer.service'

import type { ColumnsType } from 'antd/es/table'
import type { Customer } from '@/types/customer.type'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import { useState } from 'react'

const { Title } = Typography
const { Search } = Input

const CustomerPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false)
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [wishlistCustomerId, setWishlistCustomerId] = useState<string | null>(null)

  const { permissions, isAdmin } = useCurrentUserPermissions()

  const {
    data: customersData,
    isLoading,
    error
  } = useGetCustomersQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const [deleteCustomer] = useDeleteCustomerMutation()

  const handleCreateCustomer = () => {
    setSelectedCustomer(null)
    setDrawerOpen(true)
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setUpdateDrawerOpen(true)
  }

  const handleViewCustomerDetail = (customer: Customer) => {
    setSelectedCustomerId(customer._id)
    setDetailDrawerOpen(true)
  }

  const handleDeleteCustomer = (customer: Customer) => {
    Modal.confirm({
      title: 'Delete Customer',
      content: `Are you sure you want to delete "${customer.fullName}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteCustomer({ id: customer._id }).unwrap()
          message.success('Customer deleted successfully!')
        } catch (error: unknown) {
          console.error('Error deleting customer:', error)
          message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to delete customer')
        }
      }
    })
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedCustomer(null)
  }

  const handleUpdateDrawerClose = () => {
    setUpdateDrawerOpen(false)
    setSelectedCustomer(null)
  }

  const handleDrawerSuccess = () => {
    // RTK Query will automatically refetch due to cache invalidation
  }

  const handleDetailDrawerClose = () => {
    setDetailDrawerOpen(false)
    setSelectedCustomerId(null)
  }

  const handleWishlistDrawerClose = () => {
    setWishlistDrawerOpen(false)
    setWishlistCustomerId(null)
  }

  const handleViewWishlist = () => {
    setWishlistCustomerId(null)
    setWishlistDrawerOpen(true)
  }

  const handleViewCustomerWishlist = (customerId: string) => {
    setWishlistCustomerId(customerId)
    setWishlistDrawerOpen(true)
  }

  const columns: ColumnsType<Customer> = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      fixed: 'left',
      render: (fullName: string, record: Customer) => (
        <Button
          type='link'
          style={{ padding: 0, height: 'auto', fontWeight: '500', color: '#1f2937' }}
          onClick={() => handleViewCustomerDetail(record)}
        >
          {fullName}
        </Button>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      ellipsis: true,
      responsive: ['md'],
      render: (email: string) => <span style={{ color: '#374151' }}>{email}</span>
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      responsive: ['lg'],
      render: (phone: string) => <span style={{ color: '#374151' }}>{phone}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isVerified',
      key: 'isVerified',
      width: 100,
      responsive: ['md'],
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
      width: 120,
      responsive: ['lg'],
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
      width: 130,
      responsive: ['xl'],
      render: (totalSpent: number) => (
        <span style={{ color: '#059669', fontWeight: '500' }}>{totalSpent.toLocaleString('vi-VN')} ₫</span>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      responsive: ['xl'],
      render: (createdAt: string) => (
        <span style={{ color: '#666', fontSize: '12px' }}>{new Date(createdAt).toLocaleDateString('vi-VN')}</span>
      )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      fixed: 'right',
      hidden:
        !isAdmin &&
        !permissions.includes(PERMISSIONS.UPDATE_CUSTOMER) &&
        !permissions.includes(PERMISSIONS.DELETE_CUSTOMER) &&
        !permissions.includes(PERMISSIONS.VIEW_CUSTOMER_WISHLIST),
      render: (_: unknown, record: Customer) => {
        return (
          <Space size='small'>
            <PermissionGuard perrmission={PERMISSIONS.VIEW_CUSTOMER_WISHLIST}>
              <Button
                type='default'
                size='small'
                onClick={() => handleViewCustomerWishlist(record._id)}
                icon={<HeartOutlined />}
                title='View Wishlist'
              />
            </PermissionGuard>

            <PermissionGuard perrmission={PERMISSIONS.UPDATE_CUSTOMER}>
              <Button type='dashed' size='small' onClick={() => handleEditCustomer(record)} title='Edit Customer'>
                <EditOutlined />
              </Button>
            </PermissionGuard>

            <PermissionGuard perrmission={PERMISSIONS.DELETE_CUSTOMER}>
              <Button danger size='small' onClick={() => handleDeleteCustomer(record)} title='Delete Customer'>
                <DeleteOutlined />
              </Button>
            </PermissionGuard>
          </Space>
        )
      }
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

      <Card
        style={{
          overflow: 'hidden',
          marginBottom: 16
        }}
        bodyStyle={{
          overflow: 'auto'
        }}
      >
        <Space direction='horizontal' style={{ width: '100%' }} className='flex items-center justify-between'>
          <Search
            placeholder='Tìm kiếm khách hàng...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />

          <Space>
            <PermissionGuard perrmission={PERMISSIONS.CREATE_CUSTOMER}>
              <Button type='primary' size='large' onClick={handleCreateCustomer}>
                Thêm mới
              </Button>
            </PermissionGuard>
          </Space>
        </Space>
      </Card>

      <Card
        style={{
          overflow: 'hidden',
          marginBottom: 16
        }}
        bodyStyle={{
          overflow: 'auto',
          paddingBottom: '8px'
        }}
      >
        <PermissionGuard perrmission={PERMISSIONS.GET_ALL_CUSTOMERS}>
          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              minWidth: '100%'
            }}
          >
            <Table
              columns={columns}
              dataSource={customersData?.docs || []}
              loading={isLoading}
              rowKey='_id'
              scroll={{ x: 1200, y: 500 }}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: customersData?.totalDocs || 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khách hàng`,
                pageSizeOptions: ['10', '20', '50'],
                onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize }),
                responsive: true
              }}
              style={{
                minWidth: '100%'
              }}
            />
          </div>
        </PermissionGuard>
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Lỗi khi tải danh sách khách hàng. Vui lòng thử lại.</Typography.Text>
        </Card>
      )}

      <CustomerFormDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        customer={selectedCustomer}
        onSuccess={handleDrawerSuccess}
      />

      <CustomerUpdateDrawer
        open={updateDrawerOpen}
        onClose={handleUpdateDrawerClose}
        customer={selectedCustomer}
        onSuccess={handleDrawerSuccess}
      />

      <CustomerDetailDrawer
        open={detailDrawerOpen}
        onClose={handleDetailDrawerClose}
        customerId={selectedCustomerId}
        onViewWishlist={handleViewCustomerWishlist}
      />

      <WishlistDrawer open={wishlistDrawerOpen} onClose={handleWishlistDrawerClose} customerId={wishlistCustomerId} />
    </div>
  )
}

export default CustomerPage
