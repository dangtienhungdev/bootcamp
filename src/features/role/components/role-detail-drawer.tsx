import { useDeleteRolePermissionsMutation, useGetRoleByIdQuery } from '@/services/role.service'
import { Button, Card, Checkbox, Descriptions, Drawer, Input, List, Modal, Spin, Tag, Typography, message } from 'antd'
import { useEffect, useState } from 'react'

import { PermissionGuard } from '@/guard/permission-guard'
import { PERMISSIONS } from '@/guard/permissions-guard'
import { useGetPermissionsQuery } from '@/services/permission.service'
import { useAddRolePermissionsMutation } from '@/services/role.service'
import { UpdateRole } from './index'

const { Title, Text } = Typography
const { Search } = Input

interface RoleDetailDrawerProps {
  open: boolean
  onClose: () => void
  roleId: string | null
}

const RoleDetailDrawer = ({ open, onClose, roleId }: RoleDetailDrawerProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [addPermissionsModalOpen, setAddPermissionsModalOpen] = useState(false)
  const [updateRoleModalOpen, setUpdateRoleModalOpen] = useState(false)
  const [permissionsToAdd, setPermissionsToAdd] = useState<string[]>([])
  const [searchPermission, setSearchPermission] = useState('')

  const [deleteRolePermissions, { isLoading: isDeleting }] = useDeleteRolePermissionsMutation()
  const [addRolePermissions, { isLoading: isAdding }] = useAddRolePermissionsMutation()

  const {
    data: roleData,
    isLoading,
    error
  } = useGetRoleByIdQuery(roleId || '', {
    skip: !open || !roleId
  })

  // Get all permissions for adding
  const { data: allPermissionsData, isLoading: isLoadingPermissions } = useGetPermissionsQuery(
    {
      search: searchPermission,
      limit: 100,
      page: 1
    },
    {
      skip: !addPermissionsModalOpen
    }
  )

  // Reset selected permissions when role data changes
  useEffect(() => {
    if (roleData?.permissions) {
      setSelectedPermissions(roleData.permissions.map((p) => p._id))
    }
  }, [roleData])

  // Reset permissions to add when modal opens
  useEffect(() => {
    if (addPermissionsModalOpen) {
      setPermissionsToAdd([])
      setSearchPermission('')
    }
  }, [addPermissionsModalOpen])

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permissionId])
    } else {
      setSelectedPermissions((prev) => prev.filter((id) => id !== permissionId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (roleData?.permissions) {
      if (checked) {
        setSelectedPermissions(roleData.permissions.map((p) => p._id))
      } else {
        setSelectedPermissions([])
      }
    }
  }

  const handleUpdatePermissions = async () => {
    if (!roleId || !roleData) return

    const permissionsToRemove = roleData.permissions
      .filter((p) => !selectedPermissions.includes(p._id))
      .map((p) => p._id)

    if (permissionsToRemove.length === 0) {
      message.info('Không có quyền nào được thay đổi')
      return
    }

    try {
      await deleteRolePermissions({
        id: roleId,
        permissionIds: permissionsToRemove
      }).unwrap()

      message.success('Cập nhật quyền thành công!')
    } catch (error: unknown) {
      console.error('Error updating permissions:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Không thể cập nhật quyền')
    }
  }

  const handleAddPermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setPermissionsToAdd((prev) => [...prev, permissionId])
    } else {
      setPermissionsToAdd((prev) => prev.filter((id) => id !== permissionId))
    }
  }

  const handleSelectAllToAdd = (checked: boolean) => {
    if (allPermissionsData?.docs) {
      const availablePermissions = allPermissionsData.docs.filter(
        (p) => !roleData?.permissions?.some((rp) => rp._id === p._id)
      )
      if (checked) {
        setPermissionsToAdd(availablePermissions.map((p) => p._id))
      } else {
        setPermissionsToAdd([])
      }
    }
  }

  const handleAddPermissions = async () => {
    if (!roleId || permissionsToAdd.length === 0) {
      message.info('Vui lòng chọn ít nhất một quyền để thêm')
      return
    }

    try {
      await addRolePermissions({
        id: roleId,
        permissionIds: permissionsToAdd
      }).unwrap()

      message.success('Thêm quyền thành công!')
      setAddPermissionsModalOpen(false)
    } catch (error: unknown) {
      console.error('Error adding permissions:', error)
      message.error((error as { data?: { message?: string } })?.data?.message || 'Không thể thêm quyền')
    }
  }

  const isAllSelected = roleData?.permissions && selectedPermissions.length === roleData.permissions.length
  const isIndeterminate =
    selectedPermissions.length > 0 && selectedPermissions.length < (roleData?.permissions?.length || 0)

  // Filter out permissions that are already assigned to the role
  const availablePermissions =
    allPermissionsData?.docs?.filter((p) => !roleData?.permissions?.some((rp) => rp._id === p._id)) || []

  const isAllToAddSelected = availablePermissions.length > 0 && permissionsToAdd.length === availablePermissions.length
  const isIndeterminateToAdd = permissionsToAdd.length > 0 && permissionsToAdd.length < availablePermissions.length

  return (
    <>
      <Drawer
        title='Chi tiết vai trò'
        open={open}
        onClose={onClose}
        width={600}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose}>Đóng</Button>
          </div>
        }
      >
        <PermissionGuard perrmission={PERMISSIONS.VIEW_ROLE}>
          {!roleId ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type='secondary'>Vui lòng chọn vai trò để xem chi tiết</Text>
            </div>
          ) : isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size='large' />
              <div style={{ marginTop: 16 }}>
                <Text type='secondary'>Đang tải chi tiết vai trò...</Text>
              </div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type='danger'>Không thể tải chi tiết vai trò</Text>
            </div>
          ) : roleData ? (
            <div>
              {/* Basic Information */}
              <Card
                title='Thông tin cơ bản'
                style={{ marginBottom: 16 }}
                extra={
                  <PermissionGuard perrmission={PERMISSIONS.UPDATE_ROLE}>
                    <Button type='primary' size='small' onClick={() => setUpdateRoleModalOpen(true)}>
                      Cập nhật
                    </Button>
                  </PermissionGuard>
                }
              >
                <Descriptions column={1} size='small'>
                  <Descriptions.Item label='Tên vai trò'>
                    <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
                      {roleData.name}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label='Slug'>
                    <Text code>{roleData.slug}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label='Mô tả'>
                    <Text>{roleData.description || 'Không có mô tả'}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label='Ngày tạo'>
                    <Text type='secondary'>{new Date(roleData.createdAt).toLocaleString('vi-VN')}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label='Ngày cập nhật'>
                    <Text type='secondary'>{new Date(roleData.updatedAt).toLocaleString('vi-VN')}</Text>
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Permissions */}
              <Card
                title={`Quyền (${roleData.permissions.length})`}
                style={{ marginBottom: 16 }}
                extra={
                  <div style={{ display: 'flex', gap: 8 }}>
                    <PermissionGuard perrmission={PERMISSIONS.MANAGE_ROLE_PERMISSIONS}>
                      <Button type='primary' size='small' onClick={() => setAddPermissionsModalOpen(true)}>
                        Thêm quyền
                      </Button>
                      <Button
                        type='primary'
                        size='small'
                        loading={isDeleting}
                        onClick={handleUpdatePermissions}
                        disabled={selectedPermissions.length === roleData.permissions.length}
                      >
                        Cập nhật
                      </Button>
                    </PermissionGuard>
                  </div>
                }
              >
                {roleData.permissions.length > 0 ? (
                  <div>
                    <div style={{ marginBottom: 16, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      >
                        <Text strong>Chọn tất cả</Text>
                      </Checkbox>
                    </div>

                    <List
                      dataSource={roleData.permissions}
                      renderItem={(permission) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Checkbox
                                checked={selectedPermissions.includes(permission._id)}
                                onChange={(e) => handlePermissionChange(permission._id, e.target.checked)}
                              />
                            }
                            title={
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text strong>{permission.name}</Text>
                                <Tag color='green' style={{ fontSize: '12px', padding: '2px 6px' }}>
                                  Quyền
                                </Tag>
                              </div>
                            }
                            description={
                              <div>
                                <Text type='secondary'>Slug: </Text>
                                <Text code>{permission.slug}</Text>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                    Không có quyền nào được gán cho vai trò này
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type='secondary'>Không có dữ liệu vai trò</Text>
            </div>
          )}
        </PermissionGuard>
      </Drawer>

      {/* Modal thêm permissions */}
      <Modal
        title='Thêm quyền cho vai trò'
        open={addPermissionsModalOpen}
        onCancel={() => setAddPermissionsModalOpen(false)}
        footer={[
          <Button key='cancel' onClick={() => setAddPermissionsModalOpen(false)}>
            Hủy
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={isAdding}
            onClick={handleAddPermissions}
            disabled={permissionsToAdd.length === 0}
          >
            Thêm quyền
          </Button>
        ]}
        width={700}
        bodyStyle={{ maxHeight: '60vh', overflow: 'hidden' }}
      >
        <div style={{ marginBottom: 16 }}>
          <Search
            placeholder='Tìm kiếm quyền...'
            value={searchPermission}
            onChange={(e) => setSearchPermission(e.target.value)}
            style={{ marginBottom: 16 }}
          />

          {availablePermissions.length > 0 && (
            <div style={{ marginBottom: 16, padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
              <Checkbox
                checked={isAllToAddSelected}
                indeterminate={isIndeterminateToAdd}
                onChange={(e) => handleSelectAllToAdd(e.target.checked)}
              >
                <Text strong>Chọn tất cả ({availablePermissions.length})</Text>
              </Checkbox>
            </div>
          )}
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
          {isLoadingPermissions ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size='large' />
              <div style={{ marginTop: 16 }}>
                <Text type='secondary'>Đang tải danh sách quyền...</Text>
              </div>
            </div>
          ) : availablePermissions.length > 0 ? (
            <List
              dataSource={availablePermissions}
              renderItem={(permission) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Checkbox
                        checked={permissionsToAdd.includes(permission._id)}
                        onChange={(e) => handleAddPermissionChange(permission._id, e.target.checked)}
                      />
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text strong>{permission.name}</Text>
                        <Tag color='blue' style={{ fontSize: '12px', padding: '2px 6px' }}>
                          Quyền mới
                        </Tag>
                      </div>
                    }
                    description={
                      <div>
                        <Text type='secondary'>Slug: </Text>
                        <Text code>{permission.slug}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
              {searchPermission ? 'Không tìm thấy quyền phù hợp' : 'Tất cả quyền đã được gán cho vai trò này'}
            </div>
          )}
        </div>
      </Modal>

      {/* Update Role Modal */}
      <UpdateRole open={updateRoleModalOpen} onClose={() => setUpdateRoleModalOpen(false)} roleId={roleId} />
    </>
  )
}

export default RoleDetailDrawer
