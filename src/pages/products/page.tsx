import { HeaderProduct, MainProduct } from '@/features/(products)/products'

import { Typography } from 'antd'

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
