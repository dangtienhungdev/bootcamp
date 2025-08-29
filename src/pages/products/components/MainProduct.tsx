import { Card, Table, Tabs, type TabsProps } from 'antd'

import { useGetProductsQuery } from '@/services/product.service'
import type { ParamProduct } from '@/types/product.type'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { renderColumnProduct } from './tables/Columns'

const MainProduct = () => {
  const navigate = useNavigate()

  const [params] = useSearchParams()
  const active = params.get('active')
  const deleted = params.get('delete')
  const page = Number(params.get('page')) || 1
  const limit = Number(params.get('limit')) || 10

  const paramsProduct: ParamProduct =
    deleted === 'true'
      ? {
          delete: deleted,
          limit,
          page
        }
      : {
          active,
          limit,
          delete: deleted,
          page
        }

  const { data, isLoading, error } = useGetProductsQuery(paramsProduct)
  const products = data?.docs || []

  const columns = renderColumnProduct(products)

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
