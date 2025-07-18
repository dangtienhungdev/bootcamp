import Footer from './components/footer'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	)
}

export default RootLayout
