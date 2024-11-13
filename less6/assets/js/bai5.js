/**
5. Đếm số lần xuất hiện của ký tự trong chuỗi
Bài toán: Viết hàm countCharacter(str, char)
trả về số lần xuất hiện của ký tự char trong chuỗi str.

input: str, char: ký tự muốn tìm
output: count

*/

const str = 'javascript'; // a => 2

function countCharacter(str, char) {
	let count = 0;

	// for (let i = 0; i < str.length; i++) {
	// 	if (str[i] === char) {
	// 		count++;
	// 	}
	// }

	for (const character of str) {
		console.log('🚀 ~ countCharacter ~ character:', character);
		if (character === char) {
			count++;
		}
	}

	return count;
}

console.log(countCharacter('javascript', 't'));
