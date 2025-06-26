import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/auth-context.context';

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
			<AuthProvider>
				<App />
				<Toaster />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
