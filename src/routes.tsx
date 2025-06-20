import CategoriesPage from './pages/categories/page';
import CreateProductPage from './pages/products/create/page';
import EditCategoryPage from './pages/categories/edit/[categoryId]/page';
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
			{
				path: 'categories/edit/:categoryId',
				element: <EditCategoryPage />,
			},
			{
				path: 'products/create',
				element: <CreateProductPage />,
			},
		],
	},
]);
