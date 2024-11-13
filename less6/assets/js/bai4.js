/*
4. Kiểm tra một chuỗi có chứa ký tự số hay không
Bài toán: Viết hàm hasNumber(str) kiểm tra xem chuỗi str
có chứa bất kỳ ký tự số nào không. Trả về true nếu có, ngược lại trả về false.

input: str
output: boolean

*/

const number = '1';
// console.log('🚀 ~ number:', !Number(number));

function hasNumber(str) {
	for (let i = 0; i < str.length; i++) {
		// if (str[i] >= '0' && str[i] <= '9') {
		// 	return true;
		// }
		// if (!Number(str[i]) && str[i] !== '') {
		// 	return true;
		// }
		if (Number(str[i]) && typeof str[i] === 'string' && str[i] !== '') {
			return true;
		}
	}

	return false;
}

console.log(hasNumber('hello world 1 2 3'));
