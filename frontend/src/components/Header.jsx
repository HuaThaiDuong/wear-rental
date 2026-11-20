import Icon from "./Icon.jsx";

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="index.html" className="logo" aria-label="RentWear - trang chủ">
          rent<b>wear</b>
        </a>
        <div className="header__actions">
          {/* TODO: mở dropdown danh sách cửa hàng khi có API */}
          <button type="button" className="btn-ghost" aria-haspopup="listbox">
            <Icon name="i-pin" size={16} />
            <span className="header__store-label">Chọn cửa hàng</span>
            <Icon name="i-chevron-down" size={14} />
          </button>
          <a href="cart.html" className="btn-ghost btn-ghost--icon" aria-label="Giỏ hàng">
            <Icon name="i-cart" size={18} />
          </a>
          <a href="login.html" className="btn-white">Đăng nhập</a>
        </div>
      </div>
    </header>
  );
}