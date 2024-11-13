/*
tạo 1 object 'me' từ 'person'. sau đó gán 'name' và 'job'
của object 'me' từ dữ liệu được truyền vào và chạy func printIntroduce()
ex: cho name = 'dang', job = 'dev'
=> my name is dang. my job is dev
*/

const a = {
	x: 1,
	add_number: function () {
		const added_number = this.x + this.y;
		console.log('🚀 ~ added_number:', added_number);
	},
};

const b = Object.create(a);
b.y = 2;
b.add_number();

const person2 = {
	printIntroduce: function () {
		console.log(`My name is ${this.name} my job is ${this.job}`);
	},
};

const me = Object.create(person2);
me.name = 'dang';
me.job = 'dev';
me.printIntroduce();

// lấy ra tất cả các thuộc tính của obj và in chúng ra màn hình
const person3 = {
	fist_name: 'Đăng',
	last_name: 'Nam',
	age: 8,
	isMale: true,
};
console.log(Object.keys(person3));

for (const key of Object.keys(person3)) {
	console.log(key);
}

for (const value of Object.values(person3)) {
	console.log(value);
}
