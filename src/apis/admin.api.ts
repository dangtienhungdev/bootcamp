import axiosInstance from '@/configs/instances/axios';
import type { LoginForm } from '@/pages/login/page';
import type { LoginResponse } from '@/types/auth.type';
import type { BaseResponse } from '@/types/common.type';
import type { AxiosResponse } from 'axios';

export const authApi = {
	login: (
		payload: LoginForm
	): Promise<AxiosResponse<BaseResponse<LoginResponse>>> => {
		return axiosInstance.post<BaseResponse<LoginResponse>>(
			'/admins/login',
			payload
		);
	},
};
