const prevBtn = document.querySelector('.pre');
const nextBtn = document.querySelector('.next');
const sliderNav = document.querySelector('.slider-nav');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

let currentIndex = 4;

slides.forEach((_, index) => {
	const dot = document.createElement('button');
	dot.addEventListener('click', () => {
		slider.style.transform = `translateX(-${index * 100}%)`;
		dots.forEach((item, indexItem) => {
			item.classList.toggle('active', indexItem === index);
		});
	});
	sliderNav.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-nav button');

prevBtn.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	slider.style.transform = `translateX(-${currentIndex * 100}%)`;
	dots.forEach((item, index) => {
		item.classList.toggle('active', index === currentIndex);
	});
});

nextBtn.addEventListener('click', () => {
	currentIndex = (currentIndex + 1) % slides.length;
	slider.style.transform = `translateX(-${currentIndex * 100}%)`;
	dots.forEach((item, index) => {
		item.classList.toggle('active', index === currentIndex);
	});
});

dots.forEach((item, index) => {
	item.classList.toggle('active', index === currentIndex);
});
