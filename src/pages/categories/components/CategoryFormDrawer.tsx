import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/services/category.service'
import { useUploadImageMutation } from '@/services/upload.service'
import type { Category, CreateCategoryType } from '@/types/category.type'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, Switch, Upload, message } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import _ from 'lodash'
import { useEffect, useState } from 'react'

interface CategoryFormDrawerProps {
  open: boolean
  onClose: () => void
  category?: Category | null
  onSuccess: () => void
}

const CategoryFormDrawer = ({ open, onClose, category, onSuccess }: CategoryFormDrawerProps) => {
  const [form] = Form.useForm()
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('')

  const isEditing = !!category
  const isLoading = isCreating || isUpdating || isUploading

  useEffect(() => {
    if (open && category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
        isActive: category.isActive,
        isDeleted: category.isDeleted,
        thumbnail: category.thumbnail
      })
    } else if (open) {
      form.resetFields()
      // Set default values for new category
      form.setFieldsValue({
        isActive: true,
        isDeleted: false
      })
    }
  }, [open, category, form])

  const handleSubmit = async (values: CreateCategoryType) => {
    try {
      // Use uploaded image URL if available, otherwise use the thumbnail URL from form
      const finalThumbnail = uploadedImageUrl || values.thumbnail

      if (isEditing && category) {
        await updateCategory({
          id: category._id,
          category: { ...values, thumbnail: finalThumbnail }
        }).unwrap()
        message.success('Category updated successfully!')
      } else {
        const data = { ...values, thumbnail: finalThumbnail }
        const payload = _.omit(data, ['upload'])
        await createCategory(payload as CreateCategoryType).unwrap()
        message.success('Category created successfully!')
      }

      form.resetFields()
      setUploadedImageUrl('')
      onSuccess()
      onClose()
    } catch (error: unknown) {
      console.error('Error saving category:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to save category')
    }
  }

  const handleClose = () => {
    form.resetFields()
    setUploadedImageUrl('')
    onClose()
  }

  const normFile = (e: unknown) => {
    if (Array.isArray(e)) {
      return e
    }
    return (e as { fileList?: UploadFile[] })?.fileList
  }

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/WEBP files!')
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!')
      return false
    }
    return false // Prevent auto upload, we'll handle it manually
  }

  const handleUploadChange = async (info: { fileList: UploadFile[] }) => {
    const { fileList } = info
    console.log('🚀 ~ handleUploadChange ~ fileList:', fileList)
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj
      if (file instanceof File) {
        try {
          // Upload image to server
          const result = await uploadImage({ file }).unwrap()
          setUploadedImageUrl(result.secure_url)
          message.success('Image uploaded successfully!')
        } catch (error: unknown) {
          console.error('Error uploading image:', error)
          message.error((error as { data?: { message?: string } })?.data?.message || 'Failed to upload image')
        }
      }
    }
  }

  return (
    <Drawer
      title={isEditing ? 'Edit Category' : 'Create New Category'}
      open={open}
      onClose={handleClose}
      width={500}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <PermissionGuard perrmission={isEditing ? PERMISSIONS.UPDATE_CATEGORY : PERMISSIONS.CREATE_CATEGORY}>
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
          isActive: true,
          isDeleted: false
        }}
      >
        <Form.Item
          name='name'
          label='Category Name'
          rules={[
            { required: true, message: 'Please enter category name' },
            { min: 2, message: 'Category name must be at least 2 characters' }
          ]}
        >
          <Input placeholder='Enter category name' size='large' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: false, message: 'Please enter description' }]}
        >
          <Input.TextArea placeholder='Enter category description' rows={4} size='large' />
        </Form.Item>

        <Form.Item
          name='thumbnail'
          label='Thumbnail URL'
          rules={[
            {
              validator: (_, value) => {
                if (!value && !uploadedImageUrl) {
                  return Promise.reject(new Error('Please provide either thumbnail URL or upload an image'))
                }
                if (value && !/^https?:\/\/.+/.test(value)) {
                  return Promise.reject(new Error('Please enter a valid URL'))
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input placeholder='Enter thumbnail URL' size='large' />
        </Form.Item>

        <Form.Item name='upload' label='Or Upload Thumbnail' valuePropName='fileList' getValueFromEvent={normFile}>
          <Upload beforeUpload={beforeUpload} onChange={handleUploadChange} maxCount={1} accept='image/*'>
            <Button icon={<UploadOutlined />} loading={isUploading}>
              {isUploading ? 'Uploading...' : 'Click to Upload'}
            </Button>
          </Upload>
        </Form.Item>

        {uploadedImageUrl && (
          <Form.Item label='Uploaded Image'>
            <div style={{ marginTop: 8 }}>
              <img
                src={uploadedImageUrl}
                alt='Uploaded thumbnail'
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 4 }}
              />
              <div style={{ marginTop: 4, fontSize: '12px', color: '#666' }}>
                Image uploaded successfully! This will be used as thumbnail.
              </div>
            </div>
          </Form.Item>
        )}

        <Form.Item name='isActive' label='Active Status' valuePropName='checked'>
          <Switch checkedChildren='Active' unCheckedChildren='Inactive' />
        </Form.Item>

        <Form.Item name='isDeleted' label='Deleted Status' valuePropName='checked'>
          <Switch checkedChildren='Deleted' unCheckedChildren='Not Deleted' />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default CategoryFormDrawer
