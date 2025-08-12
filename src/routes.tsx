import { createBrowserRouter } from 'react-router-dom'
import PrivateRouter from './components/private-router'
import ProtectedRouter from './components/protected-router'
import PublicRoutePage from './components/public-router'
import { PERMISSIONS } from './guard/permissions-guard'
import MainLayout from './layout/main-layout'
import CategoriesPage from './pages/categories/page'
import CustomerPage from './pages/customers/page'
import DashboardPage from './pages/dashboard/page'
import DemoPageWithTimestamp from './pages/demo/page'
import LoginPage from './pages/login/page'
import PermissionPage from './pages/permission/page'
import ProductPage from './pages/products/page'
import RolePage from './pages/role/page'
import StaffPage from './pages/staffs/page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoutePage>
        <LoginPage />
      </PublicRoutePage>
    )
  },
  {
    path: '/',
    element: (
      <PrivateRouter>
        <MainLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'tasks',
        element: <div>Tasks Page</div>
      },
      {
        path: 'apps',
        element: <div>Apps Page</div>
      },
      {
        path: 'chats',
        element: <div>Chats Page</div>
      },
      {
        path: 'users',
        element: <div>Users Page</div>
      },
      {
        path: 'settings',
        element: <div>Settings Page</div>
      },
      {
        path: 'help',
        element: <div>Help Center</div>
      },
      {
        path: 'roles',
        element: (
          <ProtectedRouter permission={PERMISSIONS.VIEW_ROLES as PermissionName}>
            <RolePage />
          </ProtectedRouter>
        )
      },
      {
        path: 'permissions',
        element: (
          <ProtectedRouter permission={PERMISSIONS.VIEW_PERMISSIONS as PermissionName}>
            <PermissionPage />
          </ProtectedRouter>
        )
      },
      {
        path: 'customers',
        element: <CustomerPage />
      },
      {
        path: 'staffs',
        element: <StaffPage />
      },
      {
        path: 'categories',
        element: (
          <ProtectedRouter permission={PERMISSIONS.GET_ALL_CATEGORIES as PermissionName}>
            <CategoriesPage />
          </ProtectedRouter>
        )
      },
      {
        path: 'products',
        element: <ProductPage />
      },
      {
        path: 'demo',
        element: <DemoPageWithTimestamp text='Hello' />
      }
    ]
  }
])
