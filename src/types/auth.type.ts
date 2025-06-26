import type { LoginForm } from '@/pages/login/page';

// authentication/ authorization
export type AdminType = {
	_id: string;
	username: string;
	email: string;
	role: string;
	lastLogin: string;
	createdAt: string;
	updatedAt: string;
};

export type LoginResponse = {
	admin: AdminType;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
};

export type AuthContextType = {
	admin: AdminType | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	login: (data: LoginForm) => void;
};
