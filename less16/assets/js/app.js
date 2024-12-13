// dom: document object model: một mô hình đối tượng của tài liệu. đại diện cho cấu trúc của trang web dưới dạng cây
// mỗi phẩn tử trong html(h1, p, div) được biểu diễn như một đối tượng tỏng DOm
// DOM: cho phép js truy cập và thay đổi nội dung, cấu trúc, kiểu dáng của trang web

/*
cấu trúc của DOM:
** lý thuyết: DOM được tổ chức dưới dạng cây tree (tree structure) với "root" là 1 document(thường là <html>)
  - các phần thử trong HTML là "node" trong cây DOM

** các loại node trong DOM
1. element node: đại diện cho các phần thử trong HTML(div, h1, ...)
2. text node: đại diện văn bản trong phần thử HTML(phần giữa nằm trong vị trí thẻ mở và thẻ đóng)
3. attribute node: đại diện các thuộc tính của phần tử HTML(href, type, ...)
*/

/*
cách để truy cập vào các phần tử trong DOM
1. getElementById(): lấy ra phần tử thông qua Id
const element = document.getElementById('myId');
console.log('🚀 ~ element:', element);
** chỉ sử dụng được khi trong element đó có id & trỏ đến đúng id mà các bạn khai báo

2. getElementsByClassName(): truy xuất vào element thông qua class
console.log('🚀 ~ element:', element);

3. getElementByTagName(): lấy ra các phần tử theo tử tên(tag)
const element = document.getElementsByTagName('h1');
console.log('🚀 ~ element:', element);

4. querySelector(): lấy ra các element khớp css selector
const element = document.querySelector('.header2');
console.log('🚀 ~ element:', element);

5. querySelectorAll(): lấy ra tất cả các element khớp css selector
const element = document.querySelectorAll('.common');
console.log('🚀 ~ element:', element);
*/

/*
thao tác với các phần tử trong DOM
1. thay đổi nội dung của phần tử trong HTML
- innerHTML
- innerText

2. thêm, xoá và thay đổi thuộc tính của element
- setAttribute(): thêm hoặc thay đổi giá trị của thuộc tính
const element = document.querySelector('.header2');
element.setAttribute('class', 'newClass');
console.log('🚀 ~ element:', element);

- getAttribute(): lấy ra giá trị của thuộc tính
const element = document.querySelector('.header2');
console.log(element.getAttribute('id'));

- removeAttribute(): xoá đi giá trị của thuộc tính
const element = document.querySelector('.header2');
element.removeAttribute('id');
console.log('🚀 ~ element:', element);
*/

/*
thêm & xoá element
- appendChild(): thêm 1 phần tử vào cuối phần tử cha
const element = document.querySelector('.header2');
const newElement = document.createElement('div');
newElement.innerHTML = '<button>Click me!</button>';
element.appendChild(newElement);

- removeChild(): xoá 1 phần tử con
const element = document.querySelector('.header2');
const button = document.querySelector('.btn');
element.removeChild(button);
*/

/*
thao tác với css thông qua DOM
- style: truy cập và thay đổi các thuộc tính css của phần tử
const element = document.querySelector('.header2');
element.style.color = 'white';
element.style.background = 'red';

- thêm css: classList
const element = document.querySelector('.header2');
element.classList.add('red');

- xoá css: classList
const element = document.querySelector('.header2');
element.classList.remove('red');


*/

/*
gán sự kiện
- sự kiện (event) là hành động hoặc hành vi mà người dùng thực hiện trên trang web
ex: click, di chuột...
const element = document.querySelector('.header2');
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
	element.classList.toggle('black');
});

*/
const btnHidden = document.querySelector('.btn-hidden');
const btnDisplay = document.querySelector('.btn-display');
const imageContainer = document.querySelector('.image-container');
console.log('🚀 ~ imageContainer:', imageContainer);

btnHidden.addEventListener('click', () => {
	imageContainer.classList.add('hidden');
});

btnDisplay.addEventListener('click', () => {
	imageContainer.classList.remove('hidden');
});
