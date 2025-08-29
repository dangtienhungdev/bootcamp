import { Typography } from 'antd'

import HeaderProduct from './components/HeaderProduct'
import MainProduct from './components/MainProduct'

const ProductPage = () => {
  return (
    <div>
      <Typography.Title level={2}>Quản lý sản phẩm</Typography.Title>

      {/* header */}
      <HeaderProduct />

      {/* table */}
      <MainProduct />
    </div>
  )
}

export default ProductPage
