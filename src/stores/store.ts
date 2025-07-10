import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productApi } from '@/services/product.service';
import productReducer from './features/products/productSlice';
import storage from 'redux-persist/lib/storage';
import todoReducer from './features/todo/todoSlice';
import userReducer from './features/users/useSlice';

const persistConfig = {
	key: 'root',
	storage,
	version: 1,
	whitelist: ['todos'],
};

const rootReducer = combineReducers({
	todos: todoReducer,
	users: userReducer,
	products: productReducer,

	// RTK Query
	[productApi.reducerPath]: productApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(productApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
