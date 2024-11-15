/**

3. phương thức để sao chép 1 đổi tượng
đề bài: tạo 1 đối tượng car với phương thức clone để copy toàn bộ thuộc tính và phương
thức của nó sang 1 dối tượng mới

4. check xem thuộc tính có tồn tại ở bên trong đối tượng hay không
cho phương thức hasProperty kiểm tra xem thuộc tính đã cho có tồn tại hay không

5. tạo ra 1 phương thức getInfo in ra thông tin đối tượng dưới dạng chuỗi name, brand
`Name is ${name}, Brand is ${brand}`

6. tạo 1 phương thức kiểm tra xem 1 object  có rỗng hay không, checkIsEmpty

*/
// console.log(this);
const car = {
	brand: 'BMW',
	model: 'I8',
	name: 'abc',
	// clone....
	clone() {
		// console.log(this);
		return Object.assign({}, this);
	},
	hasProperty(property) {
		return this.hasOwnProperty(property);
	},
	getInfo() {
		return `Name is ${this.name}, Brand is ${this.brand}`;
	},
	checkIsEmpty(obj) {
		return Object.keys(obj).length === 0;
	},
};
// console.log('🚀 ~ car:', car);

const car3 = { test: '1' };

const car2 = car.clone();
// console.log(car.hasProperty('age'));
// console.log(car.hasProperty('name'));
// console.log(car.getInfo());
// console.log(car2);
// const car2 = car.clone()
// console.log("🚀 ~ car2:", car2)
// console.log(car.checkIsEmpty({ test: 1 }));
