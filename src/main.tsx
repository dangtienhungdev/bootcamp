import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { AuthProvider } from './contexts/auth-context.context';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { Toaster } from './components/ui/sonner';
import { createRoot } from 'react-dom/client';
import { store } from './stores/store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AuthProvider>
					<App />
					<Toaster />
				</AuthProvider>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);
