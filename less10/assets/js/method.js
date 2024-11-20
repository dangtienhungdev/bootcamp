/*
1. lastIndexOf()
=> tìm kiếm phần tử được chỉ định trong mảng đã cho và tả về chỉ mục (index) cuối cùnglastIndexOf()

cú pháp:
1. mảng
array.lastIndexOf(element, start)
- element: phần tử cần tìm
- start(tuỳ chọn): ví trí bắt đầu tìm kiếm, nếu k có mặc định là toàn bộ mảng

2. chuỗi
string.lastIndexOf(searchValue, start)
- searchValue: giá trị cần tìm
- start(tuỳ chọn): vị trí bắt đầu, nếu không có, mặc định là tìm từ cuối chuỗi
*/

const array = [1, 2, 3, 4, 2, 5];
// console.log(array.lastIndexOf(2)); // 4
// console.log(array.lastIndexOf(2, 3)); // 4, 1
array[0] = 1;
array[1] = 2;
array[2] = 3;
array[3] = 4;
array[4] = 2;
array[5] = 5;

const array2 = [1, 2, 3, 2, 1];
// console.log(array2.lastIndexOf(2, 3)); // 4, 1

array2[0] = 1;
array2[1] = 2;
array2[2] = 3;
array2[3] = 2;
array2[4] = 1;
// lastINfo

const str = 'Hello, world!';
// console.log(str.lastIndexOf('o')); // 8

const array3 = [1, 2, 3, 4, 5];
// console.log(array3.lastIndexOf(6)); // -1

const str1 = 'hello world, hello universe';
// console.log(str1.lastIndexOf('hello')); // 13

const str2 = 'banana'; // 3
// console.log(str2.lastIndexOf('a', 3));
str2[0] = 'b';
str2[1] = 'a';
str2[2] = 'n';
str2[3] = 'a';
str2[4] = 'n';
str2[5] = 'a';

/*
2. indexOf(): tìm kiểm phần tử được chỉ địn trong mảng đã cho và khi tìm thấy trả index đầu tiên

cú pháp:
1. mảng
array.indexOf(element, start)
- element: phần tử cần tìm
- start(tuỳ chọn): ví trí bắt đầu tìm kiếm, nếu k có mặc định là index = 0

2. chuỗi
string.indexOf(searchValue, start)
- searchValue: giá trị cần tìm
- start(tuỳ chọn): vị trí bắt đầu, nếu không có, mặc định là tìm từ index = 0
*/

const array4 = [1, 2, 3, 4, 2, 5];
console.log('🚀 ~ array4:', array4);
// console.log(array4.indexOf(2));
// console.log(array4.indexOf(2, 2));
// console.log(array4.indexOf(6));
// console.log(str2.indexOf('a', 2));

/*
3. push()
=> thêm 1, hoặc nhiều phần tử vào cuối mảng

cú pháp:
array.push(elemen1, element2, ...element3)
*/
// const newLength = array4.push(9, 4, 5, 6);
// console.log('🚀 ~ array4.push(9, 4, 5, 6):', newLength);
// console.log('🚀 ~ array4:', array4);

/*
4. pop()
=> xoá đi phần tử cuối cùng của 1 mảng
*/
const newLength = array4.pop();
// console.log('🚀 ~ newLength:', newLength);
// console.log(array4);
const array5 = [];
// array5.pop();
// const newLength3 = array5.pop();
// console.log('🚀 ~ newLength3:', newLength3);
// console.log(array5);

/*
5. reverse()
=> đảo ngược lại các phần tử trong array
*/
const array6 = [1, 2, 3, 4];
// array6.reverse();
console.log('🚀 ~ array6:', array6);
console.log(array6.toReversed());

/*
6. shift()
=> xoá và trả về phần tử đầu tiên của mảng

pop >< shift
push >< unshift
*/

const array7 = [5, 2, 3, 4];
// const removedElement = array7.shift();
// console.log('🚀 ~ removeElement:', removedElement);
// console.log('🚀 ~ array7:', array7);

/*
7. unshift
=> thêm phần thử vào đầu mảng
*/
array7.unshift(3, 4, 5);
console.log('🚀 ~ array7:', array7);

/*
8. sort()
=> trả về mảng đã được sắp xếp theo thứ tự
*/

array7.sort();
console.log('🚀 ~ array7:', array7);

/*

1. forEarch
2. map
3. filter
4. find
5. findIndex
6. some
7. every
8. splice()
9. slice()
10. replace()
11. reduce()

*/

/*
1. length
2. concat
3. copywithin
4. includes
5. fill
6. join
7. toString
8. lastIndexOf
9. indexOf
10. push
11. pop
12. reverse
13. shift
14. unshift
15. sort
*/
