import { Button, Card, Input, Space } from 'antd'

const HeaderProduct = () => {
  return (
    <Card className='!mb-10'>
      <Space direction='horizontal' className='!flex justify-between'>
        <Input.Search size='large' allowClear placeholder='Tìm kiếm sản phẩm...' />
        <Button type='primary' size='large'>
          Thêm mới sản phẩm
        </Button>
      </Space>
    </Card>
  )
}

export default HeaderProduct
