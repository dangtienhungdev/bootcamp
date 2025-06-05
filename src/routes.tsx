import { createBrowserRouter } from 'react-router-dom';
import DetailPage from './pages/detail/[id]';
import HomePage from './pages/home';

const routers = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/user/detail/:id',
		element: <DetailPage />,
	},
]);

export default routers;
