import { Button, Card, Drawer, Form, Input, Space, Table, Typography, message } from 'antd'
import { PERMISSIONS, PermissionGuard } from '@/utils/permissions-guard'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useCreatePermissionMutation, useGetPermissionsQuery } from '../../services/permission.service'

import { useState } from 'react'

const { Title } = Typography
const { Search } = Input
const { TextArea } = Input

const PermissionPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [form] = Form.useForm()

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
    { refetchOnMountOrArgChange: true }
  )

  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation()

  const columns = [
    {
      title: 'Permission Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span style={{ fontWeight: '500', color: '#1f2937' }}>{name}</span>
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
      render: (slug: string) => <span style={{ color: '#666', fontSize: '12px', fontFamily: 'monospace' }}>{slug}</span>
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
      pathname: '/permissions',
      search: createSearchParams({
        page: newPage.toString(),
        limit: newPageSize.toString()
      }).toString()
    })
  }

  const handleCreatePermission = async (values: { name: string; description: string }) => {
    try {
      await createPermission(values).unwrap()
      message.success('Tạo quyền hạn thành công!')
      setDrawerVisible(false)
      form.resetFields()
      // Refetch the permissions list
      window.location.reload()
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo quyền hạn. Vui lòng thử lại!')
    }
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
    form.resetFields()
  }

  return (
    <div>
      <Title level={2}>Permission Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder='Search permissions...'
              allowClear
              enterButton={<SearchOutlined />}
              size='large'
              onSearch={handleSearch}
              style={{ maxWidth: 400 }}
            />
            <PermissionGuard permission={PERMISSIONS.CREATE_PERMISSION}>
              <Button type='primary' icon={<PlusOutlined />} onClick={showDrawer} size='large'>
                Thêm mới permissions
              </Button>
            </PermissionGuard>
          </Space>
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
            showQuickJumper: true,
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

      <PermissionGuard permission={PERMISSIONS.CREATE_PERMISSION}>
        <Drawer
          title='Thêm mới quyền hạn'
          width={520}
          onClose={onClose}
          open={drawerVisible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Hủy</Button>
              <Button onClick={() => form.submit()} type='primary' loading={isCreating}>
                Tạo quyền hạn
              </Button>
            </Space>
          }
        >
          <Form form={form} layout='vertical' onFinish={handleCreatePermission} requiredMark={false}>
            <Form.Item
              name='name'
              label='Tên quyền hạn'
              rules={[
                { required: true, message: 'Vui lòng nhập tên quyền hạn!' },
                { min: 2, message: 'Tên quyền hạn phải có ít nhất 2 ký tự!' }
              ]}
            >
              <Input placeholder='Nhập tên quyền hạn (ví dụ: create_user, view_products)' />
            </Form.Item>

            <Form.Item
              name='description'
              label='Mô tả'
              rules={[
                { required: true, message: 'Vui lòng nhập mô tả!' },
                { min: 5, message: 'Mô tả phải có ít nhất 5 ký tự!' }
              ]}
            >
              <TextArea rows={4} placeholder='Nhập mô tả chi tiết về quyền hạn này' />
            </Form.Item>
          </Form>
        </Drawer>
      </PermissionGuard>
    </div>
  )
}

export default PermissionPage
