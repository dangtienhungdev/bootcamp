// Array (mảng) là 1 đối tượng đại diện cho một tập hợp các loại phần tử tương tự
const numbers = [1, 2, 3, 4];
console.log(typeof numbers);

/*
1. by array literal (theo nghĩa đen)
ex: const arrayname = [value1, value2, ...value_n]
const array_name = ['tin', 'dung', 'dat']

2. bằng cách tạo cá thể của Array trực tiếp (dùng từ khoá new)
ex: const array_name = new Array()
array_name[0] = 'tin'
array_name[1] = 'dat'
array_name[2] = 'dung'

3. sử dụng Array contructor (dùng từ khoá new)
const array_name = new Array('tin', 'dung', 'dat')

*/

// const array_name = new Array();
// array_name[0] = 'tin';
// array_name[1] = 'dat';
// array_name[2] = 'dung';
// console.log('🚀 ~ array_name:', array_name);

const array_name = new Array('tin', 'dung', 'dat');
// console.log('🚀 ~ array_name:', array_name);
