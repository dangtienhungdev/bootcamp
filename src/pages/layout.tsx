import { Link, Outlet } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export default function Layout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center">
							<Link to="/" className="text-xl font-bold text-gray-900">
								CRUD App
							</Link>
						</div>
						<div className="flex space-x-4">
							<Link to="/">
								<Button variant="ghost">Trang chủ</Button>
							</Link>
							<Link to="/products">
								<Button variant="ghost">Sản phẩm</Button>
							</Link>
							<Link to="/categories">
								<Button variant="ghost">Danh mục</Button>
							</Link>
							<Link to="/categories-v2">
								<Button variant="ghost">Danh mục v2</Button>
							</Link>
							<Link to="/task">
								<Button variant="ghost">Task</Button>
							</Link>
							<Link to="/task-v2">
								<Button variant="ghost">Task v2</Button>
							</Link>
							<Link to="/product-v2">
								<Button variant="ghost">Product v2</Button>
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
