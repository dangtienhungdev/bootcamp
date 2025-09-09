import { Card, message, Result, Spin, Table, Tabs, type TabsProps } from 'antd'

import { useQueryParams } from '@/hooks/useQueryParams'
import { useGetProductsQuery, useSoftDeleteProductMutation, useUpdateProductMutation } from '@/services/product.service'
import type { Product } from '@/types/product.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { renderColumnProduct } from './tables'

const MainProduct = () => {
  const navigate = useNavigate()

  const params = useQueryParams()
  const { page, limit } = params
  params.delete = params.delete ? params.delete : 'false'
  params.active = params.active ? params.active : 'true'

  // get products
  const { data, isLoading, isError } = useGetProductsQuery(params)
  const products = data?.docs || []

  // update product
  const [updateProduct] = useUpdateProductMutation()
  // soft delete product
  const [softDeleteProduct] = useSoftDeleteProductMutation()

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
    // newParams = {
    //   ...newParams,
    //   page: 1,
    //   limit: 10
    // }

    navigate({
      pathname: '/products',
      search: createSearchParams({ ...newParams }).toString()
    })
  }

  // handle change page and limit
  const handleChangePageAndLimit = (page: string, limit: string) => {
    navigate({
      pathname: '/products',
      search: createSearchParams({ ...params, page: page, limit }).toString()
    })
  }

  // handle soft delete product
  const handleSoftDeleteProduct = async (id: string) => {
    try {
      await softDeleteProduct(id).unwrap()
      message.success('Xoá sản phẩm thành công')
    } catch (_) {
      message.error('Lỗi khi xoá sản phẩm')
    }
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

  const isActive = params.active === 'true' && params.delete === 'false'
  const isInactive = params.active === 'false' && params.delete === 'false'

  const columns = renderColumnProduct(products, params, handleUpdateProduct, handleSoftDeleteProduct)

  const tabsArray = [
    {
      key: 'active',
      label: <p>Sản phẩm hoạt động</p>
    },
    {
      key: 'inactive',
      label: <p>Sản phẩm không hoạt động</p>
    },
    {
      key: 'deleted',
      label: <p>Sản phẩm đã xoá</p>
    }
  ]

  const tabs: TabsProps['items'] = tabsArray.map((tab) => {
    return {
      key: tab.key,
      label: tab.label,
      children: (
        <Table
          dataSource={products}
          columns={columns}
          rowKey='_id'
          pagination={{
            size: 'small',
            current: Number(page) || 1,
            total: data?.totalDocs || 0,
            pageSize: Number(limit) || 10,
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} của ${total} sản phẩm`
            },
            pageSizeOptions: ['5', '10', '20', '50', '100'],
            showSizeChanger: true,
            onChange: (page, limit) => handleChangePageAndLimit(page.toString(), limit.toString())
          }}
        />
      )
    }
  })

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
