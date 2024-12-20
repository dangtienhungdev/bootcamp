const renderProducts = (productsToRender, productList) => {
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

export default renderProducts;
