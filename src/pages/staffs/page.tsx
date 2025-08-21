import { Button, Card, Input, Modal, Space, Table, Tag, Typography, message } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { StaffFormDrawer, StaffUpdateDrawer } from './components'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteStaffMutation, useGetStaffsQuery } from '@/services/staff.service'

import type { ColumnsType } from 'antd/es/table'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import type { Staff } from '@/types/staff.type'
import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import { useState } from 'react'

const { Title } = Typography
const { Search } = Input

const StaffPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  const { permissions, isAdmin } = useCurrentUserPermissions()

  const {
    data: staffsData,
    isLoading,
    error
  } = useGetStaffsQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const [deleteStaff] = useDeleteStaffMutation()

  const handleCreateStaff = () => {
    setSelectedStaff(null)
    setDrawerOpen(true)
  }

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff)
    setUpdateDrawerOpen(true)
  }

  const handleDeleteStaff = (staff: Staff) => {
    Modal.confirm({
      title: 'Delete Staff',
      content: `Are you sure you want to delete "${staff.fullName}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteStaff({ id: staff._id }).unwrap()
          message.success('Staff deleted successfully!')
        } catch (error: unknown) {
          console.error('Error deleting staff:', error)
          message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to delete staff')
        }
      }
    })
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedStaff(null)
  }

  const handleUpdateDrawerClose = () => {
    setUpdateDrawerOpen(false)
    setSelectedStaff(null)
  }

  const handleDrawerSuccess = () => {
    // RTK Query will automatically refetch due to cache invalidation
  }

  const columns: ColumnsType<Staff> = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      fixed: 'left',
      render: (fullName: string) => <span style={{ fontWeight: '500', color: '#1f2937' }}>{fullName}</span>
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
      title: 'Mã nhân viên',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 120,
      render: (employeeId: string) => (
        <Tag color='blue' style={{ fontSize: '12px', padding: '2px 6px' }}>
          {employeeId}
        </Tag>
      )
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      width: 150,
      responsive: ['lg'],
      render: (position: string | null) => <span style={{ color: '#374151' }}>{position || 'Chưa cập nhật'}</span>
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 150,
      responsive: ['md'],
      render: (department: string | null) => <span style={{ color: '#374151' }}>{department || 'Chưa cập nhật'}</span>
    },
    {
      title: 'Trạng thái xác thực',
      dataIndex: 'isVerified',
      key: 'isVerified',
      width: 120,
      responsive: ['lg'],
      render: (isVerified: boolean) => (
        <Tag color={isVerified ? 'green' : 'red'} style={{ fontSize: '12px', padding: '2px 6px' }}>
          {isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
        </Tag>
      )
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      responsive: ['xl'],
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'} style={{ fontSize: '12px', padding: '2px 6px' }}>
          {isActive ? 'Đang hoạt động' : 'Đã khóa'}
        </Tag>
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
      width: 150,
      fixed: 'right',
      hidden:
        !isAdmin && !permissions.includes(PERMISSIONS.UPDATE_STAFF) && !permissions.includes(PERMISSIONS.DELETE_STAFF),
      render: (_: unknown, record: Staff) => (
        <Space size='small'>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_STAFF}>
            <Button type='dashed' size='small' onClick={() => handleEditStaff(record)} title='Edit Staff'>
              <EditOutlined />
            </Button>
          </PermissionGuard>

          <PermissionGuard perrmission={PERMISSIONS.DELETE_STAFF}>
            <Button danger size='small' onClick={() => handleDeleteStaff(record)} title='Delete Staff'>
              <DeleteOutlined />
            </Button>
          </PermissionGuard>
        </Space>
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
      pathname: '/staffs',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  return (
    <div>
      <Title level={2}>Quản lý nhân viên</Title>

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
            placeholder='Tìm kiếm nhân viên...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />

          <Space>
            <PermissionGuard perrmission={PERMISSIONS.CREATE_STAFF}>
              <Button type='primary' size='large' onClick={handleCreateStaff}>
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
        <PermissionGuard perrmission={PERMISSIONS.VIEW_STAFF}>
          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              minWidth: '100%'
            }}
          >
            <Table
              columns={columns}
              dataSource={staffsData?.docs || []}
              loading={isLoading}
              rowKey='_id'
              scroll={{ x: 1200, y: 500 }}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: staffsData?.totalDocs || 0,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} nhân viên`,
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
          <Typography.Text type='danger'>Lỗi khi tải danh sách nhân viên. Vui lòng thử lại.</Typography.Text>
        </Card>
      )}

      <StaffFormDrawer open={drawerOpen} onClose={handleDrawerClose} onSuccess={handleDrawerSuccess} />

      <StaffUpdateDrawer
        open={updateDrawerOpen}
        onClose={handleUpdateDrawerClose}
        staff={selectedStaff}
        onSuccess={handleDrawerSuccess}
      />
    </div>
  )
}

export default StaffPage
