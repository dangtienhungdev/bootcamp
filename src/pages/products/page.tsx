import { Button, Card, Image, Input, Space, Table, Tag, Tooltip, Typography } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { Product, VarianSize, Variant } from '@/types/product.type'

import type { ColumnsType } from 'antd/es/table'
import { cn } from '@/lib/utils'
import { filterColor } from '@/utils/filter-color'
import { formatCurrency } from '@/utils/fomat-currency.util'
import { useGetProductsQuery } from '@/services/product.service'

const ProductPage = () => {
  const { data, isLoading, error } = useGetProductsQuery()
  console.log('🚀 ~ ProductPage ~ data:', data)
  const products = data?.docs || []

  const renderColumnVariant = (variants: Variant[]) => {
    const isCheckPriceDiscount = variants.some((variant) => variant.sizes.some((size) => size.price !== 0))

    const sizeColumns: ColumnsType<VarianSize> = [
      {
        title: 'Kích thước',
        dataIndex: 'size',
        key: 'size'
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity'
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        responsive: ['lg'],
        hidden: !isCheckPriceDiscount,
        render: (price: number) => <span>{formatCurrency(price)}</span>
      }
    ]

    return sizeColumns
  }

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

  return (
    <div>
      <Typography.Title level={2}>Quản lý sản phẩm</Typography.Title>

      {/* header */}
      <Card>
        <Space direction='horizontal' className='!flex justify-between'>
          <Input.Search size='large' allowClear placeholder='Tìm kiếm sản phẩm...' />
          <Button type='primary' size='large'>
            Thêm mới sản phẩm
          </Button>
        </Space>
      </Card>

      {/* table */}
      <Card>
        <Table dataSource={products} columns={columns} rowKey='_id' />
      </Card>
    </div>
  )
}

export default ProductPage
