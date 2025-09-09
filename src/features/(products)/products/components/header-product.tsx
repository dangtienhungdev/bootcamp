import { Button, Card, Input, Space } from 'antd'

import { Link } from 'react-router-dom'

const HeaderProduct = () => {
  return (
    <Card className='!mb-10'>
      <Space direction='horizontal' className='!flex justify-between'>
        <Input.Search size='large' allowClear placeholder='Tìm kiếm sản phẩm...' />

        <Link to='/products/create'>
          <Button type='primary' size='large'>
            Thêm mới sản phẩm
          </Button>
        </Link>
      </Space>
    </Card>
  )
}

export default HeaderProduct
