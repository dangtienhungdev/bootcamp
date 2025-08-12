import { Button, Card, Input, Space, Table, Tag, Typography } from 'antd'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useGetRolesQuery } from '../../services/role.service'
import CreateRole from './components/create-role'

const { Title } = Typography
const { Search } = Input

const RolePage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  // const [pageSize, setPageSize] = useState(10)

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
    // setCurrentPage(1) // Reset to first page when searching
  }

  const handleTableChange = (pagination: { current: number; pageSize: number }) => {
    const newPage = pagination.current || 1
    const newPageSize = pagination.pageSize || 10

    // setCurrentPage(newPage)
    // setPageSize(newPageSize)
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
    </div>
  )
}

export default RolePage
