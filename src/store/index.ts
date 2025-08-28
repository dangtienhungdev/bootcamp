import { authApi } from '../services/auth.service'
import { categoryApi } from '@/services/category.service'
import { configureStore } from '@reduxjs/toolkit'
import { customerApi } from '../services/customer.service'
import { permissionApi } from '../services/permission.service'
import { productApi } from '@/services/product.service'
import { roleApi } from '../services/role.service'
import { setupListeners } from '@reduxjs/toolkit/query'
import { staffApi } from '../services/staff.service'
import { uploadApi } from '@/services/upload.service'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [permissionApi.reducerPath]: permissionApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      roleApi.middleware,
      permissionApi.middleware,
      customerApi.middleware,
      staffApi.middleware,
      categoryApi.middleware,
      uploadApi.middleware,
      productApi.middleware
    )
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
