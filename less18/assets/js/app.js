import { products } from './data.js';
import renderProducts from '../components/render-product.js';

// khai báo ra các dữ liệu đầu vào của DOM
const productList = document.querySelector('.product-list');
const inputSearch = document.querySelector('.input-search');
const inputRange = document.querySelector('.input-range');
const buttons = document.querySelectorAll('.product-buy-now');
const cartCount = document.querySelector('.count');

renderProducts(products, productList);

// add event input vào input search
inputSearch.addEventListener('input', () => {
	const searchTerm = inputSearch.value;

	const result = products.filter((product) => {
		return product.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	// render data
	renderProducts(result, productList);
});

// handle logic input range
inputRange.addEventListener('input', () => {
	const priceTerm = inputRange.value;

	const result = products.filter((product) => product.price <= priceTerm);
	// render data
	renderProducts(result, productList);
});

// handle click buy now button
let count = 0;
buttons.forEach((button) => {
	button.addEventListener('click', () => {
		count++;
		cartCount.textContent = count;
	});
});
