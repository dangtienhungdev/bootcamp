import { useGetRoleByIdQuery, useUpdateRoleMutation } from '@/services/role.service'
import { Button, Drawer, Form, Input, Space, Spin, message } from 'antd'
import { useEffect, useState } from 'react'

import { useDebounceValue } from 'usehooks-ts'

const { Search } = Input

interface UpdateRoleProps {
  open: boolean
  onClose: () => void
  roleId: string | null
}

const UpdateRole = ({ open, onClose, roleId }: UpdateRoleProps) => {
  const [permissionSearch, setPermissionSearch] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [debouncedPermissionSearch] = useDebounceValue(permissionSearch, 500)
  const [updateRole, { isLoading }] = useUpdateRoleMutation()
  const [form] = Form.useForm()

  // Get role data for editing
  const { data: roleData, isLoading: isLoadingRole } = useGetRoleByIdQuery(roleId || '', {
    skip: !open || !roleId
  })

  // Set form values when role data is loaded
  useEffect(() => {
    if (roleData) {
      form.setFieldsValue({
        name: roleData.name,
        description: roleData.description
      })
      setSelectedPermissions(roleData.permissions.map((p) => p._id))
    }
  }, [roleData, form])

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      form.resetFields()
      setSelectedPermissions([])
      setPermissionSearch('')
    }
  }, [open, form])

  // trigger form
  const handleTriggerForm = () => {
    form.submit()
  }

  const onFinish = async (values: any) => {
    if (!roleId) return

    try {
      const payload = {
        id: roleId,
        name: values.name,
        description: values.description || '',
        permissions: roleData?.permissions.map((p) => p._id) || []
      }
      await updateRole(payload).unwrap()
      message.success('Cập nhật vai trò thành công')
      onClose()
    } catch (error) {
      console.log('🚀 ~ onFinish ~ error:', error)
      message.error('Không thể cập nhật vai trò')
    }
  }

  return (
    <Drawer
      title='Cập nhật vai trò'
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
      width={600}
      extra={
        <Space>
          <Button onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button type='primary' onClick={handleTriggerForm} loading={isLoading}>
            Cập nhật
          </Button>
        </Space>
      }
    >
      {isLoadingRole ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size='large' />
          <div style={{ marginTop: 16 }}>Đang tải thông tin vai trò...</div>
        </div>
      ) : (
        <Form layout='vertical' form={form} onFinish={onFinish} requiredMark={false}>
          <Form.Item label='Tên vai trò' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}>
            <Input placeholder='Nhập tên vai trò' size='large' className='!rounded' disabled={isLoading} />
          </Form.Item>

          {/* mô tả */}
          <Form.Item label='Mô tả' name='description' rules={[{ required: false, message: 'Vui lòng nhập mô tả' }]}>
            <Input.TextArea placeholder='Nhập mô tả' size='large' className='!rounded' disabled={isLoading} />
          </Form.Item>
        </Form>
      )}
    </Drawer>
  )
}

export default UpdateRole
