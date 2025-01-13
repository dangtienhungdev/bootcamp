// viết 1 function promise mô phỏng việc đọc dữ liệu từ file (dùng setTimeout để fake time đọc).
// hàm này trả về 1 promise nếu file tồn tại thì resolve, không thì rejected
const availabelFiles = ['file1.txt', 'file2.txt', 'file3.txt'];

const readFile = (fileName) => {
	return new Promise((resolve, reject) => {
		console.log(`Reading ${fileName}...`);

		setTimeout(() => {
			if (availabelFiles.includes(fileName)) {
				resolve(`Read ${fileName} done!`);
			} else {
				reject(`Read ${fileName} faild!`);
			}
		}, 2000);
	});
};

// readFile('file1.txx')
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((result) => {
// 		console.log(result);
// 	})
// 	.finally(() => {
// 		console.log('done!');
// 	});

/**
bài 2: để mock tải 3 ảnh từ url khác nhau, khi tất cả cá ảnh được tải xong, ta sẽ hiển thị
chúng lên trang web. dùng promise all chắc chắn 3 link đều sống thì mới cho resolve
*/

// new Image()

// const image = new Image();
// image.src =
// 	'https://cdn-i.vtcnews.vn/resize/th/upload/2021/04/07/ek6qycqxiaiyiun-11052098.jpg';

// console.log(image);

const imageUrls = [
	'https://cdn-i.vtcnews.vn/resize/th/upload/2021/04/07/ek6qycqxiaiyiun-11052098.jpg',
	'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
	'https://kenh14cdn.com/2019/2/24/3561716420480213454575853861059020806684672n-15510057259571546306615.jpg',
];

const loadImage = (url) => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = url;

		image.onload = () => {
			resolve(image);
		};

		image.onerror = () => {
			reject(`Lỗi ảnh ${url}`);
		};
	});
};

Promise.all(imageUrls.map((url) => loadImage(url)))
	.then((results) => {
		results.forEach((image) => {
			const container = document.createElement('div');
			container.style.padding = '100px';
			container.appendChild(image);
			document.body.appendChild(container);
		});
	})
	.catch((error) => {
		console.log(error);
	});
