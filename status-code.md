200: Success -> Gọi api thành công
201: Created -> Gọi api thành công

-------------------------------------
400: Bad Request -> phần lớn (be, đôi khi cũng là của fe)
401: Unauthorized -> (frontend: thường lỗi đăng nhập, hoặc khi call api chúng ta chưa gửi **token** lên api để call)
403: Forbidden -> người dùng đăng nhập hiện tại không có quyền call api này
404: Not found -> call 1 api không đúng
500: Internal server error -> lỗi backend