/*
1. tìm giá trị lớn nhất trong mảng
const nums = [5, 12, 8, 130, 44]
*/

function findNumberMax() {
	const nums = [5, 12, 8, 130, 44];

	// let maxNum = nums.reduce(function (acc, value) {
	// 	console.table({ acc, value });
	// 	return acc > value ? acc : value;
	// }, 0);

	let maxNum = nums.reduce(function (acc, value) {
		// if (value > acc) {
		// 	return value;
		// } else {
		// 	return acc;
		// }
		console.table({ acc, value });

		// khi dũng ss value (số nguyên) với acc (mảng rỗng), js thực hiện phép so sánh giữa 1 số với 1 mảng
		// cụ thể, js chuyển mảng rỗng ([]) thành 1 số giá boolean (false)
		return value > acc ? value : acc;
	}, 0);

	console.log('🚀 ~ maxNum ~ maxNum:', maxNum);

	return maxNum;
}

/*
2. ép kiểu dữ liệu mảng về 2 chiều thành 1 chiều
const array = [[12, 3, 4], [4, 5, 6], [6, 7, 8]]
*/

function flatArray() {
	const array = [
		[12, 3, 4],
		[4, 5, 6],
		[6, 7, 8],
	];

	const flatArray = array.flatMap((item) => {
		console.log('🚀 ~ flatArray ~ item:', item);
		return item;
	});
	console.log('🚀 ~ flatArray ~ flatArray:', flatArray);

	// const flatArray = array.reduce(function (acc, value) {
	// 	return acc.concat(value);
	// }, []);
	// console.log('🚀 ~ flatArray ~ flatArray:', flatArray);
}
// flatArray();

/*
group by array
const products = [
  { id: 1, name: &#39;Laptop&#39;, category: &#39;Eletronices&#39; },
  { id: 2, name: &#39;Shirt&#39;, category: &#39;Clothing&#39; },
  { id: 3, name: &#39;Phone&#39;, category: &#39;Eletronices&#39; },
  { id: 4, name: &#39;Pants&#39;, category: &#39;Clothing&#39; },
];
output:
const result = {
  Eletronices: [
    { id: 1, name: &#39;Laptop&#39;, category: &#39;Eletronices&#39; },
    { id: 3, name: &#39;Phone&#39;, category: &#39;Eletronices&#39; },
  ],
  Clothing: [
    { id: 2, name: &#39;Shirt&#39;, category: &#39;Clothing&#39; },
    { id: 4, name: &#39;Pants&#39;, category: &#39;Clothing&#39; },],
};
*/

// function groupByArray() {
// 	const products = [
// 		{ id: 1, name: 'Laptop', category: 'Eletronices' },
// 		{ id: 2, name: 'Shirt', category: 'Clothing' },
// 		{ id: 3, name: 'Phone', category: 'Eletronices' },
// 		{ id: 4, name: 'Pants', category: 'Clothing' },
// 	];

// 	const grouped = products.reduce(function (acc, value) {
// 		if (!acc[value.category]) {
// 			acc[value.category] = [];
// 		}
// 		console.log('🚀 ~ grouped ~ acc[value.category]:', acc[value.category]);
// 		acc[value.category].push(value);
// 		return acc;
// 	}, {});
// 	console.log('🚀 ~ grouped ~ grouped:', grouped);
// }
// groupByArray();

/*
tính tổng giá tiền cảu các sản phẩm

const products = [
	{ id: 1, name: 'Laptop', category: 'Eletronices', price: 100 },
	{ id: 2, name: 'Shirt', category: 'Clothing', price: 200 },
	{ id: 3, name: 'Phone', category: 'Eletronices', price: 300 },
	{ id: 4, name: 'Pants', category: 'Clothing', price: 400 },
];
*/

function caculatorTotalProduct() {
	const products = [
		{ id: 1, name: 'Laptop', category: 'Eletronices', price: 100 },
		{ id: 2, name: 'Shirt', category: 'Clothing', price: 200 },
		{ id: 3, name: 'Phone', category: 'Eletronices', price: 300 },
		{ id: 4, name: 'Pants', category: 'Clothing', price: 400 },
	];

	// const sum = products.reduce(function (acc, value) {
	// 	// return acc[value.price]
	// 	return acc + value.price;
	// }, 0);
	// console.log('🚀 ~ sum ~ sum:', sum);

	// liệt kê ra số lượng theo từng danh mục sản phẩm
	// {Eletronices: 2, Clothing: 2}
	// const count = products.reduce(function (acc, value) {
	// 	acc[value.category] = (acc[value.category] || 0) + 1;
	// 	return acc;
	// }, {});

	// tính trung bình giá của các sản phẩm theo danh mục
	// {Eletronices: 200, Clothing: 300}
	const averagePriceByCategory = products.reduce(function (acc, value) {
		const price = value.price;
		const category = value.category;

		if (!acc[category]) {
			acc[category] = { total: 0, count: 0 };
		}
		// {Eletronices: {total: 100 , count: 1}, Clothing: {total: 0, count: 0}}
		acc[category].total += price;
		// {Clothing: {total: 0 + 200, count: 0}}
		acc[category].count += 1;
		// {Clothing: {total: 200, count: 0 + 1}}
		return acc;
	}, {});
	console.log(
		'🚀 ~ caculatorTotalProduct ~ averagePriceByCategory:',
		averagePriceByCategory
	);

	const average = Object.keys(averagePriceByCategory).reduce(function (
		acc,
		category
	) {
		const data = averagePriceByCategory[category];
		acc[category] = data.total / data.count;
		return acc;
	},
	{});
	console.log(average);
}
// caculatorTotalProduct();
/*
const data = { id: 1, name: 'Laptop', category: 'Eletronices', price: 100 }
const price = data.price
*/
const data = { id: 1, name: 'Laptop', category: 'Eletronices', price: 100 };
const price = data['price'];

/*
truyền vào minPrice, maxPrice vào trong hàm, lọc cho mình những sản phẩm có giá nằm trong
khoảng min < price product < max
*/

function filterProduct(products, minPrice, maxPrice) {
	const resutl = products.every(function (product) {
		return product.price >= minPrice && product.price <= maxPrice;
	});
	return resutl;
}
const products = [
	{ id: 1, name: 'Laptop', category: 'Eletronices', price: 100 },
	{ id: 3, name: 'Phone', category: 'Eletronices', price: 300 },
	{ id: 2, name: 'Shirt', category: 'Clothing', price: 200 },
	{ id: 4, name: 'Pants', category: 'Clothing', price: 400 },
];

/*
[
  'Pants - Clothing - 400',
  ... 300,
  ... 200,
]
*/

function sortString() {
	const result = products
		.sort(function (a, b) {
			return a.price - b.price;
		})
		.map(function (product) {
			return `${product.name} - ${product.category} - ${product.price}`;
		});
	console.log('🚀 ~ result ~ result:', result);
}
// sortString();
// tìm cho sản phẩm có giá trị gần nhất với một giá trị mục tiêu(targe)
// target 450 => sản phẩm { id: 4, name: 'Pants', category: 'Clothing', price: 400 }
function findProductWithPriceTarge(target) {
	const closestProduct = products.reduce((closest, current) => {
		return Math.abs(current.price - target) < Math.abs(closest.price - target)
			? current
			: closest;
	});

	console.log(closestProduct);
}
