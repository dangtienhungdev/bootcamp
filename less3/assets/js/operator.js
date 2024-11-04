// Tìm 2 số khi biết tổng và hiệu. Cho 2 số là tổng và hiệu của 2 số a và b.
// viết func tính toán a và b và in ra màn hình
/*
ex: sum = 10, different = 2: kết quả trả về là 6, 4
*/
function run(sum, different) {
	const a = (sum + different) / 2;
	const b = (sum - different) / 2;

	return [a, b];
}

// console.log(run(10, 2));

/*
Để tìm 2 số a và b khi biết tổng và hiệu =>
  a = (sum + different) / 2
  b = (sum - different) / 2
*/

// ==, ===

const a = '1';
const c = 1;

// console.log(a == c); // true
// console.log(a === c); // false
