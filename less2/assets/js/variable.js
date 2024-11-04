// var name = 'Nguyen Van A';
// var age = 10;
// var isBoy = true;

// var name1;
// name1 = 'Nguyen Van B';
console.log(name);
// cách khai báo nhiều biến cùng 1 lúc
var name = 'nguyen van a',
	age = 10,
	isBoy = true;

// phạm vi biến
/*1. Global Variables (Biến toàn cục): được định nghĩa ở bất kì đâu trong mã js của mình */
var myVar = 'out of func'; // global

function do_something() {
	console.log('🚀 ~ do_something ~ myVar:', myVar);
}

do_something();

/* 2. Local Variables (Biến cục bộ): chỉ hiển thị trong mọt hàm được định nghĩa*/
// var myVar = 'out of func'; // global

// function do_something() {
// 	var myVar = 'in of func'; // local
// 	console.log('🚀 ~ do_something ~ myVar:', myVar);
// }

// do_something();
