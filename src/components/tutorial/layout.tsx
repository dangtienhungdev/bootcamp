import { ReactNode } from 'react';

type RootLayoutProps = {
	children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<div>
			<header>Đây là header</header>
			{children}
			<footer>Đây là footer</footer>
		</div>
	);
};

export default RootLayout;
