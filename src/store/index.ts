import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/auth.service'
import { roleApi } from '../services/role.service'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, roleApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
