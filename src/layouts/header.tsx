import { useState } from 'react';
import { Link } from 'react-router';

const Header = () => {
	const menus = [
		{
			path: '/',
			title: 'Trang chủ',
		},
		{
			path: '/detail',
			title: 'Sản phẩm chi tiết',
		},
		{
			path: '/contact',
			title: 'Liên hệ',
		},
	];

	const [menuActice, setMenuActice] = useState<string>(menus[0].path);

	return (
		<header className="flex gap-6 w-full justify-center py-6">
			{menus.map((menu) => {
				return (
					<Link
						key={menu.path}
						to={menu.path}
						className={`${
							menu.path === menuActice
								? 'font-semibold text-blue-400 underline'
								: ''
						}`}
						onClick={() => setMenuActice(menu.path)}
					>
						{menu.title}
					</Link>
				);
			})}
		</header>
	);
};

export default Header;
