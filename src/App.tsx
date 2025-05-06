import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './layouts/root-layout';
import ContactPage from './pages/contact';
import DetailPage from './pages/detail';
import HomePage from './pages/home';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'contact',
				element: <ContactPage />,
			},
			{
				path: 'detail/:userId',
				element: <DetailPage />,
			},
		],
	},
]);

const App = () => {
	// nested router
	return (
		// <Routes>
		// 	<Route path="/" element={<HomePage />}>
		// 		<Route path="contact" element={<ContactPage />} />
		// 		<Route path="detail" element={<DetailPage />} />
		// 	</Route>
		// </Routes>
		<RouterProvider router={routes} />
	);
};

export default App;
