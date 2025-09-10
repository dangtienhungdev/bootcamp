import { Form, Input, InputNumber, Switch, Button, Typography } from 'antd'
const CreateProductPage = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values)
  }

  return (
    <div>
      <Typography.Title level={2}>Thêm sản phẩm</Typography.Title>

      <Form form={form} layout='vertical' onFinish={onFinish} style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            name='name'
            label='Tên SP'
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder='Nhập tên sản phầm' autoComplete='off' />
          </Form.Item>

          <Form.Item name='isActive' label='Trạng thái' valuePropName='checked' style={{ flex: 1 }}>
            <Switch />
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            name='price'
            label='Giá'
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name='discountPrice' label='Giảm giá' style={{ flex: 1 }}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item name='description' label='Mô tả' style={{ width: '100%' }}>
          <Input.TextArea rows={4} placeholder='Nhập mô tả sp' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Form.Item>
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
