const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const imageContainer = document.querySelector('.image-container');

let timer;
let x = 0;

prevBtn.addEventListener('click', () => {
	x = x + 45;
	clearTimeout(timer);
	imageContainer.style.transform = `perspective(1000px) rotateY(${x}deg)`;
});

nextBtn.addEventListener('click', () => {
	x = x - 45;
	clearTimeout(timer);
	imageContainer.style.transform = `perspective(1000px) rotateY(${x}deg)`;
});

const autoSlider = () => {
	imageContainer.style.transform = `perspective(1000px) rotateY(${x}deg)`;
	timer = setTimeout(() => {
		x = x - 45;
		autoSlider();
	}, 3000);
};
autoSlider();
