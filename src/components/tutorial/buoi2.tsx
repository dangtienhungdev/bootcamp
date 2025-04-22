import { useState } from 'react';
import './App.css';

// virtual DOM so với DOM
// DOM ảo, react

const App = () => {
	// JSX: (Javascript XML): cho phép các phần tử HTML bên trong Javascript, tương tự cách viết HTML trong tệp HTML thông dụng

	// react fragment
	// component: 1 phần giao diện người dùng có thể TÁI SỬ DỤNG ở nhiều nơi và có thể chứa logic để hiển thị hoặc quản lí trạng thái

	// khái niệm react hooks: dùng quản lý các trạng thái và các hiệu phụ trong ứng dụng react
	// giúp các component có thể sử dụng được các tính năng nhưng quản lý trạng thái, thực thi các tác vụ, tương tác trực tiếp với dom...

	const arrays = ['Apple', 'Banana', 'Orange'];

	// useState: quản lý và cập nhật trạng thái của component
	const [count, setCount] = useState<number>(0);

	const [user, setUser] = useState({
		name: 'abc',
		age: 0,
		email: 'example@gmail.com',
	});
	const [users, setUsers] = useState([]);
	console.log('🚀 ~ App ~ users:', users);

	const handleChangeName = (event) => {
		const value = event.target.value;
		setUser({
			name: value,
			age: user.age,
			email: user.email,
		});
	};

	const handleChangeAge = (event) => {
		const value = event.target.value;
		setUser({
			name: user.name,
			age: value,
			email: user.email,
		});
	};

	const handleChangeEmail = (event) => {
		const value = event.target.value;
		setUser({
			name: user.name,
			age: user.age,
			email: value,
		});
	};

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setCount((prevCount) => prevCount + 1);
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, [count]);

	const handleSubmit = (e) => {
		e.preventDefault();

		setUsers([...users, user]);
		setUser({
			name: '',
			age: 0,
			email: '',
		});
	};

	const abc = [1, 2, 3];
	console.log('🚀 ~ App ~ abc:', abc);
	const number = 4;
	const newArray = [...abc, number];
	console.log('🚀 ~ App ~ newArray:', newArray);

	return (
		<div>
			<p className="text-3xl font-bold underline text-lime-500">
				You clicked {count}
			</p>
			<button onClick={() => setCount(count + 1)}>Click me!</button>

			<div>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={user.name}
					onChange={(e) => handleChangeName(e)}
				/>
				<input
					type="text"
					name="age"
					placeholder="age"
					value={user.age}
					onChange={(e) => handleChangeAge(e)}
				/>
				<input
					type="text"
					name="email"
					placeholder="email"
					value={user.email}
					onChange={(e) => handleChangeEmail(e)}
				/>
				<button onClick={(e) => handleSubmit(e)}>Add</button>

				<ol>
					{users.map((user) => {
						return (
							<li key={user.name}>
								<span>{user.name}</span>
								<span>{user.age}</span>
								<span>{user.email}</span>
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
};

export default App;
