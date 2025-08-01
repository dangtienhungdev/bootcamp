import { useCreatePermissionMutation } from '@/services/permission.service'
import type { CreatePermissionPayload } from '@/types/permission.type'
import { Button, Drawer, Form, Input, message, Space } from 'antd'

interface CreatePermissionProps {
  open: boolean
  onClose: () => void
}

const CreatePermissions = ({ open, onClose }: CreatePermissionProps) => {
  const [form] = Form.useForm()

  const [createPermission, { isLoading }] = useCreatePermissionMutation()

  const onFinish = async (values: CreatePermissionPayload) => {
    try {
      const payload = {
        name: values.name,
        description: values.description || ''
      }
      await createPermission(payload)

      message.success('Thêm quyền thành công')
      onClose()
      form.resetFields()
    } catch (error) {
      message.error('Thêm quyền thất bại')
    }
  }

  const handleTriggerForm = () => {
    form.submit()
  }

  return (
    <Drawer
      title='Thêm mới quyền'
      open={open}
      onClose={onClose}
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
        <Form.Item label='Tên quyền' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên quyền' }]}>
          <Input placeholder='Nhập tên quyền' size='large' className='!rounded' disabled={isLoading} />
        </Form.Item>

        <Form.Item label='Mô tả' name='description'>
          <Input.TextArea placeholder='Nhập mô tả' size='large' className='!rounded' disabled={isLoading} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default CreatePermissions
