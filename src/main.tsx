import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRoot } from 'react-dom/client'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
)
