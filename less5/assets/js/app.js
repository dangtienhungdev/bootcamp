// for -loop
// for (initialization; condition; increment) {
// 	// code to be executed
// }

/*
for (i = 0; i < 10; i++) {
  console.log(i)
}

*/

// initialization: có cũng được, không có cũng được
let i = 0;
let len = 10;
let text = '';
for (; i < len; i++) {
	text += i + '-';
}

// condition: thường xử dụng để đánh giá điều kiện của biến ban đầu
// nếu condition trả về true, vòng lặp sẽ bắt đầu lại, nếu nó trả về false vòng lặp end

// increment: tăng giá trị của biến ban đầu
// tăng âm (i--), tăng dương (i++, i = i + 15)
// có thể được bỏ qua (khi các bạn tăng giá trị của mình bên trong vòng lặp)

let x = 0;
for (; i < len; ) {
	text += i + ' - ';
	// i++;
}

// sử dụng for cho string loop
const str = 'javascript';
// for (i = 0; i < str.length; i++) {
// 	console.log(str[i]);
// }

// cho 1 số n. Viết chương trình để tính toán in ra màn hình giai thừa của số đã nhập vào
// ex: n = 3 => !3 => 3 * 2 * 1 => 6
// ex: n = 5 => !5 => 5 * 4 * 3 * 2 * 1
function run(n) {
	if (n === 0 || n === 1) return 1;

	let result = 1;
	for (let i = 1; i <= n; i++) {
		result *= i;
	}

	return result;
}

// for .. in: được dùng cho object => lặp qua các thuộc tính của đối tượng
const person = {
	first_name: 'Hung',
	last_name: 'Lan',
	age: 40,
	address: {
		city: 'nam dinh',
		zip: '100000',
	},
};

// let personItem;
// for (personItem in person) {
// 	console.log(person[personItem]);
// }

// for ... of:
const numbers = [2, 4, 5, 6];
const users = [
	{ id: 1, name: 'A', age: 12 },
	{ id: 2, name: 'B' },
];
// for (const num of numbers) {
// 	console.log(num);
// }
// for (const [index, user] of users.entries()) {
// 	console.log(index, user);
// }
// users.entries(): trả về interator chứa các cặp giá trị [index, user]

// sử dụng for-of: để các bạn tính tổng các số dương trong 1 array
// input: [0, -2, -4, 4, 5]
const main = () => {
	const array = [0, -2, -4, 4, 5];

	let sum = 0;

	for (const num of array) {
		if (num > 0) {
			sum += num;
		}
	}

	console.log(sum);
};

// while: xử lý 1 biểu thức điều kiện và 1 khổi lệnh được lặp lại cho đến khi giá trị của
// biểu thức là false
/*
while (condition) {
  // handle logic
}
*/

let index = 0;
// while (index++ <= 5) {
// 	console.log(index + ' ');
// }

// do-while: tương tự như while, xử lý 1 biểu thức điều kiện và 1 khối lệnh được lặp
// lại cho đến khi giá trị của biểu thức cho ra giá trị là false
/*
do {
  handle logic
} while (condition)
*/

// do {
// 	console.log(index + ' ');
// } while (index++ <= 5);

// break/ continue
/*
break: được xử dụng để nhảy ra khỏi 1 vòng lặp
=> phá vỡ vòng lặp và tiếp tục thực thi mã sau vòng lặp (nếu có)

*/
let desc = '';
// for (i = 0; i < 10; i++) {
// 	if (i === 3) {
// 		break;
// 	}
// 	desc += `the number is ${i} \n`;
// }
// console.log(desc);

/*
continue: phá vỡ 1 lần lặp (trong vòng lặp), nếu một điều kiện được xác định xảy ra và
tiếp tục với lần lặp tiếp theo trong vòng lặp
*/

for (i = 0; i <= 10; i++) {
	if (i === 3) {
		continue;
	}
	desc += `the number is ${i} \n`;
}
console.log(desc);
