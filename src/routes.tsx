import { createBrowserRouter } from 'react-router-dom';
import EditCategoryPage from './pages/categories/edit/[categoryId]/page';
import CategoriesPage from './pages/categories/page';
import DemoDetailPage from './pages/demo/detail/[detailId]/page';
import DemoPage from './pages/demo/page';
import HomePage from './pages/home/page';
import Layout from './pages/layout';
import LoginPage from './pages/login/page';
import CreateProductPage from './pages/products/create/page';
import ProductsPage from './pages/products/page';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'products',
				element: <ProductsPage />,
			},
			{
				path: 'categories',
				element: <CategoriesPage />,
			},
			{
				path: 'categories/edit/:categoryId',
				element: <EditCategoryPage />,
			},
			{
				path: 'products/create',
				element: <CreateProductPage />,
			},
			{
				path: 'demo',
				element: <DemoPage />,
			},
			{
				path: 'demo/detail/:detailId',
				element: <DemoDetailPage />,
			},
		],
	},
	{
		path: 'login',
		element: <LoginPage />,
	},
]);
