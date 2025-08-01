export const PERMISSIONS = {
  // Product permissions (Quyền liên quan đến sản phẩm)
  GET_PRODUCT: 'get_product',
  CREATE_PRODUCT: 'create_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',

  // Category permissions (Quyền liên quan đến danh mục)
  DELETE_CATEGORY: 'delete_category',
  UPDATE_CATEGORY: 'update_category',

  // User permissions (Quyền liên quan đến người dùng)
  CREATE_USER: 'create-user',

  // General product/category view permissions (Xem danh sách sản phẩm/danh mục)
  GET_ALL_PRODUCTS: 'get-all-products',
  GET_ALL_CATEGORIES: 'get-all-categories',

  // Role permissions (Quyền liên quan đến vai trò)
  VIEW_ROLES: 'view-roles',
  VIEW_ROLE: 'view-role',
  CREATE_ROLE: 'create-role',
  UPDATE_ROLE: 'update-role',
  DELETE_ROLE: 'delete-role',
  MANAGE_ROLE_PERMISSIONS: 'manage-role-permissions',

  // Permission permissions (Quyền liên quan đến phân quyền)
  VIEW_PERMISSIONS: 'view-permissions',
  CREATE_PERMISSION: 'create-permission',
  UPDATE_PERMISSION: 'update-permission',
  DELETE_PERMISSION: 'delete-permission',

  // Customer permissions (Quyền liên quan đến khách hàng)
  VIEW_CUSTOMER: 'view-customer',

  // Cart permissions (Quyền liên quan đến giỏ hàng)
  CREATE_CART: 'create-cart',
  VIEW_CART: 'view-cart',
  UPDATE_CART: 'update-cart',
  DELETE_CART: 'delete-cart',
  ADD_CART_ITEM: 'add-cart-item',
  DELETE_CART_ITEM: 'delete-cart-item',
  UPDATE_CART_ITEM: 'update-cart-item',
  VIEW_CART_2: 'view-cart-2',

  // Product details and upload permissions (Quyền liên quan đến chi tiết sản phẩm và upload)
  GET_PRODUCT_BY_SLUG: 'get-product-by-slug',
  UPLOAD_IMAGE: 'upload-image',
  UPLOAD_IMAGES: 'upload-images',

  // Staff permissions (Quyền liên quan đến nhân viên)
  CREATE_STAFF: 'create-staff',
  VIEW_STAFF: 'view-staff',
  UPDATE_STAFF: 'update-staff',
  DELETE_STAFF: 'delete-staff',

  // Miscellaneous (Khác)
  ABCABC: 'abcabc'
}

/*
- typeof PERMISSIONS: lấy type của object PERMISSIONS
- keyof typeof PERMISSIONS: lấy tất cả các key của object PERMISSIONS
- (typeof PERMISSIONS)[keyof typeof PERMISSIONS]: lấy tất cả các value(giá trị) của object PERMISSIONS
*/
export type PermissionName = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
