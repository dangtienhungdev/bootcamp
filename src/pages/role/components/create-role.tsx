import { useGetPermissionsQuery } from '@/services/permission.service'
import { useCreateRoleMutation } from '@/services/role.service'
import { Button, Checkbox, Drawer, Form, Input, message, Space } from 'antd'
import { useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

const { Search } = Input

interface CreateRoleProps {
  open: boolean
  onClose: () => void
}

const CreateRole = ({ open, onClose }: CreateRoleProps) => {
  const [permissionSearch, setPermissionSearch] = useState<string>('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [debouncedPermissionSearch] = useDebounceValue(permissionSearch, 500)
  const [createRole, { isLoading }] = useCreateRoleMutation()
  const [form] = Form.useForm()

  const { data: permissionsData } = useGetPermissionsQuery(
    {
      search: debouncedPermissionSearch,
      page: 1,
      limit: 1000
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false
    }
  )
  const permissions = permissionsData?.docs

  // trigger form
  const handleTriggerForm = () => {
    form.submit()
  }

  const onFinish = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        description: values.description || '',
        permissions: selectedPermissions
      }
      const res = await createRole(payload)
      console.log('🚀 ~ onFinish ~ res:', res)
      message.success('Thêm vai trò thành công')
      onClose()
      form.resetFields()
      setSelectedPermissions([])
      setPermissionSearch('')
    } catch (error) {
      console.log('🚀 ~ onFinish ~ error:', error)
    }
  }

  console.log(selectedPermissions.length === 0)

  return (
    <Drawer
      title='Thêm vai trò'
      closable={{ 'aria-label': 'Close Button' }}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button type='primary' onClick={handleTriggerForm} loading={isLoading}>
            Thêm mới
          </Button>
        </Space>
      }
    >
      <Form layout='vertical' form={form} onFinish={onFinish} requiredMark={false}>
        <Form.Item label='Tên vai trò' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên vai trò' }]}>
          <Input placeholder='Nhập tên vai trò' size='large' className='!rounded' disabled={isLoading} />
        </Form.Item>

        {/* mô tả */}
        <Form.Item label='Mô tả' name='description' rules={[{ required: false, message: 'Vui lòng nhập mô tả' }]}>
          <Input.TextArea placeholder='Nhập mô tả' size='large' className='!rounded' disabled={isLoading} />
        </Form.Item>

        {/* tìm kiếm */}
        <Form.Item label='Danh sách quyền'>
          <Search
            placeholder='Tìm kiếm quyền'
            size='large'
            className='!rounded'
            value={permissionSearch}
            onChange={(e) => setPermissionSearch(e.target.value)}
            disabled={isLoading}
          />
        </Form.Item>

        {/* Danh sách quyền */}
        <Form.Item
          name={'permissions'}
          rules={[{ required: selectedPermissions.length === 0 ? true : false, message: 'Vui lòng chọn quyền' }]}
        >
          <Checkbox.Group
            options={
              permissions?.map((permissionItem) => ({
                label: permissionItem.name,
                value: permissionItem._id
              })) || []
            }
            disabled={isLoading}
            onChange={(checkedValues) => {
              setSelectedPermissions(checkedValues as string[])
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default CreateRole
// trigger
