/*
có 6 kiểu dữ liệu chia thành 3 loại chính
- nguyên thuỷ: string, number, boolean và các kiểu dữ liệu ngyên thuỷ khác
- hỗn hợp: Object, Array, Function (là tất cả các loại đối tượng)
- các loại dữ liệu đặc biệc: Undefined, Null
*/

// 1. String
var a = 'hi';

// let's have a cup of coffee
var b = "let's have a cup of coffee";

// 2. Number
var int = 25; // integer
var float = 40.5;
// console.log(16 / 0);
// console.log(-16 / 0);
// console.log(16 / -0);

// 3. NaN: not a number
// console.log('some text' / 2);
// console.log(Math.sqrt(-1));

// 4. boolean
var isReading = true;
var isSleeping = false;

var a1 = 1,
	b1 = 4,
	c1 = 5;

// console.log(b1 > a1); // true
// console.log(b1 > c1); // false

// 4. null: kiểu dữ liệu đặc biệt, chỉ có thể có 1 giá null. Giá trị null có nghĩa là không có giá trị
// var a2 = null;
// console.log('🚀 ~ a2:', a2);
// var b2 = 'hello world';
// console.log('🚀 ~ b2:', b2);
// b2 = null;
// console.log('🚀 ~ b2:', b2);

/*
5. object: là kiểu dữ liệu phức tạp cho phép mình lưu trữ các tập dữ liệu
- Một object chựa các thuộc tính, dược định nghĩa với 1 cặp key - value
- key (tên thuộc tính): luôn là 1 chuỗi
- value (giá trị): nó có thể là bất kì 1 loại dữ liệu nào
*/

var emptyObj = {};
var person = {
	name: 'Nguyen Van A',
	age: 36,
	car: {
		modal: 'BMW',
		color: 'white',
		doors: 4,
	},
};
// console.log('🚀 ~ person:', person);
var name = person.name;
var age = person.age;
// console.log(name);
// console.log(age);
var modal = person.car.modal;
// console.log('🚀 ~ modal:', modal);

// 6. Array
var colors = ['red', 'yellow', 'green', 'orange'];
console.log('🚀 ~ typeof color:', typeof colors);
console.log('typeof person: ', typeof person);
// console.log('🚀 ~ colors:', colors[3]);

// 7. function (kiểm hàm)
const abc = function () {
	return 'hello world';
};

// console.log(abc());
console.log(typeof abc);
