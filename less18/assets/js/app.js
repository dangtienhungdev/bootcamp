const products = [
	{
		id: 1,
		name: 'Áo Dài Tay Thể Thao Essentials',
		image: 'https://picsum.photos/536/354',
		price: 100,
	},
	{
		id: 2,
		name: 'Product 2',
		image: 'https://picsum.photos/536/354',
		price: 200,
	},
	{
		id: 3,
		name: 'Product 3',
		image: 'https://picsum.photos/536/354',
		price: 150,
	},
	{
		id: 4,
		name: 'Product 4',
		image: 'https://picsum.photos/536/354',
		price: 250,
	},
	{
		id: 5,
		name: 'Product 5',
		image: 'https://picsum.photos/536/354',
		price: 300,
	},
	{
		id: 6,
		name: 'Product 6',
		image: 'https://picsum.photos/536/354',
		price: 350,
	},
	{
		id: 7,
		name: 'Product 7',
		image: 'https://picsum.photos/536/354',
		price: 400,
	},
	{
		id: 8,
		name: 'Product 8',
		image: 'https://picsum.photos/536/354',
		price: 450,
	},
	{
		id: 9,
		name: 'Product 9',
		image: 'https://picsum.photos/536/354',
		price: 500,
	},
	{
		id: 10,
		name: 'Product 10',
		image: 'https://picsum.photos/536/354',
		price: 550,
	},
];

// khai báo ra các dữ liệu đầu vào của DOM
const productList = document.querySelector('.product-list');
const inputSearch = document.querySelector('.input-search');
const inputRange = document.querySelector('.input-range');

const renderProducts = (productsToRender) => {
	// render data
	const productItems = productsToRender.map((product) => {
		return `
      <div class="product">
        <img src="${product.image}" alt="image">
        <div class="product-content">
          <h2 class="product-heading">${product.name}</h2>
          <p class="product-price">${product.price}$</p>
          <button class="product-buy-now">Buy now</button>
        </div>
      </div>
  `;
	});
	productList.innerHTML = productItems.join('');
};

renderProducts(products);

// add event input vào input search
inputSearch.addEventListener('input', () => {
	const searchTerm = inputSearch.value;

	const result = products.filter((product) => {
		return product.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	// render data
	renderProducts(result);
});

// handle logic input range
inputRange.addEventListener('input', () => {
	const priceTerm = inputRange.value;

	const result = products.filter((product) => product.price <= priceTerm);
	// render data
	renderProducts(result);
});

// handle click buy now button
const buttons = document.querySelectorAll('.product-buy-now');
const cartCount = document.querySelector('.count');
let count = 0;
buttons.forEach((button) => {
	button.addEventListener('click', () => {
		count++;
		cartCount.textContent = count;
	});
});
