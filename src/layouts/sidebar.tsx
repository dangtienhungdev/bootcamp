import { urls } from '@/lib/urls';
import { cn } from '@/lib/utils';
import { Bookmark, CreditCard, GraduationCap, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
	// useLocation
	const location = useLocation();
	const pathName = location.pathname;

	const menus = [
		{ id: 1, path: urls.home, icon: <Home />, title: 'Home' },
		{ id: 2, path: urls.course, icon: <Bookmark />, title: 'Course' },
		{ id: 3, path: urls.students, icon: <GraduationCap />, title: 'Students' },
		{ id: 4, path: urls.payment, icon: <CreditCard />, title: 'Paymet' },
	];

	return (
		<div className="w-64 bg-[#F2EAE1]">
			{/* title */}
			<div className="p-6 border-l-4 border-l-[#FEAF00]">
				<h1 className="font-bold text-xl">CRUD OPERATIONS</h1>
			</div>

			{/* profile */}
			<div className="mt-8 flex flex-col items-center">
				<div className="w-32 mb-4 h-32 rounded-full overflow-hidden">
					<img
						src="https://picsum.photos/536/354"
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>

				<h2 className="text-lg font-semibold">ABC</h2>
				<p className="text-[#FEAF00] text-sm">Admin</p>
			</div>

			{/* menu */}
			<div className="mt-10">
				{menus.map((menuItem) => {
					return (
						<Link
							to={menuItem.path}
							key={menuItem.id}
							className={cn(
								'flex items-center gap-3  py-3 px-6',
								{ 'text-white bg-[#FEAF00]': menuItem.path === pathName },
								{ 'hover:bg-gray-200': menuItem.path !== pathName }
							)}
						>
							{menuItem.icon}
							{menuItem.title}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
