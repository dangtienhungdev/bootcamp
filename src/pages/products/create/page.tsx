import { Button, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd'
import { useCallback, useMemo, useState } from 'react'

import { useGetCategoriesQuery } from '@/services/category.service'
import { ChevronDown } from 'lucide-react'
import { useDebounceValue } from 'usehooks-ts'

const CreateProductPage = () => {
  const [form] = Form.useForm()

  const [searchCategoty, setSearchCategoty] = useState<string>('')
  const [debouncedSearchCategory] = useDebounceValue(searchCategoty, 1000)

  const onFinish = (values: any) => {
    console.log('Form values:', values)
  }

  // call api get categories
  const { data: categories } = useGetCategoriesQuery({
    limit: 10,
    search: debouncedSearchCategory
  })

  // useCallback/useMemo
  const categorieOptions = useMemo(
    () =>
      categories?.docs.map((category) => ({
        value: category._id,
        label: category.name
      })) || [],
    [categories?.docs]
  )
  console.log('🚀 ~ CreateProductPage ~ categorieOptions:', categorieOptions)

  const handleSearchCategory = useCallback((value: string) => {
    setSearchCategoty(value)
  }, [])

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
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

        <Col span={12}>
          <Form.Item name='price' label='Giá' rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <InputNumber style={{ width: '100%' }} placeholder='Nhập giá' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='discountPrice' label='Giảm giá'>
            <InputNumber style={{ width: '100%' }} placeholder='Nhập giảm giá' />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name='discountPrice' label='Giảm giá'>
            <Select
              showSearch
              placeholder='Chọn danh mục'
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={categorieOptions}
              suffixIcon={<ChevronDown />}
              onSearch={handleSearchCategory}
            />
          </Form.Item>
        </Col>

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
