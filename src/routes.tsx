import CategoriesPage from './pages/categories/page';
import CategoryPageV2 from './pages/categories-v2/page';
import CreateProductPage from './pages/products/create/page';
import DemoDetailPage from './pages/demo/detail/[detailId]/page';
import DemoPage from './pages/demo/page';
import EditCategoryPage from './pages/categories/edit/[categoryId]/page';
import EditCategoryPageV2 from './pages/categories-v2/edit/page';
import HomePage from './pages/home/page';
import Layout from './pages/layout';
import LoginPage from './pages/login/page';
import ProductPageV2 from './pages/product-v2/page';
import { ProductProvider } from './contexts/product-context.context';
import ProductsPage from './pages/products/page';
import TaskPage from './pages/task/page';
import TaskPageV2 from './pages/task-v2/page';
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
				element: (
					<ProductProvider>
						<CategoriesPage />
					</ProductProvider>
				),
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
				element: (
					<ProductProvider>
						<DemoPage />
					</ProductProvider>
				),
			},
			{
				path: 'demo/detail/:detailId',
				element: (
					<ProductProvider>
						<DemoDetailPage />
					</ProductProvider>
				),
			},
			{
				path: 'categories-v2',
				element: <CategoryPageV2 />,
			},
			{
				path: 'categories-v2/edit',
				element: <EditCategoryPageV2 />,
			},
			{
				path: 'task',
				element: <TaskPage />,
			},
			{
				path: 'task-v2',
				element: <TaskPageV2 />,
			},
			{
				path: 'product-v2',
				element: <ProductPageV2 />,
			},
		],
	},
	{
		path: 'login',
		element: <LoginPage />,
	},
]);
