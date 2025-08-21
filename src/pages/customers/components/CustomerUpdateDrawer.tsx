import { Button, Card, DatePicker, Drawer, Form, Input, Space, Switch, Typography, message } from 'antd'
import type { Customer, CustomerAddress, CustomerPaymentMethod, UpdateCustomerType } from '@/types/customer.type'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import dayjs from 'dayjs'
import { useUpdateCustomerMutation } from '@/services/customer.service'

const { Title } = Typography
const { TextArea } = Input

interface CustomerUpdateDrawerProps {
  open: boolean
  onClose: () => void
  customer: Customer | null
  onSuccess: () => void
}

const CustomerUpdateDrawer = ({ open, onClose, customer, onSuccess }: CustomerUpdateDrawerProps) => {
  const [form] = Form.useForm()
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation()
  const [addresses, setAddresses] = useState<CustomerAddress[]>([])
  const [paymentMethods, setPaymentMethods] = useState<CustomerPaymentMethod[]>([])

  useEffect(() => {
    if (open && customer) {
      // Set form values for basic info
      form.setFieldsValue({
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        birthDay: customer.birthDay ? dayjs(customer.birthDay) : undefined,
        avatar: customer.avatar,
        company: customer.company,
        website: customer.website,
        isActive: customer.isActive
      })

      // Set addresses and payment methods if they exist
      if (customer.addresses) {
        setAddresses(customer.addresses)
      }
      if (customer.paymentMethods) {
        setPaymentMethods(customer.paymentMethods)
      }
    } else if (open) {
      form.resetFields()
      setAddresses([])
      setPaymentMethods([])
    }
  }, [open, customer, form])

  const handleSubmit = async (values: any) => {
    if (!customer) return

    try {
      const updateData: UpdateCustomerType = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        birthDay: values.birthDay ? values.birthDay.format('YYYY-MM-DD') : undefined,
        avatar: values.avatar,
        company: values.company,
        website: values.website,
        isActive: values.isActive,
        addresses: addresses.length > 0 ? addresses : undefined,
        paymentMethods: paymentMethods.length > 0 ? paymentMethods : undefined
      }

      await updateCustomer({
        id: customer._id,
        customer: updateData
      }).unwrap()

      message.success('Customer updated successfully!')
      form.resetFields()
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error updating customer:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to update customer')
    }
  }

  const handleClose = () => {
    form.resetFields()
    setAddresses([])
    setPaymentMethods([])
    onClose()
  }

  const addAddress = () => {
    const newAddress: CustomerAddress = {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: addresses.length === 0
    }
    setAddresses([...addresses, newAddress])
  }

  const updateAddress = (index: number, field: keyof CustomerAddress, value: any) => {
    const newAddresses = [...addresses]
    newAddresses[index] = { ...newAddresses[index], [field]: value }

    // If setting as default, unset others
    if (field === 'isDefault' && value) {
      newAddresses.forEach((addr, i) => {
        if (i !== index) addr.isDefault = false
      })
    }

    setAddresses(newAddresses)
  }

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index))
  }

  const addPaymentMethod = () => {
    const newPaymentMethod: CustomerPaymentMethod = {
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: '',
      bank: ''
    }
    setPaymentMethods([...paymentMethods, newPaymentMethod])
  }

  const updatePaymentMethod = (index: number, field: keyof CustomerPaymentMethod, value: string) => {
    const newPaymentMethods = [...paymentMethods]
    newPaymentMethods[index] = { ...newPaymentMethods[index], [field]: value }
    setPaymentMethods(newPaymentMethods)
  }

  const removePaymentMethod = (index: number) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index))
  }

  return (
    <Drawer
      title='Update Customer Information'
      open={open}
      onClose={handleClose}
      width={800}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_CUSTOMER}>
            <Button type='primary' loading={isLoading} onClick={() => form.submit()}>
              Update
            </Button>
          </PermissionGuard>
        </div>
      }
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSubmit}
        initialValues={{
          isActive: true
        }}
      >
        {/* Basic Information */}
        <Card title='Basic Information' style={{ marginBottom: 16 }}>
          <Form.Item
            name='fullName'
            label='Full Name'
            rules={[
              { required: true, message: 'Please enter full name' },
              { min: 2, message: 'Full name must be at least 2 characters' }
            ]}
          >
            <Input placeholder='Enter full name' size='large' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder='Enter email address' size='large' />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Phone Number'
            rules={[
              { required: true, message: 'Please enter phone number' },
              { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number' }
            ]}
          >
            <Input placeholder='Enter phone number' size='large' />
          </Form.Item>

          <Form.Item name='birthDay' label='Birth Day'>
            <DatePicker style={{ width: '100%' }} size='large' />
          </Form.Item>

          <Form.Item name='avatar' label='Avatar URL'>
            <Input placeholder='Enter avatar URL' size='large' />
          </Form.Item>

          <Form.Item name='company' label='Company'>
            <Input placeholder='Enter company name' size='large' />
          </Form.Item>

          <Form.Item name='website' label='Website'>
            <Input placeholder='Enter website URL' size='large' />
          </Form.Item>

          <Form.Item name='isActive' label='Active Status' valuePropName='checked'>
            <Switch checkedChildren='Active' unCheckedChildren='Inactive' />
          </Form.Item>
        </Card>

        {/* Addresses */}
        <Card
          title='Addresses'
          style={{ marginBottom: 16 }}
          extra={
            <Button type='dashed' icon={<PlusOutlined />} onClick={addAddress}>
              Add Address
            </Button>
          }
        >
          {addresses.map((address, index) => (
            <Card key={index} size='small' style={{ marginBottom: 8 }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Input
                  placeholder='Street'
                  value={address.street}
                  onChange={(e) => updateAddress(index, 'street', e.target.value)}
                />
                <Input
                  placeholder='City'
                  value={address.city}
                  onChange={(e) => updateAddress(index, 'city', e.target.value)}
                />
                <Input
                  placeholder='State'
                  value={address.state}
                  onChange={(e) => updateAddress(index, 'state', e.target.value)}
                />
                <Input
                  placeholder='Postal Code'
                  value={address.postalCode}
                  onChange={(e) => updateAddress(index, 'postalCode', e.target.value)}
                />
                <Input
                  placeholder='Country'
                  value={address.country}
                  onChange={(e) => updateAddress(index, 'country', e.target.value)}
                />
                <Space>
                  <Switch
                    checked={address.isDefault}
                    onChange={(checked) => updateAddress(index, 'isDefault', checked)}
                  />
                  <span>Default Address</span>
                  <Button type='text' danger icon={<DeleteOutlined />} onClick={() => removeAddress(index)} />
                </Space>
              </Space>
            </Card>
          ))}
          {addresses.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No addresses added yet</div>
          )}
        </Card>

        {/* Payment Methods */}
        <Card
          title='Payment Methods'
          style={{ marginBottom: 16 }}
          extra={
            <Button type='dashed' icon={<PlusOutlined />} onClick={addPaymentMethod}>
              Add Payment Method
            </Button>
          }
        >
          {paymentMethods.map((payment, index) => (
            <Card key={index} size='small' style={{ marginBottom: 8 }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Input
                  placeholder='Card Number'
                  value={payment.cardNumber}
                  onChange={(e) => updatePaymentMethod(index, 'cardNumber', e.target.value)}
                />
                <Input
                  placeholder='Card Holder Name'
                  value={payment.cardHolderName}
                  onChange={(e) => updatePaymentMethod(index, 'cardHolderName', e.target.value)}
                />
                <Input
                  placeholder='Expiry Date (MM/YY)'
                  value={payment.expiryDate}
                  onChange={(e) => updatePaymentMethod(index, 'expiryDate', e.target.value)}
                />
                <Input
                  placeholder='CVV'
                  value={payment.cvv}
                  onChange={(e) => updatePaymentMethod(index, 'cvv', e.target.value)}
                />
                <Input
                  placeholder='Bank'
                  value={payment.bank}
                  onChange={(e) => updatePaymentMethod(index, 'bank', e.target.value)}
                />
                <Button type='text' danger icon={<DeleteOutlined />} onClick={() => removePaymentMethod(index)}>
                  Remove
                </Button>
              </Space>
            </Card>
          ))}
          {paymentMethods.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No payment methods added yet</div>
          )}
        </Card>
      </Form>
    </Drawer>
  )
}

export default CustomerUpdateDrawer
