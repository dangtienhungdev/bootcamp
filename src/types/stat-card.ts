import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type StatCard = {
	id: number;
	icon: LucideIcon;
	title: string;
	value: number | ReactNode;
	link: string;
	bgColor: string;
	iconColor: string;
	textColor?: string;
};
