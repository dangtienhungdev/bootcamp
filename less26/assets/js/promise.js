// console.log('abc 1');

// setTimeout(() => {
// 	console.log('1234');
// }, 100);

// console.log('abc 2');

// setTimeout(() => {
// 	console.log('12345');
// }, 100);

// không bất đồng bộ: setTimeout, setInterval, promise, fetch, async/await, callback
/*
1. khái niệm: promise là gì?
- là 1 đối tượng trong js -> đại diện cho 1 giá trị có thể chưa được xác định(kết quả của bất đồng bộ)
-> giúp cho chúng ta xử lý bất đồng 1 cách dễ dàng hơn
*/

// cấu trúc promise
// let promise = new Promise(function (resolve, reject) {
// 	// xử lý logic bất đồng bộ
// });

/*
- các trạng của promise:
1. pending (chờ): khi promise được tạo ra nhưng chưa hoàn thành
2. fulfilled (hoàn thành): khi xử lý logic bất đồng bộ thành công và được promise trả về giá trị
3. rejected (từ chối): khi xử lý logic bất đồng bộ thất bại và promise trả về giá trị thất bại
*/

/*
cách hoạt động
1. khi một promise được tạo ra nó sẽ ở trạng thái pending
2. sau tác vụ bất đồng bộ hoàn thành (thành công || thất bại) => promise chuyển trạng thái
sang fulfilled || rejected
3. ta có thể sử dụng các phương thức .then(), .catch(), .finally() để xử lý kết quả của promise
*/

/*
cách sử dụng promise trong js
*/
let promise = new Promise(function (resolve, reject) {
	const success = true;
	if (success) {
		resolve('Task done!');
	} else {
		reject('Task faild ahihihi!');
	}
});

// promise
// 	.then(function (data) {
// 		console.log(data);
// 		return 'ahiihiihi';
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 		return 123;
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	})
// 	.finally(function () {
// 		// được gọi bất kể thành công hay thất bại
// 		console.log('end.');
// 	});

function delay(ms) {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(`Done ${ms}`);
		}, ms);
	});
	return promise;
}

// delay(4000).then((message) => {
// 	console.log(message);
// });

// ví dụ 2: promise với nhiều bất đồng bộ
const task1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(`Tác vụ 1 done!`);
	}, 1000);
});

const task2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(`Tác vụ 2 done!`);
	}, 2000);
	// reject('task 2 failed!');
});

// task1
// 	.then((result) => {
// 		console.log(result);
// 		return task2;
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	});

/*
1. promise.all
-> nhận vào 1 mảng các promise và trả về một promise chỉ resolve khi mà tất cả các promise trong
mảng đều thành công

2.promice.race:  nhận vào 1 mảng các promise và trả về một promise khi mà kết quả của nó là kết
quả của promise đầu tiên hoàn thành(dù thành thành công hay thất bại)
*/
// Promise.all([task1, task2])
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// Promise.race([task1, task2])
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
