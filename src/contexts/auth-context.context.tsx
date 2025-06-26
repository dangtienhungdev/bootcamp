// useContext

import type { AdminType, AuthContextType } from '@/types/auth.type';
import { createContext, useContext, useState } from 'react';

import { useLogin } from '@/hooks/admins/useAuth';
import type { LoginForm } from '@/pages/login/page';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	//logic

	const [admin, setAdmin] = useState<AdminType | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const { mutate: loginMutation, isPending } = useLogin();

	const login = (data: LoginForm) => {
		loginMutation(data, {
			onSuccess: (response) => {
				const { admin, accessToken } = response.data.data;

				setAdmin(admin);
				setAccessToken(accessToken);
				setIsAuthenticated(true);

				// set local storage
				localStorage.setItem('admin', JSON.stringify(admin));
				localStorage.setItem('accessToken', accessToken);
			},
			onError: (error) => {
				toast.error(error?.message || 'Đăng nhập thất bại');
			},
		});
	};

	const value: AuthContextType = {
		admin,
		accessToken,
		isAuthenticated,
		login,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
