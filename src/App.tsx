import './App.css';

type WelcomProps = {
	name: string;
	age?: number;
};

const Welcom = ({ name, age = 1 }: WelcomProps) => {
	// props: (properties)
	return (
		<div>
			Welcom {name} - age: {age}
		</div>
	);
};

const App = () => {
	// JSX: (Javascript XML): cho phép các phần tử HTML bên trong Javascript, tương tự cách viết HTML trong tệp HTML thông dụng

	// react fragment

	// component: 1 phần giao diện người dùng có thể TÁI SỬ DỤNG ở nhiều nơi và có thể chứa logic để hiển thị hoặc quản lí trạng thái
	return (
		<>
			<Welcom name="tin" age={12} />
			<Welcom name="dung" age={22} />
			<Welcom name="dat" />
		</>
	);
};

export default App;
