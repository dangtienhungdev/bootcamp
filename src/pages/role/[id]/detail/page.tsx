import { Button, Card, Descriptions, Space, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useGetRoleByIdQuery } from '../../../../services/role.service'

const { Title } = Typography

const RoleDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: role,
    isLoading,
    error
  } = useGetRoleByIdQuery(id || '', {
    skip: !id
  })

  const handleBack = () => {
    navigate('/roles')
  }

  if (isLoading) {
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Quay lại
          </Button>
        </Space>
        <Title level={2}>Role Detail</Title>
        <Card>
          <div>Loading...</div>
        </Card>
      </div>
    )
  }

  if (error || !role) {
    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Quay lại
          </Button>
        </Space>
        <Title level={2}>Role Detail</Title>
        <Card>
          <div>Error loading role details. Please try again.</div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Quay lại
        </Button>
      </Space>

      <Title level={2}>Role Detail</Title>

      <Space direction='vertical' style={{ width: '100%' }} size='large'>
        <Card title='Basic Information'>
          <Descriptions column={1}>
            <Descriptions.Item label='Role Name'>
              <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
                {role.name}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Slug'>
              <Tag color='orange' style={{ fontSize: '12px', padding: '2px 6px' }}>
                {role.slug}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Description'>{role.description || 'No description'}</Descriptions.Item>
            <Descriptions.Item label='Created At'>
              {new Date(role.createdAt).toLocaleDateString('vi-VN')}
            </Descriptions.Item>
            <Descriptions.Item label='Updated At'>
              {new Date(role.updatedAt).toLocaleDateString('vi-VN')}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={`Permissions (${role.permissions?.length || 0})`}>
          <Space wrap>
            {role.permissions?.map((permission) => (
              <Tag key={permission._id} color='green' style={{ fontSize: '12px', padding: '4px 8px' }}>
                {permission.name}
              </Tag>
            )) || <span>No permissions assigned</span>}
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default RoleDetailPage
