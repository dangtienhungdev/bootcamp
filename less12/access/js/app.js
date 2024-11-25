// 10. Đảo ngược một phần của mảng
// Mô tả: Mô tả: Viết hàm reverseSubArray(arr, start, end) để đảo ngược một phần
// của mảng từ chỉ số start đến end. Sử dụng forEach và push
// Ví dụ: console.log(reverseSubArray([1, 2, 3, 4, 5], 1, 3)); // [1, 4, 3, 2, 5]

// function reverseSubArray(arr, start, end) {
// 	// khởi tạo result để lưu lại kết quả sau khi thao tác với mảng ban đầu
// 	// đây là mảng được trả về sau khi hoàn thành việc đảo ngược
// 	const result = [];

// 	// dùng vòng lặp for dể thêm vào mảng result các phần tử array trước phần
// 	// cần đảo được (từ chỉ số 0 đến start - 1)
// 	for (let i = 0; i < start; i++) {
// 		result.push(arr[i]);
// 	}
// 	console.log(result);

// 	// thêm các phần đã đảo ngược
// 	for (let i = end; i >= start; i--) {
// 		result.push(arr[i]);
// 	}
// 	console.log(result);

// 	// thêm các phần tử
// 	for (let i = end + 1; i < arr.length; i++) {
// 		result.push(arr[i]);
// 	}

// 	return result;
// }

function reverseSubArray(arr, start, end) {
	if (!arr || arr.length == 0) {
		return console.log('mang rong');
	}
	const temp = [];
	arr.forEach(function (value, index) {
		if (index >= start && index <= end) {
			temp.unshift(value);
		}
	});
	let tempIndex = 0;
	for (let i = start; i <= end; i++) {
		arr[i] = temp[tempIndex];
		tempIndex++;
	}
	return arr;
}

/*
start = 1; end = 3
arr[0] = 1
arr[1] = 2
arr[2] = 3
arr[3] = 4
arr[4] = 5
*/

// console.log(reverseSubArray([1, 2, 3, 4, 5], 1, 3)); // [1, 4, 3, 2, 5]
