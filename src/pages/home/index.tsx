import { urls } from '@/lib/urls';
import type { StatCard as StatCardType } from '@/types/stat-card';
import { Bookmark, DollarSign, GraduationCap, User } from 'lucide-react';
import StatCard from './components/stat-card';

const HomePage = () => {
	const statsData: StatCardType[] = [
		{
			id: 1,
			icon: GraduationCap,
			title: 'Students',
			value: 243,
			link: urls.students,
			bgColor: 'bg-[#f0f9ff]',
			iconColor: 'text-[#74C1EE]',
		},
		{
			id: 2,
			icon: Bookmark,
			title: 'Course',
			value: 12,
			link: urls.course,
			bgColor: 'bg-[#FEF6FB]',
			iconColor: 'text-[#EE95C5]',
		},
		{
			id: 3,
			icon: DollarSign,
			title: 'Payments',
			value: (
				<>
					<span className="text-lg font-normal">INR</span> <br />
					556,000
				</>
			),
			link: urls.payment,
			bgColor: 'bg-[#FEFBEC]',
			iconColor: 'text-[#F6C762]',
		},
		{
			id: 4,
			icon: User,
			title: 'Users',
			value: 243,
			link: urls.students,
			bgColor: 'bg-[#FEAF00]',
			iconColor: 'text-white',
			textColor: 'text-white',
		},
	];

	return (
		<div className="grid grid-cols-4 gap-6">
			{statsData.map((stat) => {
				return <StatCard key={stat.id} {...stat} />;
			})}
		</div>
	);
};

export default HomePage;
