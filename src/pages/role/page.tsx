import { CreateRole, RoleDetailDrawer } from '@/features/role'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Space, Table, Tag, Typography, message } from 'antd'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteRoleMutation, useGetRolesQuery } from '../../services/role.service'

import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import type { Role } from '@/types/role.type'
import { useState } from 'react'

const { Title } = Typography
const { Search } = Input

const RolePage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [open, setOpen] = useState(false)
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const {
    data: rolesData,
    isLoading,
    error
  } = useGetRolesQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const [deleteRole] = useDeleteRoleMutation()

  const handleDeleteRole = (role: Role) => {
    Modal.confirm({
      title: 'Delete Role',
      content: `Are you sure you want to delete "${role.name}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteRole({ id: role._id }).unwrap()
          message.success('Role deleted successfully!')
        } catch (error: unknown) {
          console.error('Error deleting role:', error)
          message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to delete role')
        }
      }
    })
  }

  const handleViewRoleDetail = (role: Role) => {
    setSelectedRoleId(role._id)
    setDetailDrawerOpen(true)
  }

  const handleDetailDrawerClose = () => {
    setDetailDrawerOpen(false)
    setSelectedRoleId(null)
  }

  const handleEditRole = (role: Role) => {
    setSelectedRoleId(role._id)
    setDetailDrawerOpen(true)
  }

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Role) => (
        <Button
          type='link'
          style={{ padding: 0, height: 'auto', fontWeight: '500', color: '#1f2937' }}
          onClick={() => handleViewRoleDetail(record)}
        >
          <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
            {name}
          </Tag>
        </Button>
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
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 120,
      render: (_: unknown, record: Role) => (
        <Space size='small'>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_ROLE}>
            <Button type='dashed' size='small' onClick={() => handleEditRole(record)} title='Edit Role'>
              <EditOutlined />
            </Button>
          </PermissionGuard>

          <PermissionGuard perrmission={PERMISSIONS.DELETE_ROLE}>
            <Button danger size='small' onClick={() => handleDeleteRole(record)} title='Delete Role'>
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
      pathname: '/roles',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Title level={2}>Role Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='horizontal' style={{ width: '100%' }} className='flex items-center justify-between'>
          <Search
            placeholder='Search roles...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />

          <PermissionGuard perrmission={PERMISSIONS.CREATE_ROLE}>
            <Button onClick={showDrawer} type='primary' size='large'>
              Thêm mới
            </Button>
          </PermissionGuard>
        </Space>
      </Card>

      <Card>
        <PermissionGuard perrmission={PERMISSIONS.VIEW_ROLES}>
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
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
            }}
          />
        </PermissionGuard>
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Error loading roles. Please try again.</Typography.Text>
        </Card>
      )}

      {/* drawer create role */}
      <CreateRole open={open} onClose={onClose} />

      {/* drawer role detail */}
      <RoleDetailDrawer open={detailDrawerOpen} onClose={handleDetailDrawerClose} roleId={selectedRoleId} />
    </div>
  )
}

export default RolePage
