import { Button, Card, DatePicker, Drawer, Form, Input, Space, Switch, Typography, message } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type { Staff, StaffAddress, UpdateStaffType } from '@/types/staff.type'
import { useEffect, useState } from 'react'

import { PERMISSIONS } from '@/guard/permissions-guard'
import { PermissionGuard } from '@/guard/permission-guard'
import dayjs from 'dayjs'
import { useUpdateStaffMutation } from '@/services/staff.service'

const { Title } = Typography

interface StaffUpdateDrawerProps {
  open: boolean
  onClose: () => void
  staff: Staff | null
  onSuccess: () => void
}

const StaffUpdateDrawer = ({ open, onClose, staff, onSuccess }: StaffUpdateDrawerProps) => {
  const [form] = Form.useForm()
  const [updateStaff, { isLoading }] = useUpdateStaffMutation()
  const [addresses, setAddresses] = useState<StaffAddress[]>([])

  useEffect(() => {
    if (open && staff) {
      // Set form values for basic info
      form.setFieldsValue({
        fullName: staff.fullName,
        email: staff.email,
        phone: staff.phone,
        birthDay: staff.birthDay ? dayjs(staff.birthDay) : undefined,
        avatar: staff.avatar,
        department: staff.department,
        position: staff.position,
        employeeId: staff.employeeId,
        role: staff.role,
        isVerified: staff.isVerified,
        isActive: staff.isActive
      })

      // Set addresses if they exist
      if (staff.addresses && staff.addresses.length > 0) {
        setAddresses(staff.addresses as StaffAddress[])
      }
    } else if (open) {
      form.resetFields()
      setAddresses([])
    }
  }, [open, staff, form])

  const handleSubmit = async (values: any) => {
    if (!staff) return

    try {
      const updateData: UpdateStaffType = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        birthDay: values.birthDay ? values.birthDay.format('YYYY-MM-DD') : undefined,
        avatar: values.avatar,
        department: values.department,
        position: values.position,
        employeeId: values.employeeId,
        role: values.role,
        isVerified: values.isVerified,
        isActive: values.isActive,
        addresses: addresses.length > 0 ? addresses : undefined
      }

      await updateStaff({
        id: staff._id,
        staff: updateData
      }).unwrap()

      message.success('Staff updated successfully!')
      form.resetFields()
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error updating staff:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to update staff')
    }
  }

  const handleClose = () => {
    form.resetFields()
    setAddresses([])
    onClose()
  }

  const addAddress = () => {
    const newAddress: StaffAddress = {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      isDefault: addresses.length === 0
    }
    setAddresses([...addresses, newAddress])
  }

  const updateAddress = (index: number, field: keyof StaffAddress, value: any) => {
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

  return (
    <Drawer
      title='Update Staff Information'
      open={open}
      onClose={handleClose}
      width={800}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_STAFF}>
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
          isActive: true,
          isVerified: false
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
        </Card>

        {/* Work Information */}
        <Card title='Work Information' style={{ marginBottom: 16 }}>
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
        </Card>

        {/* Status */}
        <Card title='Status' style={{ marginBottom: 16 }}>
          <Form.Item name='isVerified' label='Verified Status' valuePropName='checked'>
            <Switch checkedChildren='Verified' unCheckedChildren='Not Verified' />
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
      </Form>
    </Drawer>
  )
}

export default StaffUpdateDrawer
