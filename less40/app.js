import { hello } from './lib.js';

/*
es6: ecmascript 6 (ES6)
=> phiên bản nâng cấp lớn nhất của JS, cung cấp nhiều tính năng mới cải thiện việc viết mã

=> lý do: các tính năng làm mã ngắn gọn và dễ bảo trì
*/

// 1. let và const (hoisting)
// const obj = { number: 2 };
// obj.number = 3;

// console.log(obj);
// console.log(obj.number);

// for (var i = 0; i < 3; i++) {
// 	setTimeout(function () {
// 		console.log(i);
// 	}, 1000);
// }

// for (let i = 0; i < 3; i++) {
// 	setTimeout(function () {
// 		console.log(i);
// 	}, 1000);
// }

// 2. arrow function
// => cung cấp cú pháp ngắn gọn để viết hàm

function add(a, b) {
	return a + b;
}

const add1 = (a, b) => a + b;

// const person = {
// 	name: 'Alice',
// 	greet: function () {
// 		setTimeout(() => {
// 			console.log(`Hello, ${this.name}`);
// 		}, 1000);
// 	},
// };
// person.greet();

// const person = {
// 	name: 'Alice',
// 	greet: () => {
// 		setTimeout(() => {
// 			console.log(`Hello, ${this.name}`);
// 		}, 1000);
// 	},
// };
// person.greet();

// 3. template literal
const name = 'nguyen van';
const age = 20;
// hello, my name is nguyen van and i am 20 years old
// console.log(`hello, my name is ${name} and i am ${age} years old`);
// console.log('hello, my name is ', name, ' and i am ', age, ' years old');

// 4. destructuring
// a). mảng
const array = [1, 2, 3];
// const x = array[0];
// const y = array[1];
// const z = array[2];
const [x, y, z, u] = array;
// console.log(x, y, z, u);
// b). object
const person = {
	name: 'A',
	age: 18,
};
// const namePerson = person.name;
// const agePerson = person.age;
const { name: namePerson, age: agePerson } = person;
// console.log(namePerson, agePerson);
// console.log('🚀 ~ name, age:', namePerson, agePerson);

// default params:
const greet = (name = 'nguyen van c') => {
	console.log(`hello, ${name}`);
};

// greet('a');

// rest, spread operator
const array1 = [1, 2, 3];

const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
// console.log(sum(1, 2, 3, 4, 5, 6));

// spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2);

// module
hello();
