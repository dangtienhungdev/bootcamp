/*
sử dụng map để tạo ra 1 mảng mới với các giá trị gấp đôi mảng cũ
const array = [1, 2, 3, 4, 5]
output: [2, 4, 6, 8, 10]
*/
function doubled() {
	const array = [1, 2, 3, 4, 5];
	const result = array.map(function (value) {
		return value * 2;
	});
	console.log(result);
}

function sum() {
	const array = [1, 2, 3, 4, 5];
	let sum = 0;
	// for (const number of array) {
	// 	sum += number;
	// }
	// console.log(sum);
	const result = array.forEach(function (value, index, array) {
		sum += value;
		return value * 2;
	});
	console.log(sum);
	console.log('🚀 ~ result ~ result:', result);
}

/*
lọc mảng array để tìm ra các số chẵn trong mảng
const array = [1, 2, 3, 4, 5, 6]
*/
function evens() {
	const array = [1, 2, 3, 4, 5, 6];
	// const even = [];
	// for (const number of array) {
	// 	if (number % 2 === 0) {
	// 		even.push(number);
	// 	}
	// }
	// return even;
	const result = array.filter(function (value, index, array) {
		return value % 2 === 0;
	});
	// const result = array.filter((value) => value % 2 === 0);
	return result;
}

/*
sử dụng findIndex để thay đổi giá trị phần trong mảng
const array = [1, 2, 3, 4, 5, 6]
if element = 3 => 30
[1, 2, 30, 4, 5]
*/
function changeValue() {
	const array = [1, 2, 3, 4, 5, 6];
	let index = array.findIndex(function (value, index, array) {
		// return index === 2;
		return value === 30;
	});
	console.log('🚀 ~ index ~ index:', index);

	if (index !== -1) {
		array[2] = 30;
	}
	console.log(array);
}

/*
tìm ra người có tên dài nhất
output: { id: 1, name: 'hoang', age: 30 }
*/

function findNameUser() {
	const array = [
		{ id: 1, name: 'hoang', age: 30 },
		{ id: 2, name: 'chi', age: 40 },
		{ id: 3, name: 'tín', age: 50 },
		{ id: 4, name: 'dũng', age: 50 },
		{ id: 5, name: 'đạt', age: 50 },
	];

	let person = array[0]; // { id: 1, name: 'hoang', age: 30 },
	const result = array.forEach(function (value, index, array) {
		if (value.name.length > person.name.length) {
			person = value;
		}
	});
	console.log(person);

	// return person;
	// let longesName = array[0];
	// for (const names of array) {
	// 	if (names.name.length > longesName.name.length) {
	// 		longesName = names;
	// 	}
	// }
	// console.log(longesName);
}
findNameUser();

console.log(object);
// echo "hello world"
// laravel => vue/nuxt
