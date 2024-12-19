const btnOpenModal = document.querySelector('#openModal');
const myModal = document.querySelector('#myModal');
const btnClose = document.querySelector('.close');

btnOpenModal.addEventListener('click', () => {
	myModal.classList.add('show');
});

btnClose.addEventListener('click', (e) => {
	myModal.classList.remove('show');
});

window.onclick = (e) => {
	if (e.target === myModal) {
		myModal.classList.remove('show');
	}
};
