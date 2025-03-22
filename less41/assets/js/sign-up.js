const signInData = JSON.parse(localStorage.getItem('signInData')) || [];

const parentDocument = window.parent.document;
const iframe = parentDocument.querySelector('#modal-iframe');
console.log('🚀 ~ iframe:', iframe);

const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const fname = form.fname.value;
	const lname = form.lname.value;
	const bday = form.bday.value;
	const email = form.email.value;
	const password = form.password.value;

	const isEmailExit = signInData.find((data) => data.email === email);
	if (isEmailExit) {
		alert('Email đã tồn tại!');
		return;
	}

	const data = { fname, lname, bday, email, password };
	signInData.push(data);
	localStorage.setItem('signInData', JSON.stringify(signInData));

	form.fname.value = '';
	form.lname.value = '';
	form.bday.value = '';
	form.email.value = '';
	form.password.value = '';

	iframe.src = 'sign-in.html';
});
