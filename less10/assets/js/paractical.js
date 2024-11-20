/*
viết 1 chương trình chuyển mảng thành chuỗi, nhưng trong đó các phần tử của mảng được sắp xếp theo
thứ tự đảo ngược
*/

const arrayOrigin = [1, 2, 3, 4, 5];

const reverseArrayToString = (array) => {
	let result = array.reverse().join(', ');
	return result;
};
// console.log(reverseArrayToString(arrayOrigin));

const array = [1, 2, 3, 2, 1];

/*
viết 1 chương trình kiểm tra xem mảng có phải là đối xứng hay không
*/
const isArraySymmetric = (array) => {
	// for (let i = 0; i < array.length / 2; i++) {
	// 	if (array[i] !== array[array.length - 1 - i]) {
	// 		return false;
	// 	}
	// }
	// return true;

	const reverseArr = [];
	// đảo ngược lại mảng bằng cách sử dụng vòng lặp
	for (let i = array.length - 1; i >= 0; i--) {
		reverseArr.push(array[i]);
	}

	// kiểm tra tính đối xứng từng phần tử
	for (let i = 0; i < array.length; i++) {
		if (array[i] !== reverseArr[i]) {
			return false; // nếu có sự khác biệt
		}
	}

	return true; // nếu k có sự khác biệt  nào
};
console.log(isArraySymmetric(array));
console.log(isArraySymmetric(arrayOrigin));
