import type { Staff, StaffAddress, UpdateStaffType } from '@/types/staff.type'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, DatePicker, Drawer, Form, Input, Select, Space, Switch, Typography, message } from 'antd'
import { useEffect, useState } from 'react'

import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useGetRolesQuery } from '@/services/role.service'
import { useUpdateStaffMutation } from '@/services/staff.service'
import dayjs from 'dayjs'

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

  // get role
  const { data: rolesData } = useGetRolesQuery({
    page: 1,
    limit: 1000
  })
  const roles = rolesData?.docs

  return (
    <Drawer
      title='Cập nhật thông tin nhân viên'
      open={open}
      onClose={handleClose}
      width={800}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <PermissionGuard perrmission={PERMISSIONS.UPDATE_STAFF}>
            <Button type='primary' loading={isLoading} onClick={() => form.submit()}>
              Cập nhật
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
        <Card title='Thông tin cá nhân' style={{ marginBottom: 16 }} className='!p-0'>
          <Form.Item
            name='fullName'
            label='Họ và tên'
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên' },
              { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự' }
            ]}
          >
            <Input placeholder='Nhập họ và tên' size='large' />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
            ]}
          >
            <Input placeholder='Nhập email' size='large' />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Số điện thoại'
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^[0-9+\-\s()]+$/, message: 'Vui lòng nhập số điện thoại hợp lệ' }
            ]}
          >
            <Input placeholder='Nhập số điện thoại' size='large' />
          </Form.Item>

          <Form.Item name='birthDay' label='Ngày sinh'>
            <DatePicker style={{ width: '100%' }} size='large' />
          </Form.Item>
          <Form.Item name='avatar' label='Ảnh đại diện'>
            <Input placeholder='Nhập ảnh đại diện' size='large' />
          </Form.Item>
        </Card>

        {/* Work Information */}
        <Card title='Thông tin công việc' style={{ marginBottom: 16 }}>
          <Form.Item
            name='department'
            label='Phòng ban'
            rules={[{ required: true, message: 'Vui lòng nhập phòng ban' }]}
          >
            <Input placeholder='Nhập phòng ban' size='large' />
          </Form.Item>

          <Form.Item name='position' label='Chức vụ' rules={[{ required: true, message: 'Vui lòng nhập chức vụ' }]}>
            <Input placeholder='Nhập chức vụ' size='large' />
          </Form.Item>

          <Form.Item
            name='employeeId'
            label='Mã nhân viên'
            rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
          >
            <Input placeholder='Nhập mã nhân viên' size='large' />
          </Form.Item>

          <Form.Item name='role' label='Role ID' rules={[{ required: true, message: 'Please enter role ID' }]}>
            <Select
              options={roles?.map((role) => {
                return { value: role._id, label: role.name }
              })}
              placeholder='Chọn vai trò'
              size='large'
            />
          </Form.Item>
        </Card>

        {/* Status */}
        <Card title='Trạng thái' style={{ marginBottom: 16 }}>
          <Form.Item name='isVerified' label='Trạng thái xác thực' valuePropName='checked'>
            <Switch />
          </Form.Item>

          <Form.Item name='isActive' label='Trạng thái hoạt động' valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Card>

        {/* Addresses */}
        <Card
          title='Địa chỉ'
          style={{ marginBottom: 16 }}
          extra={
            <Button type='dashed' icon={<PlusOutlined />} onClick={addAddress}>
              Thêm địa chỉ
            </Button>
          }
        >
          {addresses.map((address, index) => (
            <Card key={index} size='small' style={{ marginBottom: 8 }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Input
                  placeholder='Địa chỉ'
                  value={address.street}
                  onChange={(e) => updateAddress(index, 'street', e.target.value)}
                />
                <Input
                  placeholder='Thành phố'
                  value={address.city}
                  onChange={(e) => updateAddress(index, 'city', e.target.value)}
                />
                <Input
                  placeholder='Quốc gia'
                  value={address.state}
                  onChange={(e) => updateAddress(index, 'state', e.target.value)}
                />
                <Input
                  placeholder='Mã bưu điện'
                  value={address.postalCode}
                  onChange={(e) => updateAddress(index, 'postalCode', e.target.value)}
                />
                <Input
                  placeholder='Quốc gia'
                  value={address.country}
                  onChange={(e) => updateAddress(index, 'country', e.target.value)}
                />
                <Space>
                  <Switch
                    checked={address.isDefault}
                    onChange={(checked) => updateAddress(index, 'isDefault', checked)}
                  />
                  <span>Địa chỉ mặc định</span>
                  <Button type='text' danger icon={<DeleteOutlined />} onClick={() => removeAddress(index)} />
                </Space>
              </Space>
            </Card>
          ))}
          {addresses.length === 0 && (
            <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Chưa có địa chỉ</div>
          )}
        </Card>
      </Form>
    </Drawer>
  )
}

export default StaffUpdateDrawer
