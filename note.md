B1: npm create vite@latest
- sau khi chạy xong nhập tên dự án
- chọn framework: React
- chọn template: Typescript + SWC
- cd tên dự án

B2: npm i

B3: cài các package liên quan eslint + prettier
-> npm i prettier eslint-config-prettier eslint-plugin-prettier -D

  - prettier: fomatter code
  - eslint-config-prettier: bộ config eslint để vô hiệu hóa các rule của eslint mà xung đột với prettier
  - eslint-plugin-prettier: thêm 1 số rule prettier cho eslint

B4: mở file eslint.config.js
-> thêm đoạn giá trị ```vite.config.ts``` vào mảng ```ignores```, mục đích là không muốn ESlint check file ```vite.config.ts```

-> các bạn import cái này vào đầu file ```eslint.config.js```
```ts
import eslintPluginPrettier from 'eslint-plugin-prettier';
```

-> thêm đoạn code sau vào object ```plugins```
```ts
prettier: eslintPluginPrettier
```

-> thêm đoạn code sau vào object ```rules``` để thêm các rule của prettier
```ts
'prettier/prettier': [
'warn',
{
  arrowParens: 'always',
  semi: false,
  trailingComma: 'none',
  tabWidth: 4,
  endOfLine: 'auto',
  useTabs: true,
  singleQuote: true,
  printWidth: 120,
  jsxSingleQuote: true,
},
],
```


-> kết quả file ```eslint.config.js``` là:
```ts
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		ignores: ['vite.config.ts'],
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			'prettier/prettier': [
				'warn',
				{
					arrowParens: 'always',
					semi: false,
					trailingComma: 'none',
					tabWidth: 4,
					endOfLine: 'auto',
					useTabs: true,
					singleQuote: true,
					printWidth: 120,
					jsxSingleQuote: true,
				},
			],
		},
	},
]);

```

B5: Config prettier để format code
-> tạo file ```.prettierrc``` trong thư mục root
-> mục đích là cấu hình prettier để format code

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 4,
  "endOfLine": "auto",
  "useTabs": true,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

Tiếp theo, tạo file ```.prettierignore``` ở thư mục root
-> mục đính là prettier bỏ qua các file không cần thiết

B6: Config editor để chuẩn hóa các cấu hình editor
-> tạo file ```.editorconfig``` ở thư mục root
-> mục đích: các cấu hình config đồng bộ các editor với nhau nếu dự án có nhiều người tham gia

```ts
[*]
indent_size = 2
indent_style = tab
```

B7: cấu hình alias cho ```tsconfig.json```
-> giúp vscode hiểu để tự động import giúp chúng ta
-> Lưu ý: thêm đoạn này vào ```compilerOptions``` trong file ```tsconfig.json```
-> ý nghĩa: ta có thể ```import Login from '@/pages/login'```
thay vì ```import Login from '../../pages/login'```

```ts
{
	"files": [],
	"references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

B8: cấu hình file alias cho ```vite.config.ts```
-> cài package ```@type/node``` để sử dụng trong ts không bị lỗi
``` npm i @types/node -D ```

cấu hình alias và enable trong file ```vite.config.ts```

code
```ts
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 4200
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src')
		}
	}
})
```

B9: cập nhật ```script``` cho ```package.json```

```ts
"scripts" : {
	//...
	"lint:fix": "eslint . --fix",
	"prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
	"prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
}
```

- ```npm run lint:fix```: kiểm tra dự án có lỗi và tự động fix các lỗi liên quan ESLint
- ```npm run prettier```: kiểm tra dự án có lỗi gì liên quan đến prettier hay không
- ```npm run prettier:fix```: tự động fix các lỗi liên quan đến prettier