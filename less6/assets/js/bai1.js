/*
1. Đếm số nguyên tố trong một mảng
Bài toán: Viết hàm countPrimes(arr) nhận vào một mảng arr các số nguyên và trả về số lượng
số nguyên tố trong mảng.

const arrays = [1, 2, 3, 4, 5, 6, 7, 8, 9]

input: number arrays
output: count (số lượng) số nguyên tố
*/

const arrays1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 11];

function isPrime(arrays) {
	let count = 0;

	for (let i = 0; i < arrays.length; i++) {
		let number = arrays[i];

		if (number <= 1) continue;

		let isPrime = true;

		for (let j = 2; j < number; j++) {
			if (number % j === 0) {
				isPrime = false;
				break;
			}
		}

		if (isPrime === true) {
			count++;
		}
	}

	return `Số lượng nguyên tố trong array là: ${count}`;
}

// console.log(isPrime(arrays1));
function isPrime1(number) {
	if (number <= 1) return false;

	for (let i = 2; i <= Math.sqrt(number); i++) {
		if (number % i === 0) return false;
	}

	return true;
}

function countPrimes(arrays) {
	let count = 0;

	for (let number of arrays) {
		if (isPrime1(number) === true) {
			count++;
		}
	}

	return count;
}

// console.log(countPrimes(arrays1));
// number = 36
// (2, 18), (3, 12), (4, 9), (6, 6) => Math.sqrt(36)
