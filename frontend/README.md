# RentWear – Frontend (HTML/CSS/JS thuần)

Không cần cài đặt hay build gì. Mở `index.html` bằng trình duyệt là xem được,
hoặc chạy server tĩnh (khuyên dùng, giống môi trường thật hơn):

```bash
cd frontend
npx serve .            # hoặc: python -m http.server 5500
# hoặc dùng extension "Live Server" trong VS Code
```

## Cấu trúc

```
index.html          trang chủ
css/base.css        dùng chung mọi trang: màu, header, footer
css/home.css        chỉ cho trang chủ
js/data.js          dữ liệu mẫu sản phẩm (sau này thay bằng API)
js/home.js          hiển thị sản phẩm, xử lý ô chọn ngày và form tìm kiếm
assets/images/      chỗ để ảnh sản phẩm
assets/favicon.svg  icon hiển thị trên tab trình duyệt
```

## Quy ước

- Trang mới: tạo `ten-trang.html`, link `css/base.css` + file CSS riêng của trang đó.
  Copy khối `<header>` và `<footer>` từ `index.html` (có comment đánh dấu).
- Class đặt theo kiểu BEM: `khoi__phan-tu--bien-the` (vd `promo--dark`, `product__body`).
- Màu dùng biến trong `base.css` (`var(--green-700)`...), không viết mã màu trực tiếp.

## Việc còn lại (TODO)

- Nối API thật thay cho `js/data.js` (giữ nguyên tên field).
- Tạo các trang đang được link tới: `login.html`, `cart.html`, `search.html`,
  `category.html`, `product.html`, `products.html`, `about.html`, `policy.html`...
- Dropdown "Chọn cửa hàng".
- Điền `[X]%`, địa chỉ, số điện thoại, email thật; thêm ảnh sản phẩm vào `assets/images/`.
