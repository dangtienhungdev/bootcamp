import { Button, Drawer, Form, Input, message } from 'antd'

import type { CreateStaffType } from '@/types/staff.type'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import { useCreateStaffMutation } from '@/services/staff.service'
import { useEffect } from 'react'

interface StaffFormDrawerProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

const StaffFormDrawer = ({ open, onClose, onSuccess }: StaffFormDrawerProps) => {
  const [form] = Form.useForm()
  const [createStaff, { isLoading }] = useCreateStaffMutation()

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open, form])

  const handleSubmit = async (values: CreateStaffType) => {
    try {
      await createStaff(values).unwrap()
      message.success('Staff created successfully!')
      form.resetFields()
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error creating staff:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to create staff')
    }
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      title='Create New Staff'
      open={open}
      onClose={handleClose}
      width={500}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <PermissionGuard perrmission={PERMISSIONS.CREATE_STAFF}>
            <Button type='primary' loading={isLoading} onClick={() => form.submit()}>
              Create
            </Button>
          </PermissionGuard>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
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

        <Form.Item
          name='department'
          label='Department'
          rules={[{ required: true, message: 'Please enter department' }]}
        >
          <Input placeholder='Enter department' size='large' />
        </Form.Item>

        <Form.Item name='position' label='Position' rules={[{ required: true, message: 'Please enter position' }]}>
          <Input placeholder='Enter position' size='large' />
        </Form.Item>

        <Form.Item
          name='employeeId'
          label='Employee ID'
          rules={[{ required: true, message: 'Please enter employee ID' }]}
        >
          <Input placeholder='Enter employee ID' size='large' />
        </Form.Item>

        <Form.Item name='role' label='Role ID' rules={[{ required: true, message: 'Please enter role ID' }]}>
          <Input placeholder='Enter role ID' size='large' />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default StaffFormDrawer
