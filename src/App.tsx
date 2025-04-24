// virtual DOM so với DOM
// DOM ảo, react
import { useEffect, useState } from 'react';
import UserItem from './components/tutorial/user-item';
import { Employee } from './types/user.type';

/*
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
*/
// interface/ type

const App = () => {
	// useEffect: là 1 hook trong react và cho phép bạn thực hiện các tác vụ(side effects) trong các component
	// tác vụ có thể là: fetch dữ liệu, đăng ký sự kiện, dùng để thay đổi DOM trực tiếp

	// cách sử dụng:
	/*
  useEffect(() => {
    // code khi component được render
  }, [dependencies])

  - giải thích tham số của useEffect
  + callback function (hàm gọi lại): đoạn mã muốn chạy sau khi render
  + dependency array (mảng phụ thuộc): chứa các biến khi thay đổi sẽ kích hoạt lại useEffect.
  nếu như không mảng useEffect thì useEffect sẽ chạy lại mỗi lần render

  */
	const API_URL = 'https://jsonplaceholder.typicode.com/users';
	const [count, setCount] = useState<number>(0);
	const [users, setUsers] = useState<Employee[]>([]);
	// never, unknow

	/* ex1: useEffect */
	useEffect(() => {
		fetch(API_URL)
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	const [timer, setTimer] = useState<number>(0);
	const [toggle, setToggle] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="p-10">
			<button onClick={() => setToggle((prev) => !prev)}>count: {count}</button>

			{toggle ? <p>Xin chào</p> : <p>Thời gian: {timer}</p>}

			<div className="space-y-6 mt-6">
				{users.length === 0 && (
					<div className="italic text-center">Danh sách trống</div>
				)}
				{users &&
					users.length > 0 &&
					users.map((user) => <UserItem key={user.id} user={user} />)}
			</div>
		</div>
	);
};

export default App;
