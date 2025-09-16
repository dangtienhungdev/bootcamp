import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Switch } from 'antd'
import { ChevronDown, MinusCircle } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useDebounceValue } from 'usehooks-ts'
import { useGetCategoriesQuery } from '@/services/category.service'

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

  const handleSearchCategory = useCallback((value: string) => {
    setSearchCategoty(value)
  }, [])

  const filterOptions = useCallback((input: string, option: { value: string; label: string } | undefined) => {
    return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
              filterOption={filterOptions}
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

      <Row gutter={16}>
        <Col>
          <Form.Item label='Màu sắc và kích thước của sản phẩm'>
            <Form.List name='variants'>
              {(fields, { add, remove }) => {
                return (
                  <div className='flex flex-col gap-4'>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                        <Form.Item
                          {...restField}
                          name={[name, 'color']}
                          rules={[{ required: true, message: 'Trường màu sắc là bắt buộc' }]}
                          style={{ width: '100%' }}
                        >
                          <Input placeholder='Màu sắc' />
                        </Form.Item>

                        <MinusCircle onClick={() => remove(name)} />

                        <Form.List name={[name, 'sizes']}>
                          {(fieldsSizes, { add, remove }) => {
                            return (
                              <>
                                {fieldsSizes.map(({ key: keySizes, name: nameSizes, ...restFieldSizes }) => (
                                  <Space key={keySizes} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                                    <Form.Item
                                      {...restFieldSizes}
                                      name={[nameSizes, 'size']}
                                      rules={[{ required: true, message: 'Trường kích thước là bắt buộc' }]}
                                    >
                                      <Input placeholder='Kích thước' />
                                    </Form.Item>
                                    <Form.Item
                                      {...restFieldSizes}
                                      name={[nameSizes, 'quantity']}
                                      rules={[{ required: true, message: 'Trường số lượng là bắt buộc' }]}
                                    >
                                      <Input placeholder='Số lượng' />
                                    </Form.Item>
                                    {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                                  </Space>
                                ))}
                                <Form.Item>
                                  <Button type='dashed' onClick={() => add()} block>
                                    Thêm kích thước
                                  </Button>
                                </Form.Item>
                              </>
                            )
                          }}
                        </Form.List>
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type='dashed' onClick={() => add()} block>
                        Add field
                      </Button>
                    </Form.Item>
                  </div>
                )
              }}
            </Form.List>
          </Form.Item>
        </Col>
      </Row>

      {/* <Row gutter={16}>
        <Col span={24}>
          <Form.Item name='color' label='Màu sắc' rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}>
            <Input placeholder='Nhập màu sắc' autoComplete='off' />
          </Form.Item>
        </Col>
        <Row gutter={16} style={{ width: '100%' }}>
          <Col span={12}>
            <Form.Item name='size' label='Kích thước' rules={[{ required: true, message: 'Vui lòng nhập kích thước' }]}>
              <Input placeholder='Nhập kích thước' autoComplete='off' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='quantity' label='Số lượng' rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
              <InputNumber placeholder='Nhập số lượng' style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Row> */}

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
