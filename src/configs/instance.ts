import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 1000,
});

export default instance;
