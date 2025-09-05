import { Card, Result, Spin, Table, Tabs, type TabsProps } from 'antd'

import { useQueryParams } from '@/hooks/useQueryParams'
import { useGetProductsQuery } from '@/services/product.service'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { renderColumnProduct } from './tables/Columns'

const MainProduct = () => {
  const navigate = useNavigate()

  const params = useQueryParams()
  const { deleted, page, limit, active } = params

  const { data, isLoading, isError } = useGetProductsQuery(params)
  const products = data?.docs || []

  const columns = renderColumnProduct(products, params)

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

  const isActive = active === 'true' && deleted === 'false'
  const isInactive = active === 'false' && deleted === 'false'

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
