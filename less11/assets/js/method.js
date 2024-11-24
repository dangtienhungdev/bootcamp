/*
1. forEach
2. map
3. filter
4. find
5. findIndex
6. some
7. every
8. splice
9. slice
10. replace
*/

const products = [
	{ id: 1, name: 'Samsung S24', price: 1000 },
	{ id: 2, name: 'Iphone 16', price: 1200 },
	{ id: 3, name: 'Xiaomi', price: 800 },
	{ id: 4, name: 'Bphone', price: 0 },
	{ id: 5, name: 'Vivo', price: 100 },
	{ id: 6, name: 'Redmi', price: 800 },
];

// for (let i = 0; i < products.length; i++) {
// 	const product = products[i];
// 	console.log('🚀 ~ product:', i);
// }

// for (const [index, product] of products.entries()) {
// 	console.log('🚀 ~ product:', index);
// 	console.log('🚀 ~ product:', product);
// }

// const result = products.forEach(function (value, index, array) {
// 	return value.name;
// 	// console.log('🚀 ~ result ~ array:', array);
// 	// console.log('🚀 ~ result ~ index:', index);
// 	// console.log(product);
// });
// console.log('🚀 ~ result ~ result:', result);

// tạo mảng mới chỉ chưa tên các sản phẩm
// const result = products.map(function (product, index) {
// 	// return product.name;
// 	return product.price > 500;
// });
// console.log('🚀 ~ result ~ result:', result);

/* filter: lọc ra các phần tử và trả về 1 mảng mới chỉ chứa các phần tử thoả mãn điều kiện */
// const result = products.filter(function (product, index, array) {
// 	return product.price > 500;
// });
// console.log('🚀 ~ result ~ result:', result);

/* find: tìm ra các phần tử đầu tiên thoả mãn điều kiện và trả về phần tử đó  */
// const result = products.find(function (product, index, array) {
// 	return product.price === 800;
// });
// console.log('🚀 ~ result ~ result:', result);

/* findIndex: tìm chỉ số của phần tử đầu tiên thoả mãn điều kiện */
const result = products.findIndex(function (product, index, array) {
	return product.price === 800;
});
console.log('🚀 ~ result ~ result:', result);
