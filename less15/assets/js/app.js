/*
1. declaration function (hàm khai báo)

- không cần phải gán hàm vào một biến

** cú pháp
function name(params) {
  --thân hàm
}

ex:
function greet(name) {
	console.log('hello ' + name);
}
greet('tín');
*/

/*
2. expression function (biểu thức hàm)

** cú pháp
const functionName = function(params) {
  -- thân hàm
}

ex:
const greet = function (name) {
	console.log('hello ' + name);
}
*/

/*
3. arrow function (hàm mũi tên)

** cú pháp
const functionName = (params) => {
  -- thân hàm
}


ex:
const greet = (name) => {
	console.log(`hello ${name}`);
};
*/

/*
4. anonymous function (hàm vô danh)

- được sử dụng làm callback, được sử dụng trong các biểu thức hàm
- có thể gán cho biến hoặc truyền vào các hàm khác

** cú pháp
const functionName = function() {
  - thân hàm
}

ex:
setTimeout(function () {
	console.log(`hello world 1`);
}, 2000);
*/

/*
5. IIFE(Immediately Invoked Function Expression)

-- là hàm tự gọi ngay sau khi được định nghĩa

** cú pháp:
(function () {
  -- thân hàm
})()
*/

/*
6. constructor function (hàm khởi tạo)

cú pháp:
function ContructorFuction(parameters) {
  this.property = value
}
=> hàm khởi tạo dùng để tạo ra các đối tượng mới. khi các bạn gọi hàm này với từ khoá "new",
một đối tượng mới sẽ được tạo ra và "this" sẽ tham chiếu đến đối tượng đó

ex:
function Person(name, age) {
	this.name = name;
	this.age = age;
}

const person1 = new Person('Đạt', 30);
console.log('🚀 ~ person1:', person1);
const person2 = new Person('Dũng', 33);
console.log('🚀 ~ person2:', person2);

*/

/*
7. generator function (hàm generator)

-- hàm generator sử dụng từ khoá "function*" và có thẻ trả về nhiều giá trị qua "yield".
-- ta có thể "tạm dừng" và "tiếp tục" bằng cách xử dụng phương thức ".next()"

** cú pháp
fucntion* generatorFunctionName() {
  yield value
}

ex:
function* countUp() {
	yield 1;
	yield 2;
	yield 3;
}

const counter = countUp();
console.log('🚀 ~ counter:', counter.next().value);
console.log('🚀 ~ counter:', counter.next().value);
console.log('🚀 ~ counter:', counter.next().value);

*/

/*

----- tổng kết lại -----
- function declaration: hàm khai báo, có thể được gọi trước khi khai báo
- function expression: hàm gán cho biến, khai báo ra trước khi sử dụng
- arrow function: hàm ngắn gọn func expression, không có "this"
- anonymous func: hàm không tên, dùng trong callback
- IIFE: hàm gọi ngay sau khi khai báo
- contructor func: dùng để tạo ra các đối tượng mới
- generator function: có thể "tạm dừng" và "tiếp tục", trả về được nhiều giá trị thông qua "yield"

*/
