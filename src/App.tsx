import { RouterProvider } from 'react-router-dom';
import routes from './routes';

/*
--npm/npx
1. npm (node package manager)
-> chức năng chính: dùng để cài đặt, quản lý các package
-> cần phẩm cài package vào trong dự án

2. npx (node package execute)
-> chức năng chính: dùng chạy trực tiếp 1 package mà không cần cài trước
*/

function App() {
	return <RouterProvider router={routes} />;
}

export default App;
