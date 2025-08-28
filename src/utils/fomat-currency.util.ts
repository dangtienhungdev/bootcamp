export const formatCurrency = (value: number | string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(Number(value))
}
