// thuộc tính array

/*
1. Array.length
=> trả về số phần tử trong 1 mảng. đó 1 số nguyên 32 bit không dấu và luôn lớn hơn chỉ mục lớn
nhất của mảng (chỉ mục lớn nhất chính là độ dài của mảng trừ đi 1)
*/

// byte
/*
số nguyên 32 bit (hay còn gọi là 4 byte)

1. số nguyên có dấu (signed integer)
- dài giá trị từ: -2^9 đến 2^9
- cấu trúc: 1 bít đầu tiên dùng để biểu diễn dấu (0 cho số lượng, 1 cho số âm) và 31 còn lại
biểu diễn giá trị tuyệt đối của số nguyên
ex: 1: 000000 000000 000000 000001

2. số nguyên không dấu (unsigned integer)
- dải giá trị: 0 ->  4 tỉ hơn
*/

/*
2. concat()
=> trả về 1 đối tượng mảng mới chứa 2 mảng hoặc nhiều mảng được hợp nhất
*/

// ex1: nối mảng
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = array1.concat(array2);
// console.log('🚀 ~ result:', result);

// ex2: nối nhiều mảng lại với nhau
const array3 = [7, 8, 9];
const result1 = array1.concat(array2, array3);
// console.log('🚀 ~ result1:', result1);

// ex3: nối mảng với các giá trị đơn lẻ
const result2 = array1.concat(4, 5);
// console.log('🚀 ~ result2:', result2);

// ex4: nối mảng rỗng
const array4 = [];
const result4 = array1.concat(array4);
// console.log('🚀 ~ result4:', result4);

/*
3. copywithin()
=> sao chép 1 phần tử của mảng đã cho bằng các phần tử của chính nó và trả vể 1 mảng có sửa đổi

cú pháp sử dụng:
array.copyWithin(target, start, end)
- target(bắt buộc): vị trí mà bạn muốn sao chép phần tử
- start(tuỳ chọn): vị trí bắt đầu sao chép
- end(tuỳ chọn): vị trí kết thúc sao chép
*/

// ex1: sao chép các phần tử trong mảng vào chính nó
const array5 = [1, 2, 3, 4, 5];
// sao chép phần tử từ chỉ sô 0 đến 2 (không bao gồm chỉ số 2) vào vị trí chỉ số 3
array5.copyWithin(3, 0, 2);
/*
mảng gốc: [1, 2, 3, 4, 5]
phương thức copyWithin(3, 0, 2) => sẽ sao chép phần tử từ chỉ số 0 đến 2 (các phần tử [1, 2])
vào vị trí bắt đầu từ chỉ số 3
mảng sau khi thay đổi: [1, 2, 3, 1, 2]
*/
// console.log('🚀 ~ array5:', array5);

// ex2: sao chép toàn bộ mảng vào vị trí khác
const array6 = [10, 20, 30, 40, 50];
array6.copyWithin(2); // sao chép toàn bộ mảng từ chỉ số 0 vào vị trí bắt đầu từ vị trí 2
// console.log('🚀 ~ array6:', array6);

// ex3: sao chép 1 phần tử của mảng vào 1 vị trí khác trong mảng
const array7 = [1, 2, 3, 4, 5]; // 2, 3, 4,
array7.copyWithin(2, 1, 4);
// array7.copyWithin(2, 1, 4): sao chép các phần tử từ chỉ số 1 đến 4 (các phần [2, 3, 4])
// console.log('🚀 ~ array7:', array7);

/*
4. includes(): kiểm tra xem mảng có chứa trong mảng hay không

cú pháp:
array.includes(element, start)
- element(bắt buộc): phần tử mà mình muốn kiểm tra xem có tồn tại trong mảng hay không
- start (tuỳ chọn): chỉ số bắt đầu tìm kiếm
*/

// ex1: kiểm tra xem phần tử có trong mảng không
const array8 = [1, 2, 3, 4, 5];
// console.log(array8.includes(3)); // output: true
// console.log(array8.includes(6)); // output: false

// // ex2: kiểm trả phần tử ở 1 vị trí cụ thể
// console.log(array8.includes(4, 3)); // output: true => if (4 === 3) return false
// console.log(array8.includes(2, 3)); // output: false

/*
5. fill()
=> thay thế tất cả, hoặc một phần của mảng bằng 1 giá trị của thể. nó thay đổi mảng gốc và không
tạo ra mảng mới

cú pháp:
array.fill(value, start, end)
- value (bắt buộc): giá trị mà bạn muốn thay thé vào phần tử của mảng
- start(tuỳ chọn): vị trí bắt đầu thay thế
- end(tuỳ chọn): vị trí kết thúc thay thế
*/

// ex1:
const array9 = [1, 2, 3, 4, 5]; // 2, 3, 4,
// array9.fill(0);
array9.fill(0, 1, 4);
// console.log('🚀 ~ array9:', array9);

// ex2:
const array10 = ['a', 'b', 'c', 'd', 'e'];
array10.fill('x', 2, 5);
// console.log('🚀 ~ array10:', array10);

// ex3:
const array11 = [{}, {}, {}];
const obj = { name: 'New Object' };
array11.fill(obj);
// console.log('🚀 ~ array11:', array11);

// ex4:
const array12 = [
	{ name: 'nguyen van a' },
	{ name: 'nguyen van b' },
	{ name: 'nguyen van c' },
];
const newObject = { name: 'New Object' };
array12.fill(newObject);
// console.log('🚀 ~ array12:', array12);
// console.log('🚀 ~ array12:', array12[0] === array12[1]);

/*
6. join()
=> kết hợp các phần tử của một mảng dưới dạng 1 chuỗi

cú pháp:
array.join(separator)
- separator(tuỳ chọn): dấu phần cách giữa các phần tử
*/
const array13 = ['apple'];
const array14 = ['apple', 'banana', 'cherry'];
console.log('🚀 ~ array13:', array13);
console.log('🚀 ~ array14:', array14);
const result14 = array13.join(' - ');
const result15 = array14.toString();
console.log('🚀 ~ result14:', result14);
console.log('🚀 ~ result15:', result15);

/*
7. toString()
=> kết hợp các phần tử của một mảng dưới dạng 1 chuỗi

cú pháp:
array.toString()
*/
