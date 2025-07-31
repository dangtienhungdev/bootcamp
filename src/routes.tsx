import CategoriesPage from './pages/categories/page'
import CustomerPage from './pages/customers/page'
import DashboardPage from './pages/dashboard/page'
import LoginPage from './pages/login/page'
import MainLayout from './layout/main-layout'
import PermissionPage from './pages/permission/page'
import PrivateRouter from './components/private-router'
import ProductPage from './pages/products/page'
import PublicRoutePage from './components/public-router'
import RolePage from './pages/role/page'
import StaffPage from './pages/staffs/page'
import { createBrowserRouter } from 'react-router-dom'

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
        element: <RolePage />
      },
      {
        path: 'permissions',
        element: <PermissionPage />
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
        element: <CategoriesPage />
      },
      {
        path: 'products',
        element: <ProductPage />
      }
    ]
  }
])
