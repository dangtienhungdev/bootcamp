** Higher Order Component (HOC) **

1. là 1 mẫu thiết kế của React được sử dụng để kiểm soát quyền truy cập,
   hiển thị có điểu kiện
2. là 1 hàm **nhận vào 1 component** như một tham số và trả về 1 component mới
   với chức năng được tăng cường

HOC sẽ:

- **Kiểm tra quyền han** của người dùng trước khi render component
- **Hiển thị component gốc** nếu người dùng có quyền
- **Hiển thị thông báo lỗi hoặc component thay thế** nếu người dùng không có quyền

**Cấu trúc cơ bả**

```javascript
const withPermissions = (WrappedComponent, checkPermissions) => {
  return function (props) {
    // logic kiểm tra quyền hạn
    return checkPermissions(props) ? <WrappedComponent {...props} /> : <div>Bạn không có quyền truy cập</div>
  }
}
```

**Ví dụ chi tiết**

1. HOC kiểm tra quyền admin

```javascript
import React from 'React'

// HOC để kiêm tra authorization
const withAuthorization = (WrapperComponent, checkPermissions) => {
  return function (props) {
    return checkPermissions(props) ? <WrappedComponent {...props} /> : <div>Bạn không có quyền truy cập</div>
  }
}
```

**`Component chỉ dành cho Admin`**

```javascript
const AdminPage = () => {
  return (
    <div>
      <p>Bảng điều khiển cho Admin</p>
    </div>
  )
}
```

**`Hàm kiểm tra quyeefn`**

```javascript
const checkPermissions = (props) => {
  return props.userRole === 'admin'
}
```

**`Tạo component với kiểm tra quyền`**

```javascript
const ProtectedAdminPage = withAuthorization(AdminPage, checkPermissions)
```

**`Sử dụng trong App`**

```javascript
export default function App() {
  return (
    <div>
      <h1>Ứng dụng Demo</h1>

      <ProtectedAdminPage userRole='admin' />
      <ProtectedAdminPage userRole='guest' />
    </div>
  )
}
```
