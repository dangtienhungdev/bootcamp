/*
2. bài toán tạo phương thức đề thêm 1 thuộc tính vào đối tượng
đề bài: tạo 1 đối tượng person có phương thức addProperty để thêm 1 thuộc tính
mới vào đối tượng person

const person = {
  name: 'nguyen van a',
  ....
}

person.addProperty('age', 30)
console.log(person) => {name: 'nguyen van a', age: 30}

hint: person.name, person['name'], this., this[]
*/

const person = {
	addProperty: function (key, value) {
		console.log(this);
		this[key] = value;
	},
};

function addProperty(key, value) {
	console.log(this);
	this[key] = value;
}

// person.addProperty('age', 18);
// addProperty('age', 18);
// person.addProperty('name', 'nguyen van b');
// console.log('🚀 ~ person:', person);
