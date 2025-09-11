import { Form, Input, InputNumber, Switch, Button, Row, Col } from 'antd'

const CreateProductPage = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Form values:', values)
  }

  return (
    <Form form={form} layout='vertical' onFinish={onFinish} style={{ maxWidth: 800, margin: '0 auto' }}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='name' label='Tên SP' rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input placeholder='Nhập tên sản phẩm' autoComplete='off' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='isActive' label='Trạng thái' valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name='price' label='Giá' rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='discountPrice' label='Giảm giá'>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name='description' label='Mô tả'>
            <Input.TextArea rows={4} placeholder='Nhập mô tả sp' />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Save
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
          Reset
        </Button>
      </Form.Item>
    </Form>
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
