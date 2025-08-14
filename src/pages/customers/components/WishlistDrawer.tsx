import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useGetCustomerWishlistQuery } from '@/services/customer.service'
import { HeartOutlined } from '@ant-design/icons'
import { Button, Drawer, Empty, List, Spin, Tag, Typography } from 'antd'

const { Text, Title } = Typography

interface WishlistDrawerProps {
  open: boolean
  onClose: () => void
}

const WishlistDrawer = ({ open, onClose }: WishlistDrawerProps) => {
  const {
    data: wishlistData,
    isLoading,
    error
  } = useGetCustomerWishlistQuery(undefined, {
    skip: !open
  })

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <HeartOutlined style={{ color: '#ff4d4f' }} />
          <span>Customer Wishlist</span>
        </div>
      }
      open={open}
      onClose={onClose}
      width={600}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose}>Close</Button>
        </div>
      }
    >
      <PermissionGuard perrmission={PERMISSIONS.VIEW_CUSTOMER_WISHLIST}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin size='large' />
            <div style={{ marginTop: 16 }}>
              <Text type='secondary'>Loading wishlist...</Text>
            </div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Text type='danger'>Failed to load wishlist</Text>
          </div>
        ) : wishlistData?.items && wishlistData.items.length > 0 ? (
          <div>
            <div style={{ marginBottom: 16 }}>
              <Text type='secondary'>Total items: {wishlistData.totalItems}</Text>
            </div>
            <List
              dataSource={wishlistData.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                      />
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong>{item.productName}</Text>
                        <Tag color='red' icon={<HeartOutlined />}>
                          Wishlist
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: 4 }}>
                          <Text type='secondary'>Price: </Text>
                          <Text strong style={{ color: '#1890ff' }}>
                            ${item.productPrice.toFixed(2)}
                          </Text>
                        </div>
                        <div>
                          <Text type='secondary'>Added: </Text>
                          <Text>{new Date(item.addedAt).toLocaleDateString()}</Text>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No items in wishlist' style={{ marginTop: 40 }} />
        )}
      </PermissionGuard>
    </Drawer>
  )
}

export default WishlistDrawer
