// mục đích: các bạn hiểu được khái niệm func (hàm) và cách sử dụng trong thực tế
/*
1. giảm sự lặp code trong chương trình
2. giúp các dòng code dễ bảo trì hơn
*/

// khai báo và gọi 1 function
function functionName() {
	// code to be executed
}

function sayHello() {
	console.log('Hello bae!');
}

sayHello; // khi không có dấu ngoặc () => chỉ tham chiếu đến hàm mà không thực thi nó
sayHello(); // khi có dấu () => dùng để thực thi hàm

function functionName1(parameters) {
	// các câu lệnh
	console.log('object');
	return 'objectFit';
}

// ex1: hàm không có tham số
function greet() {
	console.log('hello world!');
}
greet();

// ex: hàm có tham số
function add(a, b) {
	return a + b;
}
console.log(add(5));

// hàm với tham số mặc đinh
function mutiply(a, b = 2) {
	return a * b;
}

console.log(mutiply(3));
console.log(mutiply(3, 3));

// hàm nặc danh (anonymous function)
const square = function (x) {
	return x * x;
};
console.log(square(5));

// hàm mũi tên (arrow function)
const substract = (a, b) => {
	// es6
	return a - b;
};
console.log(substract(10, 4));

// hàm trả về 1 hàm(callback function)
function makeCounter() {
	let count = 1; // khởi tạo bién count với giá trị 1
	return function () {
		// anonymous function
		count += 1; // tăng giá trị lên 1
		return count; // giá trị mới của count
	};
}

// closure: cho phép duy trì trạng thái giữa các lần gọi hàm
const counter = makeCounter();
console.log('-----------------------');
console.log(counter());
console.log(counter());
