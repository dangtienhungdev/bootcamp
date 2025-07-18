import HomePage from './pages/home/page'
import RootLayout from './layouts/root-layout'
import { createBrowserRouter } from 'react-router-dom'

const routes = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			}
		]
	}
])

export default routes
