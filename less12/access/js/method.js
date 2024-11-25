/*
6. some
7. every
8. splice
9. slice
10. replace
*/

/*
10: replace(): dùng để thay thế 1 chuỗi con trong chuỗi bằng 1 chuỗi mới.
- nó chỉ thay thế lần xuất hiện đầu tiên của chuỗi con
- để thay thế được tất các các lần xuất hiện, ta cần dùng biểu thức chính quy /g
*/
function replateFunc() {
	const str = 'hello world';
	console.log('🚀 ~ str:', str);
	const newStr = str.replace('world', 'Javascript');
	console.log('🚀 ~ newStr:', newStr);

	const fruits = 'apple, banana, apple';
	const newStrFruits = fruits.replace(/Apple/i, 'orange');
	console.log('🚀 ~ newStrFruits:', newStrFruits);
}

/*
slice(): tạo ra 1 mảng con từ mảng ban đầu mà không thay đổi mảng gốc. nó cắt ra 1 phần của mảng từ
chỉ số start đến chỉ số end, nhưng không bao gồm chỉ số end

cú pháp:
arr.slice(start, end)
- start(tuỳ chọn): chỉ bắt đầu
- end(tuỳ chọn): chỉ số kết thúc, không bao gồm phần tử ở chỉ số end
 */

function sliceFunc() {
	const arr = [1, 2, 3, 4, 5];
	const newArr = arr.slice(1, 4); // lấy các phần tử từ chỉ số thứ 1 đến 3
	const lastArr = arr[arr.length - 1];
	const newArr1 = arr.slice(1, -4);

	const fruits = ['apple', 'banana', 'apple'];
	const newFruits = fruits.slice(0, 2);
	console.log(newFruits);
}

/*
8. splice(): thay đổi mảng bằng cách thêm hoặc xoá các phần tử tại các chỉ số cụ thể.
Nó có thể chính sửa được mảng gốc và trả về các phần tử đã bị xoá

cú pháp:
arr.splice(start, deleteCount, item1, item2, ....)
- start: chỉ số bắt đầu
- deleteCount: số lượng phần tử mình muốn xoá
- item1, item2, ...:(tuỳ chọn) các phần tử cầm thêm vào mảng từ chỉ số start
*/
function spliceFunc() {
	const arr = [1, 2, 3, 4, 5];
	const arrCopy = arr.slice();
	// arr.splice(2, 2, 'a', 'b');
	// arrCopy.splice(arr.length, 0, 'a', 'b');
	arrCopy.splice(2, 1, 'x');
	console.log('🚀 ~ spliceFunc ~ arrCopy:', arrCopy);
}

/*
every(): kiểm tra xem tất cả các phần thử trong mảng có thoả 1 điều kiện hay không, nếu tất cả các phần tử trong
mảng thoả mãn điều kiện thì trả về là true, không thì sẽ trả về false
*/

function everyFunc() {
	const array = ['unlock', 'unlock', 'unlock', 'lock'];
	const result = array.every(function (value, index, array) {
		return value === 'unlock';
	});

	const skinLv60 = result ? 'unlock' : 'lock';
	console.log('🚀 ~ everyFunc ~ skinLv60:', skinLv60);
}

/*
some(): kiểm trả xem có ít nhất 1 phần tử trong mảng thoả mãn điều kiện được chỉ định hay không
nếu thoả màn trả về true, không thì sẽ trả về là false
*/

const courses = [
	{
		id: 1,
		name: 'Toán',
		score: 9,
	},
	{
		id: 2,
		name: 'Văn',
		score: 9,
	},
	{
		id: 3,
		name: 'Anh',
		score: 8,
	},
	{
		id: 4,
		name: 'Sử',
		score: 9,
	},
];

function someFunc() {
	const array = [1, 3, 3, 4, 5];
	// const result = array.some(function (value, index, array) {
	// 	return value % 2 === 0;
	// });
	// console.log('🚀 ~ result ~ result:', result);
	const result = courses.some(function (course) {
		return course.score < 8;
	});
	const message = result ? 'Không phải là học sinh giỏi' : 'Học sinh giỏi';
	console.log('🚀 ~ someFunc ~ message:', message);
}
someFunc();
