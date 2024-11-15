const user = {
	clone(obj) {
		// obj: {city: 'xyz', street: 'main st'}
		// obj: {
		//   name: 'abc',
		//   age: 20,
		//   address: 'Ha Noi',
		//   addressDetail: {
		//     street: 'Main st',
		//     city: 'xyz',
		//   },
		// };
		// logic
		// return Object.assign({}, obj);
		// Array.isArray(obj)
		const cloneObj = {};

		for (let key in obj) {
			console.log(obj[key]);
			// if (typeof obj[key] === 'object' && obj[key] !== null) {
			// 	cloneObj[key] = this.clone(obj[key]);
			// } else
			console.log('🚀 ~ clone ~ cloneObj[key]:', cloneObj[key]);
			console.log(
				'🚀 ~ clone ~ cloneObj[key] = obj[key]:',
				(cloneObj[key] = obj[key])
			);
			cloneObj[key] = obj[key];
			console.log(cloneObj);
			// cloneObj: {address: "ha noi"}
			// if (obj.hasOwnProperty(key)) {
			// 	cloneObj[key] === obj[key];
			// }
		}

		return cloneObj;
		// for (let [key, value] in obj.entries(user1)) {
		// 	return (userCloned[(key, value)] = [key, value]);
		// }
	},
};

const user1 = {
	name: 'abc',
	age: 20,
	address: 'Ha Noi',
	addressDetail: {
		street: 'Main st',
		city: 'xyz',
	},
	test1: null,
	test2: {},
};

const userCloned = user.clone(user1);
console.log('🚀 ~ useCloned:', userCloned);
