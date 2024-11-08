/**
cho 1 mảng các số tự nhiên. In ra các số trong mảng đó với điều kiện
- bỏ qua số đó nếu số đó chia hết cho 4;
- thoát khỏi vòng lặp nếu số đó chia hết cho cả 4 và 3
*/

const run1 = () => {
	const datas = [1, 3, 4, 6, 12, 5, 4, 9];

	for (const num of datas) {
		if (num % 4 === 0 && num % 3 === 0) {
			break;
		}

		if (num % 4 === 0) {
			continue;
		}

		console.log(num);
	}
};

/*
cho 1 chuỗi str_input. viết chương trình đảo ngược chuỗi và in ra kết quả màn hình
ex: str_input: "data" => atad
*/
const str_input = 'data';
const run2 = () => {
	let print = '';
	for (let i = str_input.length - 1; i >= 0; i--) {
		print += str_input[i];
	}
	console.log(print);
};

/*
cho 1 so n; sử dụng while để in ra các số chẵn từ 1 -> n
n = 7; => in ra: 2, 4, 6
*/
const run3 = (n) => {
	let i = 2;
	while (i <= n) {
		console.log(i);
		i += 2;
	}
};

run3(10);
