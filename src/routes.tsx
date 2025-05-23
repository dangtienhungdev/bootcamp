import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/root-layout';
import { urls } from './lib/urls';
import CoursePage from './pages/course';
import HomePage from './pages/home';
import PaymentPage from './pages/payment';
import StudentPage from './pages/students';
import StudentPageV2 from './pages/students-v2';
import CreateStudentPage from './pages/students-v2/create';
import StudentDetailPage from './pages/students-v2/detail/[studentId]';
import StudentEditPage from './pages/students-v2/edit/[studentId]';

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
			{
				path: urls['students-v2'],
				element: <StudentPageV2 />,
			},
			{
				path: urls['student-create'],
				element: <CreateStudentPage />,
			},
			{
				path: urls['student-edit'],
				element: <StudentEditPage />,
			},
			{
				path: urls['student-detail'],
				element: <StudentDetailPage />,
			},
		],
	},
]);

export default routes;
