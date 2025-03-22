const closeBtn = document.querySelector('.closeBtn');
const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');
const advertisment = document.querySelector('#advertisment');
const body = document.querySelector('body');
const signInBtn = document.querySelector('.sign-in-btn');

const openModal = () => {
	backdrop.style.display = 'block';
	modal.style.display = 'block';
	body.style.overflow = 'hidden';
};

const closeModal = () => {
	backdrop.style.display = 'none';
	modal.style.display = 'none';
	body.style.overflow = 'auto';
};

advertisment.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
signInBtn.addEventListener('click', openModal);
