import type { VarianSize, Variant } from '@/types/product.type'

import { formatCurrency } from '@/utils/fomat-currency.util'
import type { ColumnsType } from 'antd/es/table'

export const renderColumnVariant = (variants: Variant[]) => {
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
