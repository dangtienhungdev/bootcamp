/*
3. Tính tổng các số từ 1 đến n không chia hết cho 3
Bài toán: Viết hàm sumNotDivisibleBy3(n) trả về
tổng các số từ 1 đến n mà không chia hết cho 3.

input: number
output: sum các số từ 1 đén n không chia hết cho 3
*/

function sumNotDivisibleBy3(number) {
	let sum = 0;

	for (let i = 0; i <= number; i++) {
		if (i % 3 !== 0) {
			sum += i;
		}
	}

	return sum;
}

console.log(sumNotDivisibleBy3(10));
