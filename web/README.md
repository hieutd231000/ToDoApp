================GIỚI THIỆU================

1. Các công nghệ sử dụng

- React router dom v6 :
  Công dụng: Tạo router cho project.
  Link: https://reactrouter.com/en/main/start/tutorial
- MUI :
  Công dụng : Có thể sử dụng các component có sẵn, sử dụng styled component để viết css
  Link: https://mui.com/material-ui/react-autocomplete/

2. Cấu trúc dự án

- router : Folder chứa config router đường dẫn đến các page.
- pages : Folder chứa các trang page của project, mỗi page chỉ chứa một Container tương ứng.
- containers : Folder này chứa folder Layouts và CÁC folder Container
- layouts : chứa khuân mà nhiều page có thể dùng chung ( dùng để bọc page ). VD page nào cũng dùng chung header và footer, thì ta có thể tạo - layout gồm header và footer đó.

* containers : mỗi container là chứa nội dung page với các file .jsx ,style.

- components : Folder chứa các thành phần nhỏ, PHỔ BIẾN có thể dùng trong tất cả các page. VD như: component button, component card, ...

\*\* Ví dụ :
image.png

\*\* Cách viết styled component: Styled component các viết khá giống với sass/scss. Ưu điểm có thể truyền props vào trong file style này. Mình đã viết ví dụ cách dùng trong container SignUp. Mọi người vào xem qua nhé.
