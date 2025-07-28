import { Button, Card, Checkbox, Drawer, Form, Input, Space, Table, Tag, Typography, message } from 'antd'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useCreateRoleMutation, useGetRolesQuery } from '../../services/role.service'

import type { Role } from '@/types/role.type'
import { useDebounceValue } from 'usehooks-ts'
import { useGetPermissionsQuery } from '../../services/permission.service'
import { useState } from 'react'

const { Title } = Typography
const { Search } = Input
const { TextArea } = Input

const RolePage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  const [permissionSearch, setPermissionSearch] = useState('')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [form] = Form.useForm()

  // Debounce the permission search
  const [debouncedPermissionSearch] = useDebounceValue(permissionSearch, 500)

  const {
    data: rolesData,
    isLoading,
    error
  } = useGetRolesQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation()

  // Get permissions with search functionality
  const { data: permissionsData } = useGetPermissionsQuery(
    { search: debouncedPermissionSearch, page: 1, limit: 1000 },
    { refetchOnMountOrArgChange: true }
  )

  const columns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Role) => (
        <Link to={`/roles/${record._id}/detail`}>
          <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
            {name}
          </Tag>
        </Link>
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
  }

  const handlePermissionSearch = (value: string) => {
    setPermissionSearch(value)
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

  const handleCreateRole = async (values: { name: string; description: string; permissions: string[] }) => {
    try {
      await createRole(values).unwrap()
      message.success('Tạo vai trò thành công!')
      setDrawerVisible(false)
      form.resetFields()
      // Refetch the roles list
      window.location.reload()
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo vai trò. Vui lòng thử lại!')
    }
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
    form.resetFields()
    setPermissionSearch('') // Reset permission search when closing drawer
  }

  return (
    <div>
      <Title level={2}>Role Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder='Search roles...'
              allowClear
              enterButton={<SearchOutlined />}
              size='large'
              onSearch={handleSearch}
              style={{ maxWidth: 400 }}
            />
            <Button type='primary' icon={<PlusOutlined />} onClick={showDrawer} size='large'>
              Thêm mới roles
            </Button>
          </Space>
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
            onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
          }}
        />
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Error loading roles. Please try again.</Typography.Text>
        </Card>
      )}

      <Drawer
        title='Thêm mới vai trò'
        width={520}
        onClose={onClose}
        open={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={() => form.submit()} type='primary' loading={isCreating}>
              Tạo vai trò
            </Button>
          </Space>
        }
      >
        <Form form={form} layout='vertical' onFinish={handleCreateRole} requiredMark={false}>
          <Form.Item
            name='name'
            label='Tên vai trò'
            rules={[
              { required: true, message: 'Vui lòng nhập tên vai trò!' },
              { min: 2, message: 'Tên vai trò phải có ít nhất 2 ký tự!' }
            ]}
          >
            <Input placeholder='Nhập tên vai trò (ví dụ: admin, user)' />
          </Form.Item>

          <Form.Item
            name='description'
            label='Mô tả'
            rules={[
              { required: true, message: 'Vui lòng nhập mô tả!' },
              { min: 5, message: 'Mô tả phải có ít nhất 5 ký tự!' }
            ]}
          >
            <TextArea rows={4} placeholder='Nhập mô tả chi tiết về vai trò này' />
          </Form.Item>

          <Form.Item
            name='permissions'
            label='Quyền hạn'
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một quyền hạn!' }]}
          >
            <div style={{ marginBottom: '12px' }}>
              <Search
                placeholder='Tìm kiếm quyền hạn...'
                allowClear
                value={permissionSearch}
                onChange={(e) => handlePermissionSearch(e.target.value)}
                size='middle'
              />
            </div>
            <div
              style={{
                maxHeight: '300px',
                overflowY: 'auto',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '12px',
                backgroundColor: '#fafafa'
              }}
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    width: '100%'
                  }}
                >
                  {permissionsData?.docs?.map((permission) => (
                    <div key={permission._id}>
                      <Checkbox value={permission._id}>
                        <div style={{ marginLeft: '8px' }}>
                          <div style={{ fontWeight: '500', color: '#1f2937' }}>{permission.name}</div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                            {permission.description}
                          </div>
                        </div>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Checkbox.Group>
              {permissionsData?.docs?.length === 0 && (
                <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>Không tìm thấy quyền hạn nào</div>
              )}
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default RolePage
