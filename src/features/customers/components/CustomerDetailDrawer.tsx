import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useGetCustomerByIdQuery } from '@/services/customer.service'
import { HeartOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Descriptions, Drawer, Spin, Tag, Typography } from 'antd'

const { Text, Title } = Typography

interface CustomerDetailDrawerProps {
  open: boolean
  onClose: () => void
  customerId: string | null
  onViewWishlist: (customerId: string) => void
}

const CustomerDetailDrawer = ({ open, onClose, customerId, onViewWishlist }: CustomerDetailDrawerProps) => {
  const {
    data: customer,
    isLoading,
    error
  } = useGetCustomerByIdQuery(
    { id: customerId || '' },
    {
      skip: !customerId || !open
    }
  )

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserOutlined style={{ color: '#1890ff' }} />
          <span>Customer Details</span>
        </div>
      }
      open={open}
      onClose={onClose}
      width={600}
      footer={
        <div style={{ textAlign: 'right' }}>
          {customer && (
            <PermissionGuard perrmission={PERMISSIONS.VIEW_CUSTOMER_WISHLIST}>
              <Button
                type='primary'
                icon={<HeartOutlined />}
                onClick={() => onViewWishlist(customer._id)}
                style={{ marginRight: 8 }}
              >
                View Wishlist
              </Button>
            </PermissionGuard>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      }
    >
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size='large' />
          <div style={{ marginTop: 16 }}>
            <Text type='secondary'>Loading customer details...</Text>
          </div>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type='danger'>Failed to load customer details</Text>
        </div>
      ) : customer ? (
        <div>
          <Descriptions title={<Title level={4}>{customer.fullName}</Title>} column={1} bordered>
            <Descriptions.Item label='Full Name'>
              <Text strong>{customer.fullName}</Text>
            </Descriptions.Item>

            <Descriptions.Item label='Email'>
              <Text copyable>{customer.email}</Text>
            </Descriptions.Item>

            <Descriptions.Item label='Phone Number'>
              <Text copyable>{customer.phone}</Text>
            </Descriptions.Item>

            <Descriptions.Item label='Verification Status'>
              <Tag color={customer.isVerified ? 'green' : 'red'}>
                {customer.isVerified ? 'Verified' : 'Not Verified'}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label='Total Orders'>
              <Tag color='blue'>{customer.totalOrders} orders</Tag>
            </Descriptions.Item>

            <Descriptions.Item label='Total Spent'>
              <Text strong style={{ color: '#059669' }}>
                {customer.totalSpent.toLocaleString('vi-VN')} ₫
              </Text>
            </Descriptions.Item>

            <Descriptions.Item label='Created At'>
              <Text>{new Date(customer.createdAt).toLocaleString('vi-VN')}</Text>
            </Descriptions.Item>

            <Descriptions.Item label='Last Updated'>
              <Text>{new Date(customer.updatedAt).toLocaleString('vi-VN')}</Text>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text type='secondary'>No customer data available</Text>
        </div>
      )}
    </Drawer>
  )
}

export default CustomerDetailDrawer
