import { cn } from '@/lib/utils';
import type { StatCard as StatCardType } from '@/types/stat-card';

import { Link } from 'react-router-dom';

const StatCard = ({
	icon: Icon,
	title,
	id,
	value,
	link,
	bgColor,
	iconColor,
	textColor = 'text-gray-400',
}: StatCardType) => {
	return (
		<Link to={link} className="block">
			<div
				className={cn(
					'flex justify-between p-6 cursor-pointer rounded-lg',
					bgColor
				)}
			>
				<div>
					{/* <GraduationCap className="w-10 h-10 text-[#74C1EE]" /> */}
					<Icon className={cn('w-10 h-10', iconColor)} />
					<p className={cn('mt-4', textColor)}>{title}</p>
				</div>
				<div className="text-right">
					<p className="font-bold text-4xl">{value}</p>
				</div>
			</div>
		</Link>
	);
};

export default StatCard;
