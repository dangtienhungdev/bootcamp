import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/root-layout';
import { urls } from './lib/urls';
import CoursePage from './pages/course';
import HomePage from './pages/home';
import PaymentPage from './pages/payment';
import StudentPage from './pages/students';

const routes = createBrowserRouter([
	{
		path: urls.home,
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: urls.course,
				element: <CoursePage />,
			},
			{
				path: urls.students,
				element: <StudentPage />,
			},
			{
				path: urls.payment,
				element: <PaymentPage />,
			},
		],
	},
]);

export default routes;
