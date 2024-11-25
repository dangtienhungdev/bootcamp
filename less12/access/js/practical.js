/*
kiểm tra xem ít nhất phải có một ngườ dùng có độ tuổi từ 30 đổ lên và có dạng trạng thái active là true
*/
const users = [
	{ id: 1, name: 'A', age: 25, active: true },
	{ id: 2, name: 'B', age: 30, active: false },
	{ id: 3, name: 'C', age: 35, active: true },
	{ id: 4, name: 'D', age: 40, active: false },
];

function isUserActive(users) {
	// return users.some((user) => user.age >= 30 && user.active === true);
	return users.some(function (user) {
		return user.age >= 30 && user.active;
	});
}
console.log(isUserActive(users));

/* xoá user có id = 4, thêm 1 người dùng mới với {id: 10, name: 'E', active: true} vào vị trí cuối mảng */
function addNewUser(users, index, newUser) {
	// const index1 = users.findIndex(function (user) {
	// 	return user.id === index;
	// });
	// if (index1 !== -1) {
	// 	users.splice(index1, 1);
	// }
	// users.push(newUser);
	// return users;
	// users.splice(index - 1, 1);
	// users.splice(users.length, 0, { id: 10, name: 'E', active: true });
	// return users;
	//
	// for (let i = 0; i < users.length; i++) {
	// 	if (users[i].id === 3) {
	// 		users.splice(i, 1);
	// 		break;
	// 	}
	// }
	// users.push({ id: 10, name: 'E', active: true });
	// console.log('🚀 ~ addNewUser ~ users:', users);
}
// console.log(addNewUser(users, 3, { id: 10, name: 'E', active: true }));
// console.log(addNewUser(users, 3));
// addNewUser();
