// 1 object là 1 thực thể có trạng thái và hành vi (properties & method).
// js là một ngôn ngữ dựa trên các đối tượng. mọi thế đề là 1 đối tượng trọng js

/*
có 3 cách khai báo đối tượng:

1. by object literal (theo nghĩa đen)
const datas = {property1: value1,property2: value2, property3: value3,... }
ex:
const datas = {
  name: 'tín',
  age: 18,
  address: 'sài gòn'
}

2. bằng cách toạ ra 1 đối tượng trực tiếp (sử dụng từ khoá new)
const objectname = new Object();
objectname.property1 = value1;
objectname.property2 = value2;
objectname.property3 = value3;
ex:
const datas = new Object()
datas.name = 'dũng'
datas.age = 19
data.address = 'Hồ Chí Minh City'

3. sử dụng object constructor (using new keyword)
function emp(id, name, salary) {
  this.id = id;
  this.name = name;
  this.salary = salary;
}
const e = new emp(1, 'đạt', 100)

*/

const data1 = {
	name: 'tín',
	age: 18,
	address: 'sài gòn',
};
// console.log('🚀 ~ data1:', data1.name);

const data2 = new Object();
data2.id = 123;
data2.name = 'Đạt';
data2.age = 19;
// console.log(data2);

function user(id, name, address) {
	this.id = 345;
	(this.name = 'dũng'), (this.address = 'ha noi');
}
const userObject = new user(1, 'abc', 12);
// console.log('🚀 ~ userObject:', userObject['name']);

/*
method

1. Object.entries() => trả về 1 mảng với các mảng của các tên thuộc tính, giá trị
*/

const person = {
	id: 1,
	name: 'nguyen van a',
	age: 30,
	job: 'dev',
};
// console.log('🚀 ~ person:', person);

const entries = Object.entries(person);
console.log('🚀 ~ entries:', entries);

/*
2. Object.assign() => sử dụng để sao chép các thuộc tính có thể đếm được và
sở hữu từ 1 đối tượng nguồn sang 1 đối tượng đích
*/
// đối tượng nguồn
const source1 = { name: 'John', age: 30 };
const source2 = { job: 'dev', city: 'new york' };
const source3 = { name: 'dang tien hung' };

// đối tượng đích
const target = {};
// console.log('🚀 ~ target:', target);
Object.assign(target, source1, source2, source3);
// console.log('🚀 ~ target:', target);

/*
3. Object.create() => tạo 1 đối tượng mới với các thuộc tính và đối tượng nguyên mẫu được chỉ định

- ứng dụng của Object.create()
1. chỉ định cho prototype cho đối tượng mới
=> giúp ta tạo đối tượng tự 1 prototype đã có, thay vì sử dụng các phương thức tạo đối
tượng thông qua hàm contructor
2. thiết kế kế thừa (inheritance)
=> Object.create() cung cấp 1 cách dễ dàng và trực tiếp để thiết lập 1 mối quan hệ kế thừa đối tượng
3. tạo 1 đối tượng k kế thừa từ Object.prototype
=> khi mình muốn tạo ra 1 đối tượng thuần tuý, không cso các phương pháp có sẵn từ Object.prototy()

*/

// đối tượng prototy
const animal = {
	speaks: true,
	speak() {
		console.log('Hello');
	},
};

const dog = Object.create(animal);
dog.name = 'Chó cỏ';
// console.log(dog.name);
// dog.speak();

// 3.2: tạo 1 đổi tượng mà k có prototype (rỗng)
const source4 = Object.create(null);
source4.name = 'no property';
// console.log('🚀 ~ source4:', source4);

// 4. Object.getPrototypeOf() => lấy ra các nguyên mẫu ban đầu của 1 đối tượng
// console.log(Object.getPrototypeOf(dog));

// 5: 1 số phương thức quan trọng của Object.property
// 5.1: toString() => trả về 1 chuỗi mô tả đối tượng. phương thức này thường ghi đè trong các đối tượng con để trả về thông tin chi tiết hơn
// console.log('🚀 ~ source1:', source1.toString());
// const person = {
// 	id: 1,
// 	name: 'nguyen van a',
// 	age: 30,
// 	job: 'dev',
// };
/*
5.2: hasOwnProperty: kiểm tra xem object coó tồn tại thuộc tính nhất định hay không
*/
// console.log(person.hasOwnProperty('id'));
// console.log('🚀 ~ person:', person);
// console.log(person.hasOwnProperty('salary'));

// 5.3: valueOf() => trả về giá trị nguyên thuỷ của đối tượng
// console.log(person.valueOf());

/*
5.4: isPrototypeOf() => kiểm tra xem đối tượng có phải là prototype của đối tượng khác hay không
*/

const animal1 = {
	speak() {
		console.log('hello');
	},
};
const dog1 = Object.create(animal1);
// console.log(dog1);
// console.log(animal1.isPrototypeOf(dog));

/*
6. Object.key(): chỉ lấy ra key và trả về dạng mảng cho chúng ta
*/
console.log(Object.keys(person));

/*
7. Object.values()
*/
console.log(Object.values(person));

// ads thủ
// typescript
