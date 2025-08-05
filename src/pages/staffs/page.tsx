import { Card, Input, Space, Table, Tag, Typography } from 'antd'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useGetStaffsQuery } from '../../services/staff.service'

const { Title } = Typography
const { Search } = Input

const StaffPage = () => {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const currentPage = Number(queryParams.get('page')) || 1
  const pageSize = Number(queryParams.get('limit')) || 10

  const [search, setSearch] = useState('')

  const {
    data: staffsData,
    isLoading,
    error
  } = useGetStaffsQuery(
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
      title: 'Mã nhân viên',
      dataIndex: 'employeeId',
      key: 'employeeId',
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
      render: (position: string | null) => <span style={{ color: '#374151' }}>{position || 'Chưa cập nhật'}</span>
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      render: (department: string | null) => <span style={{ color: '#374151' }}>{department || 'Chưa cập nhật'}</span>
    },
    {
      title: 'Trạng thái xác thực',
      dataIndex: 'isVerified',
      key: 'isVerified',
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
      render: (createdAt: string) => (
        <span style={{ color: '#666', fontSize: '12px' }}>{new Date(createdAt).toLocaleDateString('vi-VN')}</span>
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

      <Card style={{ marginBottom: 16 }}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Search
            placeholder='Tìm kiếm nhân viên...'
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
          dataSource={staffsData?.docs || []}
          loading={isLoading}
          rowKey='_id'
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: staffsData?.totalDocs || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} nhân viên`,
            pageSizeOptions: ['10', '20', '50'],
            onChange: (page, pageSize) => handleTableChange({ current: page, pageSize: pageSize })
          }}
        />
      </Card>

      {error && (
        <Card style={{ marginTop: 16, borderColor: '#ff4d4f' }}>
          <Typography.Text type='danger'>Lỗi khi tải danh sách nhân viên. Vui lòng thử lại.</Typography.Text>
        </Card>
      )}
    </div>
  )
}

export default StaffPage
