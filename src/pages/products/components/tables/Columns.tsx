import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Image, Space, Table, Tag, Tooltip, Typography } from 'antd'

import { cn } from '@/lib/utils'
import type { Product } from '@/types/product.type'
import { filterColor } from '@/utils/filter-color'
import { formatCurrency } from '@/utils/fomat-currency.util'
import type { ColumnsType } from 'antd/es/table'
import { renderColumnVariant } from './ColumnVariants'

export const renderColumnProduct = (products: Product[]) => {
  const columns: ColumnsType<Product> = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, row: Product) => {
        return (
          <Space>
            <Image src={row.thumbnail} alt={name} className='!w-[80px] !h-[100px] !object-cover !rounded-md' />
            <Space direction='vertical'>
              <p className='!truncate !w-[300px] text-lg font-medium'>{name}</p>
              <p className={cn('!truncate', { 'line-through': row.discountPrice > 0 })}>{formatCurrency(row.price)}</p>
              <p className='!truncate'>{row.discountPrice > 0 && <>{formatCurrency(row.discountPrice)}</>}</p>
            </Space>
          </Space>
        )
      }
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: Product['category']) => {
        return category.name
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Hoạt động' : 'Không hoạt động'}</Tag>
      )
    },
    {
      title: 'Màu sắc',
      dataIndex: 'variants',
      key: 'variants',
      render: (variants: Product['variants']) => {
        return (
          <Space direction='horizontal' size={1}>
            {variants.map((variant) => (
              <Tooltip
                color={'#fff'}
                title={
                  <Space direction='vertical' size={1}>
                    <Typography.Title level={5}>Màu sắc: {variant.color}</Typography.Title>
                    <Table
                      dataSource={variant.sizes}
                      columns={renderColumnVariant(variants)}
                      pagination={false}
                      rowKey={'_id'}
                      size='small'
                    />
                  </Space>
                }
              >
                <Tag
                  color={filterColor(variant.color)}
                  style={{ height: '24px', width: '24px', borderRadius: '100%', cursor: 'pointer' }}
                />
              </Tooltip>
            ))}
          </Space>
        )
      }
    },
    {
      title: null,
      dataIndex: 'actice',
      key: 'action',
      render: (_: unknown, row: Product) => {
        return (
          <Space direction='horizontal'>
            <Button size='small' icon={<EditOutlined />} type='dashed'></Button>
            <Button size='small' icon={<DeleteOutlined />} type='primary' danger></Button>
          </Space>
        )
      }
    }
  ]

  return columns
}
