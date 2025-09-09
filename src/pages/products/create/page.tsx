import { Col, Form, Input, Row, Typography } from 'antd'

const CreateProductPage = () => {
  const onFinish = (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values)
  }

  return (
    <div>
      <Typography.Title level={2}>Thêm sản phẩm</Typography.Title>

      <Form onFinish={onFinish} layout='vertical' autoComplete='off'>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Tên sản phẩm'} name={'name'}>
              <Input placeholder={'Nhập tên sản phẩm'} size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Tên sản phẩm'} name={'name'}>
              <Input placeholder={'Nhập tên sản phẩm'} size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Tên sản phẩm'} name={'name'}>
              <Input placeholder={'Nhập tên sản phẩm'} size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Tên sản phẩm'} name={'name'}>
              <Input placeholder={'Nhập tên sản phẩm'} size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Tên sản phẩm'} name={'name'}>
              <Input placeholder={'Nhập tên sản phẩm'} size='large' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CreateProductPage

/*
"name": "string", -> input
"description": "string", -> textarea
"price": 0, -> input number
"discountPrice": 0, -> input number
"isActive": false, -> switch

name(12) | isActive(12)
price(12) | discountPrice(12)
description (24)

*/
