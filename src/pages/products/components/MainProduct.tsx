import { Card, message, Result, Spin, Table, Tabs, type TabsProps } from 'antd'

import { useQueryParams } from '@/hooks/useQueryParams'
import { useGetProductsQuery, useUpdateProductMutation } from '@/services/product.service'
import type { Product } from '@/types/product.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { renderColumnProduct } from './tables/Columns'

const MainProduct = () => {
  const navigate = useNavigate()

  const params = useQueryParams()
  const { deleted, page, limit, active } = params

  // get products
  const { data, isLoading, isError } = useGetProductsQuery(params)
  const products = data?.docs || []

  // update product
  const [updateProduct] = useUpdateProductMutation()

  // handle
  const handleTabChange = (key: string) => {
    let newParams = {}
    switch (key) {
      case 'active':
        newParams = {
          active: true,
          delete: false
        }
        break
      case 'inactive':
        newParams = {
          active: false,
          delete: false
        }
        break
      case 'deleted':
        newParams = {
          delete: true
        }
        break
      default:
        newParams = {}
        break
    }
    newParams = {
      ...newParams,
      page: page,
      limit: limit
    }

    navigate({
      pathname: '/products',
      search: createSearchParams(newParams).toString()
    })
  }

  // handle update product
  const handleUpdateProduct = async (product: Product) => {
    try {
      await updateProduct(product).unwrap()
      message.success('Cập nhật sản phẩm thành công')
    } catch (error) {
      console.log('🚀 ~ handleUpdateProduct ~ error:', error)
    }
  }

  const isActive = active === 'true' && deleted === 'false'
  const isInactive = active === 'false' && deleted === 'false'

  const columns = renderColumnProduct(products, params, handleUpdateProduct)

  const tabs: TabsProps['items'] = [
    {
      key: 'active',
      label: <p>Sản phẩm hoạt động</p>,
      children: <Table dataSource={products} columns={columns} rowKey='_id' />
    },
    {
      key: 'inactive',
      label: <p>Sản phẩm không hoạt động</p>,
      children: <Table dataSource={products} columns={columns} rowKey='_id' />
    },
    {
      key: 'deleted',
      label: <p>Sản phẩm đã xoá</p>,
      children: <Table dataSource={products} columns={columns} rowKey='_id' />
    }
  ]

  if (isLoading) {
    return <Spin />
  }

  if (isError) {
    return <Result status='error' title='Lỗi' subTitle='Lỗi khi tải sản phẩm' />
  }

  return (
    <Card>
      <Tabs
        items={tabs}
        defaultActiveKey={isActive ? 'active' : isInactive ? 'inactive' : 'deleted'}
        onChange={handleTabChange}
      />
    </Card>
  )
}

export default MainProduct
