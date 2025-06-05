import instance from '@/configs/instance';
import type { UserType } from '@/types/user.type';

export const getAllUser = async (): Promise<UserType[]> => {
	const response = await instance.get('/users');
	return response.data;
};

export const getDetailUser = async (id: string): Promise<UserType> => {
	const response = await instance.get(`/users/${id}`);
	return response.data;
};
