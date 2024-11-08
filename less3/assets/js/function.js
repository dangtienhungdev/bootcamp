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
// sayHello(); // khi có dấu () => dùng để thực thi hàm

function functionName1(parameters) {
	// các câu lệnh
	console.log('object');
	return 'objectFit';
}

// ex1: hàm không có tham số
function greet() {
	console.log('hello world!');
}
// greet();

// ex: hàm có tham số
function add(a, b) {
	return a + b;
}
// console.log(add(5));

// hàm với tham số mặc đinh
function mutiply(a, b = 2) {
	return a * b;
}

// console.log(mutiply(3));
// console.log(mutiply(3, 3));

// hàm nặc danh (anonymous function)
const square = function (x) {
	return x * x;
};
// console.log(square(5));

// hàm mũi tên (arrow function)
const substract = (a, b) => {
	// es6
	return a - b;
};
// console.log(substract(10, 4));

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
// console.log('-----------------------');
// console.log(counter());
// console.log(counter());

// cho 1 chương trình mẫu. gọi hàm callback để hiển thị kểt quả của a và b
// đầu vào: không có
// dầu ra: hiển thị kết quả tổng của a và b

// function add_two_number(sum1, a, b) {
// 	const sum = a + b;
// 	sum1(sum);
// }

// function result(sum) {
// 	console.log(sum);
// }

// function run() {
// 	const a = 5,
// 		b = 7;

// 	add_two_number(result, a, b);
// }

// run();

function sum(callback, number1, number2) {
	// callback là 1 func sẽ được gọi lại sau khi tính toán xong
	const total = number1 + number2;
	// a, b là 2 số cần cộng với nhau
	callback(total);
	// tính tổng của a và b sau đó lưu vào biến total
	// sau đó, hàm gọi callback(total) => hàm callback sẽ được thực thi và nhận total là đối sô
}

function display(total) {
	// hàm display nhận tham số là total
	console.log(`total is ${total}`);
	// chức năng in ra màn hình
}

function run() {
	// khai báo a, b
	const a = 1,
		b = 5;
	// gọi hàm sum(display, a, b) => nghĩa là chúng ta đang truyền display vào
	// làm callback và truyền a, b vào để tính tổng
	sum(display, a, b);
}

run();
/*
1. a và b được truyền vào hàm sum với giá trị là 1 và 5
2. hàm sum tính total = a + b, => total = 1 + 5 = 6
3. hàm sum gọi callback(total) => trong đó callback là display
4. hàm display được thực thi và nhận total = 6, và in ra màn hình total is 6
*/

function sayHello() {
	console.log('hello world!');
}

// setInterval(sayHello, 2000);
