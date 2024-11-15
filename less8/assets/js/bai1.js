/*
1. bài toán: tạo đối tượng và phương thức để tính tổng các số trong mảng
đề bài: tạo 1 đối tượng có phương thức sum nhận 1 mảng các số và trả về tổng các số trong mảng

input: 1 mảng các số
output: tổng các số trong mảng

*/
const caculator = {
	sum: function (numbers) {
		let total = 0;
		for (const number of numbers) {
			if (typeof number === 'number' && !isNaN(number)) {
				total += number;
			}
		}
		return `total is ${total}`;
	},
};

// console.log(caculator.sum([1, 2, 3, 'nan', undefined, NaN]));
