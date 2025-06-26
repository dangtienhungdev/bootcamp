import { authApi } from '@/apis/admin.api';
import type { LoginForm } from '@/pages/login/page';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
	const result = useMutation({
		mutationKey: [authApi.login.name],
		mutationFn: (payload: LoginForm) => authApi.login(payload),
	});

	return result;
};
