// &&
// ||

/*
1. &&: AND: expession1 && expession2 => cả 2 biểu thức phải trả về là true
2. ||: OR: expession1 || expession2 => 1 trong các biểu thức phải trả về kết quả là true
3. !: NOT: !expession => trả về là true nếu expession là false và ngược lại trả về false nếu expession là true
*/

// const a = 1,
// 	b = 2,
// 	c = true,
// 	d = false;

// console.log(a > 0 && b > 0); // true
// console.log(a == 2 && b == 2); // false
// console.log(a == 2 || b == 2); // true
// console.log(!c); // false
// console.log(!d); // true

// cho 2 số a và b. Viết chương trình sử dụng toán tử logic để in kết quả (true or false)
// của a và b. Các quan hệ sau
// (a % 2 == 0) && (b % 2 == 0)
// (a % 2 == 0) || (b % 2 == 0)
// !(a > b)
// a = 20, b = 11

function run(a, b) {
	console.log(`(a % 2 == 0) && (b % 2 == 0) is ${a % 2 == 0 && b % 2 == 0}`);
	console.log(`(a % 2 == 0) || (b % 2 == 0) is ${a % 2 == 0 || b % 2 == 0}`);
	console.log(`!(a > b) is ${!(a > b)}`);
}

run(20, 11);

// assignment operator
// =, +=, -=, *=, %=

// += => x += 1 => x = x + 1
// -= => x -= 1 => x = x -1
// *= => x *= 1 => x = x * 1
// /= => x /= 1 => x = x / 1
// %= => x %= 1 => x = x % 1

let x = 1;
// x += 2;
x = x + 2;
console.log(x); // 3
// x -= 1;
x = x - 1;
console.log(x); // 2
// x *= 2;
x = x * 2; // 2 * 2
console.log(x);
x /= 2;
console.log(x);
x %= 2;
console.log(x);

// ||: logical ,??: nullish coalescing operator
const a = 0;
const b = 5;
const result = a || b; // result là
console.log('🚀 ~ result:', result); // trả về là 5
// cách hoạt động: nếu biểu thức đầu tiên là "truthy", nó sẽ trả về giá trị đó, không thì nó sẽ trả về giá trị thứ 2

const c = 0;
const d = 5;
const result1 = c ?? d;
console.log('🚀 ~ result1:', result1);
// cách thức hoạt động: nếu biểu thức đầu tiên là null hoặc undefined, nó sẽ trả
// về biểu thức thứ 2, nếu không nó sẽ trả về biểu thức đầu tiên

// truthy, falsy
/*
- truthy: là các giá trị khi chuyển đổi về dạng boolean, sẽ trả về là true
1. các số != 0 (ví dụ: 1, -1, 3.14)
2. chuỗi không rỗng (ví dụ: "hello", " ")
3. mảng, objet không rỗng (ví dụ: [1, 2, 3], {key: "value"})
4. true

- falsy: là các giá trị khi được chuyển đổi về dạng boolean, sẽ trả về false
1. false
2. 0
3. -0
4. "" (chuỗi rỗng)
5. null
6. undefined
7. Nan (not a number)
*/
console.log(Boolean(' '));
