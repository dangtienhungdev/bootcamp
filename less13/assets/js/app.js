// reduce()

/*
reduce: là 1 phương thức rất mạnh dùng để 'tích luỹ' (aggregate) các giá trị trong mảng thành 1 giá trị duy nhất.

cú pháp cơ bản của reudce():
array.reduce(function (accumulator, value, index, array) {}, initialValue)
- accumulator: giá trị tích luỹ(hoặc kết quả cuối cùng) trong mỗi lần lặp qua mảng.
Trong mỗi lần hàm, "accumulator" sẽ lưu lại giá trị của phép toán trước đó
- currentValue(value): phần tử hiện tại trong mảng
- currentIndex(index)(tuỳ chọn): chỉ mục của các phần tử
- array(tuỳ chọn): mảng gốc của chúng ta
- initialValue(tuỳ chọn): giá trị ban đầu của "accumulator". nếu không cung cấp
giá ban đầu, giá trị của phần đầu tiên trong mảng sẽ được dùng làm giá trị khởi tạo.
Nếu mảng rỗng không có "initialValue", sẽ xảy ra lỗi
*/

const numbers = [1, 2, 3, 4, 5];
// let sum = 0; // initialValue

// for (let i = 0; i < numbers.length; i++) {
// 	sum += numbers[i];
// }

// console.log(sum);
// const total = numbers.reduce(function (accumulator, currentValue) {
// 	const sum = accumulator + currentValue;
// 	// console.table({ accumulator, currentValue, sum });
// 	return sum;
// }, 0);
// console.log('🚀 ~ total ~ total:', total);

// const cart = [
// 	{ item: 'Apple', price: 10 },
// 	{ item: 'Banana', price: 20 },
// 	{ item: 'Orage', price: 30 },
// ];

// let totalPrice = 0;
// for (let i = 0; i < cart.length; i++) {
// 	totalPrice += cart[i].price;
// }
// console.log('🚀 ~ totalPrice:', totalPrice);

// const totalPrice = cart.reduce(function (accumulator, currentItem) {
// 	return accumulator + currentItem.price;
// }, 0);
// console.log('🚀 ~ totalPrice ~ totalPrice:', totalPrice);

const users = {
	name: 'Dang Tien Hung',
	age: 40,
	address: 'Hà nội',
};
let property = users.name;
let name1 = users['name'];

function countFruits() {
	const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

	const countFruits = fruits.reduce(function (accumulator, currentItem) {
		if (accumulator[currentItem]) {
			accumulator[currentItem] += 1;
		} else {
			accumulator[currentItem] = 1;
		}

		return accumulator;
	}, {});
	console.log('🚀 ~ countFruits ~ countFruits:', countFruits);
}
// countFruits();

function newName() {
	const person = [
		{ id: 1, name: 'A', age: 10 },
		{ id: 2, name: 'B', age: 20 },
		{ id: 3, name: 'C', age: 30 },
	];

	// output: ['A', 'B', 'C']
	const names = person.reduce(function (acc, value) {
		acc.push(value.name);
		return acc;
	}, []);
	console.log(names);

	const names2 = person.reduce(function (acc, value) {
		acc.push(value.name);
		return acc;
	}, []);
	console.log('🚀 ~ names2 ~ names2:', names2);
}
// newName();

// chuyển mảng thành object
function personObjs() {
	const person = [
		{ id: 1, name: 'A', age: 10 },
		{ id: 1, name: 'B', age: 20 },
		{ id: 3, name: 'C', age: 30 },
	];

	// output: {1: 'A', 2: 'B', 3: 'C'}

	const output = person.reduce(function (acc, value) {
		console.log('🚀 ~ output ~ acc:', acc);
		acc[value.id] = value.name; // {1: 'A', 2: 'B'}
		console.log('🚀 ~ output ~ acc[value.id]:', acc[value.id]);
		return acc;
	}, {});
	console.log('🚀 ~ output ~ output:', output);
}
// personObjs();

/*
1. tìm giá trị lớn nhất trong
const numbers = [5, 12, 8, 130, 44]
out: 130

2. const nestedArray = [[1, 2, 3], [4, 5], [6, 7, 8]]
output: [1, 2, 3, 4, 5, 6, 7, 8]

3. group by array
const products = [
	{ id: 1, name: 'Laptop', category: 'Eletronices' },
	{ id: 2, name: 'Shirt', category: 'Clothing' },
	{ id: 3, name: 'Phone', category: 'Eletronices' },
	{ id: 4, name: 'Pants', category: 'Clothing' },
];

output:
const result = {
	Eletronices: [
		{ id: 1, name: 'Laptop', category: 'Eletronices' },
		{ id: 3, name: 'Phone', category: 'Eletronices' },
	],
	Clothing: [
		{ id: 2, name: 'Shirt', category: 'Clothing' },
		{ id: 4, name: 'Pants', category: 'Clothing' },
	],
};

*/
