/*
1. toán tử spread(...)

cú pháp:
const array1 = [1, 2, 3]
let array2 = [...array1, 4, 5]

** gỉai thích
- toán tử spread(...) được dùng để phân tách các phần tử của 1 mảng
hoặc đối tượng ra thành phần tử riêng biệt

** ứng dụng
- dùng để copy mảng hoặc đối tượng

const array1 = [1, 2, 3];
const array2 = [...array1];
console.log('🚀 ~ array2:', array2);

const person = {
	name: 'ABC',
	age: 18,
};

const person2 = {
	...person,
	address: 'Ha Noi',
};
console.log('🚀 ~ person2:', person2);
*/

/*
2. toán tử rest(...)
const sum = (...numbers) => {
	console.log('🚀 ~ sum ~ numbers:', numbers);
	return numbers.reduce(function (acc, number) {
		return acc + number;
	}, 0);
};
// console.log(sum(1, 2, 3, 4, 5));

const display = (name, age, ...rest) => {
	console.log('🚀 ~ display ~ name:', name);
	console.log('🚀 ~ display ~ age:', age);
	console.log('🚀 ~ display ~ rest:', rest);
};

display('Dang Van A', 18);
display('Dang Van B', 20, 'Dev');
display('Dang Van C', 22, 'Dev', 'Ha Noi', 'abcbcc', 'ahshs');
*/

/*
3. toán tử destructuring(phá vỡ đối, mảng)

3.1: mảng
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log('🚀 ~ a, b, c:', a, b);
console.log('🚀 ~ rest:', rest);

3.2: object
const person = {
	name: 'Nguyen Van A',
	age: 25,
	address: 'Nam Dinh',
	job: 'dev',
	isMale: false,
};
const { name, ...rest } = person;
console.log('🚀 ~ name, age:', name, rest);
*/

/*
4. toán tử template literal (chuỗi mẫu)

const name = "alice",
const age = 12
console.log(`hello ${name} ${age}`)
*/

/*
5. toán tử ternary (toán 3 ngồi)

const diToo = age >= 18 ? true : false
console.log(diToo)
*/

/*
6. toán tử Object property shorthand
const name = 'A';
const age = 18;

const person = { name, age };
console.log('🚀 ~ person:', person);
*/

/*
7. toán tử array method shorthand

const numbers = [1, 2, 3];
const doubled = numbers.map((number) => number * 2);
console.log('🚀 ~ doubled ~ doubled:', doubled);
*/

/*
8. toán tử Set và Map

8.1. set
const uniqueNumbers = [1, 2, 3, 3, 4];
const result = new Set(uniqueNumbers);
console.log('🚀 ~ result:', result);

8.2. map
const map = new Map();
map.set('name', 'Nguyen Van A');
map.set('age', 18);
console.log(map.get('name'));
*/

/*
9. toán tử Exponentiation(**)
console.log(2 ** 3)
*/

/*
10: toán tử async/await
*/
