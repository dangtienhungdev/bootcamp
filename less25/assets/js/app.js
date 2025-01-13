const form = document.querySelector('.form-container');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const emailIcon = document.querySelector('.email-icon');
const passwordIcon = document.querySelector('.password-icon');
const errorMsg = document.querySelector('#errormsg');

// email.addEventListener('keyup', () => {})
email.onkeyup = () => {
	const regexEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const valueFromInputEmail = email.value;

	if (
		valueFromInputEmail.trim() === '' ||
		!valueFromInputEmail.match(regexEmail)
	) {
		emailIcon.classList.add('fa-shake');
		emailIcon.style.color = '#f00';
	} else {
		// emailIcon.classList.remove('fa-envelope');
		// emailIcon.classList.add('fa-circle-check');
		emailIcon.classList.replace('fa-envelope', 'fa-circle-check');
		emailIcon.classList.remove('fa-shake');
		emailIcon.style.color = '#00c330';
	}
};

password.onkeyup = () => {
	const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

	const valueFromInputPassword = password.value;

	if (
		valueFromInputPassword.trim() === '' ||
		!valueFromInputPassword.match(regex)
	) {
		// error
		passwordIcon.classList.add('fa-shake');
		passwordIcon.style.color = '#f00';
		// errorMsg.style.display = 'block';
		errorMsg.classList.add('block');
	} else {
		// pass
		errorMsg.classList.remove('block');
		passwordIcon.style.color = '#00c330';
		passwordIcon.classList.remove('fa-shake');
	}
};

form.addEventListener('submit', (event) => {
	event.preventDefault();

	if (
		passwordIcon.style.color == 'rgb(0, 195, 48)' &&
		emailIcon.classList.contains('fa-circle-check')
	) {
		Swal.fire({
			title: 'Login successfully!',
			text: 'Go to home page!',
			icon: 'success',
		});
		console.log('abcbcb');
	} else {
		Swal.fire({
			title: 'Login failed!',
			icon: 'error',
		});
	}
});

//styled component
