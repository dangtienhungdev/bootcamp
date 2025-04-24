export interface GeoLocation {
	lat: string;
	lng: string;
}

export interface Address {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: GeoLocation;
}

export interface Company {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
}

// khả năng mở rộng: inteface thông qua từ khoá extends
export interface Employee extends User {
	salary: number;
}

// inteface không hỗ trợ Union trực tiếp, nhưng chúng ta có thể sử dụng Intersection Types (và kiểu)
interface Person {
	name: string;
}

interface Worker {
	job: string;
}

type WorkerWither = Person & Worker;

// khả năng kế thừa: inteface hỗ trợ kế thừa (implement) từ các đối tượng
interface Shape {
	color: string;
}

class Rectangle implements Shape {
	color: string;

	constructor(color: string) {
		this.color = color;
	}
}

// cho phép gộp nhiều interface thành cùng 1 tên interface duy nhất (merging)
interface Person {
	name: string;
}

interface Person {
	age: number;
}

const person: Person = {
	name: 'abc',
	age: 1223,
};

// định nghĩa ra cấu trúc đối tượng hoặc là 1 lớp
// khỗ trợ kế thừa và khai báo gộp
// tốt nhất khi được làm việc với các đối tượng hoặc mô  hình cấu trúc dữ liệu
