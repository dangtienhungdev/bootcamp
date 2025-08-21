import { Button, Drawer, Form, Input, Switch, message } from 'antd'
import type { CreateCustomerType, Customer, UpdateCustomerType } from '@/types/customer.type'
import { useCreateCustomerMutation, useUpdateCustomerMutation } from '@/services/customer.service'

import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import { useEffect } from 'react'

interface CustomerFormDrawerProps {
  open: boolean
  onClose: () => void
  customer?: Customer | null
  onSuccess: () => void
}

const CustomerFormDrawer = ({ open, onClose, customer, onSuccess }: CustomerFormDrawerProps) => {
  const [form] = Form.useForm()
  const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation()
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation()

  const isEditing = !!customer
  const isLoading = isCreating || isUpdating

  useEffect(() => {
    if (open && customer) {
      form.setFieldsValue({
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        isVerified: customer.isVerified
      })
    } else if (open) {
      form.resetFields()
    }
  }, [open, customer, form])

  const handleSubmit = async (values: CreateCustomerType | UpdateCustomerType) => {
    try {
      if (isEditing && customer) {
        await updateCustomer({
          id: customer._id,
          customer: values as UpdateCustomerType
        }).unwrap()
        message.success('Customer updated successfully!')
      } else {
        await createCustomer(values as CreateCustomerType).unwrap()
        message.success('Customer created successfully!')
      }

      form.resetFields()
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error saving customer:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to save customer')
    }
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      title={isEditing ? 'Edit Customer' : 'Create New Customer'}
      open={open}
      onClose={handleClose}
      width={500}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <PermissionGuard perrmission={isEditing ? PERMISSIONS.UPDATE_CUSTOMER : PERMISSIONS.CREATE_CUSTOMER}>
            <Button type='primary' loading={isLoading} onClick={() => form.submit()}>
              {isEditing ? 'Update' : 'Create'}
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
          isVerified: false
        }}
      >
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

        {!isEditing && (
          <>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password placeholder='Enter password' size='large' />
            </Form.Item>

            <Form.Item
              name='passwordConfirm'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords do not match!'))
                  }
                })
              ]}
            >
              <Input.Password placeholder='Confirm password' size='large' />
            </Form.Item>
          </>
        )}

        {isEditing && (
          <Form.Item name='isVerified' label='Verified Status' valuePropName='checked'>
            <Switch checkedChildren='Verified' unCheckedChildren='Not Verified' />
          </Form.Item>
        )}
      </Form>
    </Drawer>
  )
}

export default CustomerFormDrawer
