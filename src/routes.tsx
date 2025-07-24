import { createBrowserRouter } from 'react-router-dom'
import PrivateRouter from './components/private-router'
import PublicRoutePage from './components/public-router'
import MainLayout from './layout/main-layout'
import DashboardPage from './pages/dashboard/page'
import LoginPage from './pages/login/page'

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
      }
    ]
  }
])
