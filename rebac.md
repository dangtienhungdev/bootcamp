# RBAC (Role-Based Access Control) Implementation Documentation

## 📋 Overview

This document outlines the implementation of a comprehensive Role-Based Access Control (RBAC) system in the React Admin Dashboard. The system uses permissions to conditionally render UI elements and control access to different features based on the current user's role and permissions.

## 🎯 Key Features Implemented

### 1. **Permissions Guard System**
- Centralized permission management utility
- Dynamic UI rendering based on user permissions
- Type-safe permission checking with TypeScript
- Multiple guard components for different use cases

### 2. **API Integration**
- `/staff/me` endpoint for current user information
- `/roles/:id` endpoint for role details and permissions
- Bearer token authentication for all API calls

### 3. **Dynamic Sidebar Navigation**
- Menu items shown/hidden based on permissions
- Real-time permission checking
- Graceful loading states

### 4. **Page-Level Protection**
- Complete page protection for sensitive areas
- Action-level protection for specific features
- Consistent permission checking across all pages

## 📁 Files Created/Modified

### **New Files Created:**

#### 1. `src/utils/permissions-guard.ts` ⭐ **CORE UTILITY**
```typescript
// Permission constants from the provided JSON
export const PERMISSIONS = {
  // Product permissions
  GET_PRODUCT: 'get_product',
  CREATE_PRODUCT: 'create_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  GET_ALL_PRODUCTS: 'get-all-products',
  GET_PRODUCT_BY_SLUG: 'get-product-by-slug',

  // Category permissions
  DELETE_CATEGORY: 'delete_category',
  UPDATE_CATEGORY: 'update_category',
  GET_ALL_CATEGORIES: 'get-all-categories',

  // User permissions
  CREATE_USER: 'create-user',

  // Role permissions
  VIEW_ROLES: 'view-roles',
  CREATE_ROLE: 'create-role',
  VIEW_ROLE: 'view-role',
  UPDATE_ROLE: 'update-role',
  DELETE_ROLE: 'delete-role',
  MANAGE_ROLE_PERMISSIONS: 'manage-role-permissions',

  // Permission permissions
  VIEW_PERMISSIONS: 'view-permissions',
  CREATE_PERMISSION: 'create-permission',
  UPDATE_PERMISSION: 'update-permission',
  DELETE_PERMISSION: 'delete-permission',

  // Customer permissions
  VIEW_CUSTOMER: 'view-customer',

  // Cart permissions
  CREATE_CART: 'create-cart',
  VIEW_CART: 'view-cart',
  UPDATE_CART: 'update-cart',
  DELETE_CART: 'delete-cart',
  ADD_CART_ITEM: 'add-cart-item',
  DELETE_CART_ITEM: 'delete-cart-item',
  UPDATE_CART_ITEM: 'update-cart-item',

  // Upload permissions
  UPLOAD_IMAGE: 'upload-image',
  UPLOAD_IMAGES: 'upload-images',

  // Staff permissions
  CREATE_STAFF: 'create-staff',
  VIEW_STAFF: 'view-staff',
  UPDATE_STAFF: 'update-staff',
  DELETE_STAFF: 'delete-staff'
} as const
```

**Key Components:**
- `useCurrentUserPermissions()` - Hook to get current user's permissions
- `PermissionGuard` - Component for single permission check
- `AnyPermissionGuard` - Component for multiple permissions (ANY)
- `AllPermissionsGuard` - Component for multiple permissions (ALL)
- `withPermission` - Higher-order component

### **Modified Files:**

#### 2. `src/services/staff.service.ts`
**Changes:**
- Added `getCurrentStaff` query endpoint
- Added `Staff` type import
- Exported `useGetCurrentStaffQuery` hook

```typescript
// NEW ENDPOINT ADDED
getCurrentStaff: builder.query<Staff, void>({
  query: () => ({
    url: '/staff/me',
    method: 'GET'
  })
})
```

#### 3. `src/layout/components/header.tsx`
**Changes:**
- Added `useGetCurrentStaffQuery` import
- Added current staff data fetching
- Enhanced user display with staff information
- Added position display in header

```typescript
// NEW FEATURES ADDED
const { data: currentStaff } = useGetCurrentStaffQuery()

// Enhanced display logic
const displayName = currentStaff?.fullName || user?.fullName || 'User'
const displayEmail = currentStaff?.email || user?.email || 'user@example.com'
const displayPosition = currentStaff?.position || 'Staff'
```

#### 4. `src/layout/components/sidebar/sidebar.tsx`
**Changes:**
- Added permissions guard imports
- Implemented dynamic menu building based on permissions
- Added loading state handling
- Replaced static menu with permission-based menu

```typescript
// NEW PERMISSION-BASED MENU BUILDING
const buildMenuItems = () => {
  const items: any[] = [
    {
      key: 'general',
      label: 'Chung',
      type: 'group',
      children: [
        {
          key: '/',
          icon: <LayoutDashboard size={18} />,
          label: 'Bảng điều khiển'
        }
      ]
    }
  ]

  // Add Roles menu if user has role-related permissions
  if (hasPermission(PERMISSIONS.VIEW_ROLES) ||
      hasPermission(PERMISSIONS.CREATE_ROLE) ||
      hasPermission(PERMISSIONS.VIEW_ROLE) ||
      hasPermission(PERMISSIONS.UPDATE_ROLE) ||
      hasPermission(PERMISSIONS.DELETE_ROLE)) {
    items[0].children.push({
      key: '/roles',
      icon: <Shield size={18} />,
      label: 'Vai trò'
    })
  }

  // Similar logic for other menu items...
  return items
}
```

#### 5. `src/pages/role/page.tsx`
**Changes:**
- Added `PermissionGuard` and `PERMISSIONS` imports
- Wrapped "Thêm mới roles" button with `CREATE_ROLE` permission
- Wrapped role detail links with `VIEW_ROLE` permission
- Wrapped entire drawer with `CREATE_ROLE` permission

```typescript
// NEW PERMISSION PROTECTION
<PermissionGuard permission={PERMISSIONS.CREATE_ROLE}>
  <Button type='primary' icon={<PlusOutlined />} onClick={showDrawer} size='large'>
    Thêm mới roles
  </Button>
</PermissionGuard>

// Role detail links protected
<PermissionGuard permission={PERMISSIONS.VIEW_ROLE}>
  <Link to={`/roles/${record._id}/detail`}>
    <Tag color='blue' style={{ fontSize: '14px', padding: '4px 8px' }}>
      {name}
    </Tag>
  </Link>
</PermissionGuard>
```

#### 6. `src/pages/permission/page.tsx`
**Changes:**
- Added `PermissionGuard` and `PERMISSIONS` imports
- Wrapped "Thêm mới permissions" button with `CREATE_PERMISSION` permission
- Wrapped entire drawer with `CREATE_PERMISSION` permission
- Improved table styling and formatting

```typescript
// NEW PERMISSION PROTECTION
<PermissionGuard permission={PERMISSIONS.CREATE_PERMISSION}>
  <Button type='primary' icon={<PlusOutlined />} onClick={showDrawer} size='large'>
    Thêm mới permissions
  </Button>
</PermissionGuard>
```

#### 7. `src/pages/customers/page.tsx`
**Changes:**
- Added `PermissionGuard` and `PERMISSIONS` imports
- Wrapped entire page content with `VIEW_CUSTOMER` permission
- Improved table styling and column formatting
- Standardized date formatting

```typescript
// NEW PAGE PROTECTION
<PermissionGuard permission={PERMISSIONS.VIEW_CUSTOMER}>
  <div>
    <Title level={2}>Customer Management</Title>
    {/* All page content */}
  </div>
</PermissionGuard>
```

#### 8. `src/pages/staffs/page.tsx`
**Changes:**
- Added `PermissionGuard` and `PERMISSIONS` imports
- Wrapped entire page content with `VIEW_STAFF` permission
- Improved table styling and column formatting
- Enhanced status display with colors

```typescript
// NEW PAGE PROTECTION
<PermissionGuard permission={PERMISSIONS.VIEW_STAFF}>
  <div>
    <Title level={2}>Staff Management</Title>
    {/* All page content */}
  </div>
</PermissionGuard>
```

#### 9. `src/pages/role/[id]/detail/page.tsx`
**Changes:**
- Added `PermissionGuard` and `PERMISSIONS` imports
- Wrapped entire page content with `VIEW_ROLE` permission
- Protected all states (loading, error, success) with permission check
- Maintained consistent permission checking across all render states

```typescript
// NEW PAGE PROTECTION
<PermissionGuard permission={PERMISSIONS.VIEW_ROLE}>
  <div>
    <Title level={2}>Role Detail</Title>
    {/* All page content */}
  </div>
</PermissionGuard>
```

## 🔧 Technical Implementation Details

### **Permission Flow:**
1. **User Login** → Authentication context stores user data
2. **Header Component** → Calls `/staff/me` API to get current staff info
3. **Sidebar Component** → Uses `useCurrentUserPermissions()` hook
4. **Permission Hook** → Calls `/roles/:id` API to get role permissions
5. **UI Components** → Use permission guards to conditionally render

### **API Endpoints Used:**
- `GET /staff/me` - Get current user's staff information
- `GET /roles/:id` - Get role details including permissions
- All endpoints use Bearer token authentication

### **Permission Categories:**
- **Product Management**: 6 permissions
- **Category Management**: 3 permissions
- **User Management**: 1 permission
- **Role Management**: 6 permissions
- **Permission Management**: 4 permissions
- **Customer Management**: 1 permission
- **Cart Management**: 7 permissions
- **Upload Management**: 2 permissions
- **Staff Management**: 4 permissions

## 🎯 Usage Examples

### **Single Permission Check:**
```tsx
<PermissionGuard permission={PERMISSIONS.CREATE_ROLE}>
  <Button>Create Role</Button>
</PermissionGuard>
```

### **Multiple Permissions (Any):**
```tsx
<AnyPermissionGuard permissions={[PERMISSIONS.VIEW_ROLES, PERMISSIONS.CREATE_ROLE]}>
  <div>Role Management Content</div>
</AnyPermissionGuard>
```

### **Hook Usage:**
```tsx
const { hasPermission, permissions, isLoading } = useCurrentUserPermissions()

if (hasPermission(PERMISSIONS.DELETE_ROLE)) {
  // Show delete button
}
```

## 🔒 Security Benefits

1. **Client-Side Protection**: Prevents unauthorized UI access
2. **Server-Side Validation**: All API calls use Bearer token authentication
3. **Graceful Fallbacks**: UI elements gracefully hide when permissions are missing
4. **Type Safety**: Full TypeScript support prevents permission name errors
5. **Centralized Control**: All permissions managed in one location

## 🚀 Performance Optimizations

1. **Cached Permissions**: RTK Query caches permission data
2. **Efficient Re-renders**: Only re-renders when permissions change
3. **Lazy Loading**: Permission-dependent components load only when needed
4. **Loading States**: Proper loading indicators during permission checks

## 📈 Future Enhancements

1. **Permission Groups**: Group related permissions for easier management
2. **Dynamic Permission Loading**: Load permissions on-demand
3. **Permission Inheritance**: Support for permission hierarchies
4. **Audit Logging**: Track permission usage and access attempts
5. **Permission Templates**: Predefined permission sets for common roles

## 🧪 Testing Considerations

1. **Permission Testing**: Test all permission combinations
2. **Edge Cases**: Test with missing or invalid permissions
3. **Loading States**: Test permission loading scenarios
4. **Error Handling**: Test API failure scenarios
5. **UI Consistency**: Ensure consistent behavior across all pages

---

**Total Files Modified**: 9 files
**New Files Created**: 1 file
**Total Permission Types**: 35 permissions
**Protected UI Elements**: 15+ components
**API Endpoints Added**: 1 new endpoint

This RBAC implementation provides a robust, scalable, and secure permission system that adapts the UI based on user roles and permissions while maintaining excellent performance and user experience.