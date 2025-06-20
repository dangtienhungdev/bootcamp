import CategoriesPage from './pages/categories/page';
import HomePage from './pages/home/page';
import Layout from './pages/layout';
import ProductsPage from './pages/products/page';
import { createBrowserRouter } from 'react-router-dom';

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
		],
	},
]);
