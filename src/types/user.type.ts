export type GeoLocation = {
	lat: string;
	lng: string;
};

export type Address = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: GeoLocation;
};

export type Company = {
	name: string;
	catchPhrase: string;
	bs: string;
};

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
};

// khả năng mở rộng: type không thể "extends", nhưng có thể kết hợp các "type" bằng cách sử dụng (&) intersection type
export type Employee = User & {
	salary: number;
	isMale: boolean;
};

// khả năng kết hợp (Unions (|) and Intersection Types (&))
// dễ dàng kết hợp các kiểu type với nhau thông qua union và Intersection Types.
// -> tính năng mạnh mẽ của type mà interface không có

// union type (hoặc kiểu)
type Status = 'active' | 'inactive';

// Intersection Types (và kiểu)
type Contact = {
	email: string;
	name: string;
};

type ContactWithAddress = Contact & Address;

// type không hỗ trợ khả năng kế thừa
// không hỗ trợ gộp kiểu  (merging)

// định nghĩa nhiều kiểu dữ liệu phức tạp như union, Intersection
// không hỗ trợ khai báo gộp
