import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import { useGetCategoriesQuery } from '@/services/category.service'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Space, Table, Tag, Typography } from 'antd'
import { useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

const { Title } = Typography
const { Search } = Input

const CategoriesPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10
  const [search, setSearch] = useState<string>('')

  const { permissions } = useCurrentUserPermissions()
  console.log('🚀 ~ CategoriesPage ~ permissions:', permissions)

  const {
    data: categoriesData,
    isLoading,
    error
  } = useGetCategoriesQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <p>{name}</p>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => <span style={{ color: '#666' }}>{description || 'No description'}</span>
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => <img src={thumbnail} alt='thumbnail' style={{ width: '100px', height: '100px' }} />
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
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      hidden: !permissions.includes(PERMISSIONS.UPDATE_CATEGORY) && !permissions.includes(PERMISSIONS.DELETE_CATEGORY),
      render: (_, record) => (
        <Space>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_CATEGORY}>
            <Button type='dashed' size='large'>
              <EditOutlined />
            </Button>
          </PermissionGuard>

          <PermissionGuard perrmission={PERMISSIONS.DELETE_CATEGORY}>
            <Button danger size='large'>
              <DeleteOutlined />
            </Button>
          </PermissionGuard>
        </Space>
      )
    }
  ]

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

  return (
    <div>
      <Title level={2}>Quản lý danh mục</Title>

      <Card style={{ marginBottom: 16 }}>
        <Space direction='horizontal' style={{ width: '100%' }} className='flex items-center justify-between'>
          <Search
            placeholder='Search category...'
            allowClear
            enterButton={<SearchOutlined />}
            size='large'
            // onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />

          <PermissionGuard perrmission={PERMISSIONS.CREATE_CATEGORY}>
            <Button type='primary' size='large'>
              Thêm mới
            </Button>
          </PermissionGuard>
        </Space>
      </Card>

      <Card>
        <PermissionGuard perrmission={PERMISSIONS.GET_ALL_CATEGORIES}>
          <Table
            columns={columns}
            dataSource={categoriesData?.docs || []}
            loading={isLoading}
            rowKey='_id'
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: categoriesData?.totalDocs || 0,
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
    </div>
  )
}

export default CategoriesPage
