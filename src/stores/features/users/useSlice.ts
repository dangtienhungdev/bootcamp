import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
};

export const useSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export default useSlice.reducer;
