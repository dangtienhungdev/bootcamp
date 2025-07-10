import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from './stores/store';

import App from './App';
import { AuthProvider } from './contexts/auth-context.context';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { Toaster } from './components/ui/sonner';
import { createRoot } from 'react-dom/client';

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
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider>
						<App />
						<Toaster />
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);
