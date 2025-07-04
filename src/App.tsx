import { RouterProvider } from 'react-router-dom';
import { CategoryProvider } from './contexts/category-context.context';
import { router } from './routes';

function App() {
	return (
		<CategoryProvider>
			<RouterProvider router={router} />
		</CategoryProvider>
	);
}

export default App;
