/*
2. Tìm số lẻ lớn nhất trong mảng
Bài toán: Viết hàm maxOdd(arr)
tìm số lẻ lớn nhất trong mảng. Nếu không có số lẻ nào, trả về null.

const numbers = [2, 4, 6, 8, 9, 1, 3]
*/
const numbers = [2, 4, 6, 8, 9, 11, 3];

function maxOdd(numbers) {
	let maxOdd = null;

	// for (let i = 0; i < numbers.length; i++) {
	// 	if (numbers[i] % 2 !== 0) {
	// 		if (maxOdd === null || numbers[i] > maxOdd) {
	// 			maxOdd = numbers[i];
	// 		}
	// 	}
	// }

	for (let numberItem of numbers) {
		if (numberItem % 2 !== 0) {
			if (maxOdd === null || numberItem > maxOdd) {
				maxOdd = numberItem;
			}
		}
	}

	// return maxOdd === null ? null : maxOdd;
	// if (maxOdd) {
	// 	return maxOdd;
	// }
	// return null;

	if (maxOdd === null) {
		return null;
	} else {
		return maxOdd;
	}
}

console.log(maxOdd(numbers));
