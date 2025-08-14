import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useCurrentUserPermissions } from '@/guard/use-current-user-permissions'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/services/category.service'
import type { Category } from '@/types/category.type'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Space, Table, Tag, Typography, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { CategoryFormDrawer } from './components'

const { Title } = Typography
const { Search } = Input

const CategoriesPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10
  const [search, setSearch] = useState<string>('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { permissions } = useCurrentUserPermissions()

  const {
    data: categoriesData,
    isLoading,
    error
  } = useGetCategoriesQuery({
    search,
    page: currentPage,
    limit: pageSize
  })

  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCreateCategory = () => {
    setSelectedCategory(null)
    setDrawerOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setDrawerOpen(true)
  }

  const handleDeleteCategory = (category: Category) => {
    Modal.confirm({
      title: 'Delete Category',
      content: `Are you sure you want to delete "${category.name}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteCategory({ id: category._id }).unwrap()
          message.success('Category deleted successfully!')
        } catch (error: unknown) {
          console.error('Error deleting category:', error)
          message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to delete category')
        }
      }
    })
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
    setSelectedCategory(null)
  }

  const handleDrawerSuccess = () => {
    // RTK Query will automatically refetch due to cache invalidation
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const columns: ColumnsType<Category> = [
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
      render: (_: unknown, record: Category) => (
        <Space>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_CATEGORY}>
            <Button type='dashed' size='large' onClick={() => handleEditCategory(record)}>
              <EditOutlined />
            </Button>
          </PermissionGuard>

          <PermissionGuard perrmission={PERMISSIONS.DELETE_CATEGORY}>
            <Button danger size='large' onClick={() => handleDeleteCategory(record)}>
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
      pathname: '/categories',
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
            onSearch={handleSearch}
            style={{ maxWidth: 400 }}
          />

          <PermissionGuard perrmission={PERMISSIONS.CREATE_CATEGORY}>
            <Button type='primary' size='large' onClick={handleCreateCategory}>
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
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} categories`,
              pageSizeOptions: ['10', '20', '50'],
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
            }}
          />
        </PermissionGuard>
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Error loading categories. Please try again.</Typography.Text>
        </Card>
      )}

      <CategoryFormDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        category={selectedCategory}
        onSuccess={handleDrawerSuccess}
      />
    </div>
  )
}

export default CategoriesPage
