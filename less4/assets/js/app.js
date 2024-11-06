/*
if (condition) {
....
}
*/
//

// vieets 1 chương trình kiểm tra số n xem có phải là chẵn lẻ hay không
const run = (n) => {
	if (n % 2 === 0) {
		console.log('N la so chan');
	} else {
		console.log('N la so le');
	}
};

// cho 3 số a, b, c. Hoàn thành chương trình để in ra số lớn nhất
const findNumberMax = (a, b, c) => {
	let max = a;
	if (a >= b && a >= c) {
		max = a;
	} else if (b >= a && b >= c) {
		max = b;
	} else {
		max = c;
	}
	console.log(max);
};

const findMax2 = (a, b, c) => {
	let max = a;
	if (b > max) {
		max = b;
	}
	if (c > max) {
		max = c;
	}
	console.log(max);
};

// viết chương trình kiểm tra 1 năm bất kì và in ra màn hình năm đó là năm nhuận hay khongo
// năm đó là năm nhuận vưới đk là
// năm đó chia hết cho 4 => có thể là năm nhuận => nhưng năm đó mà chia hết
// cho 100 thì phải check thêm điều kiện có chia hết cho 400 hay không
const checkYear = (year) => {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
		console.log('nam nhuan');
	} else {
		console.log('nam khong nhuan');
	}
};
// checkYear(3000);

// check tuổi dưới 18 là trẻ thành niên, 18 -> dưới 60 là trưởng thành, trên 60 là già
// nếu đèn đỏ thì dùng lại, đèn xanh thì đi nhanh, đèn vàng đi chậm

// làm bài toán sắp xếp cho 4 số a, b, c, d mà in ra theo thứ tự giảm dần
const sort = (a, b, c, d) => {
	if (a < b) {
		let num = a;
		a = b;
		b = num;
	}
	if (a < c) {
		let num = a;
		a = c;
		c = num;
	}
	if (a < d) {
		let num = a;
		a = d;
		d = num;
	}
	if (b < c) {
		let num = b;
		b = c;
		c = num;
	}
	if (b < d) {
		let num = b;
		b = d;
		d = num;
	}
	if (c < d) {
		let num = c;
		c = d;
		d = num;
	}

	return [a, b, c, d];
};
console.log('🚀 ~ sort ~ sort:', sort(9, 2, 4, 5));
