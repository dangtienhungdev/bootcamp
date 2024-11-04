/*
1. toán tử số học: "+", "-", "*", "/", "%", "++", "--"
2. toán tử quan hệ: ">=", "<=", "==", "!=", ">", "<", "===", "!=="
3. toán tử logic
4. toán tử gán
5. toán tử typeof
*/

// viết chương trình đầu vào là 1 số "minutes", và chuyển đổi thành giây
// minutes = 3 => 180

function run(minutes) {
	const x = 60; // 60s
	const seconds = minutes * x;
	console.log(seconds);
}

// run(3);
// run(10);

// viết chương trình: cho 1 số a. Tìm ra phần dư của
// a chia 5
// a chia 2
// a chia 3
// a = 13
// => remainder of a divided by 5 is 3
// => remainder of a divided by 2 is 1
// => remainder of a divided by 3 is 1

function run1(a) {
	const b = a % 5;
	const c = a % 2;
	const d = a % 3;

	console.log('remainder of a divided by 5 is', b);
	console.log(
		'remainder of a divided by 2 is ' + c + 'remainder of a divided by 5 is' + b
	);
	console.log(
		`remainder of a divided by 3 is ${d} remainder of a divided by 5 is ${b}`
	);
}
// run1(13);

// so sánh toán tử ==, ===
const num1 = 2,
	num2 = '2',
	num3 = 2;

console.log(num1 === num2); // false
console.log(num1 == num3); // true

// ===
if (num1 == num2) {
	console.log(true);
}
