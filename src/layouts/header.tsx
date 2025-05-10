import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';

const Header = () => {
	return (
		<header className="flex justify-end border-b p-4 gap-4">
			{/* search */}
			<div className="relative w-64">
				<Input type="text" placeholder="Search..." className="w-full pr-9" />
				<div className="absolute top-1/2 -translate-y-1/2 right-3">
					<Search className="text-gray-300" />
				</div>
			</div>

			{/* notification */}
			<button>
				<Bell className="w-5 h-5" />
			</button>
		</header>
	);
};

export default Header;
