import type { Product } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';

interface ProductState {
	products: Product[];
}

const initialState: ProductState = {
	products: [],
};

export const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		createProduct: (state, action) => {
			state.products.push(action.payload);
		},
	},
});

export const { createProduct } = productSlice.actions;

export default productSlice.reducer;
