import { useState } from "react";
import Icon from "./Icon.jsx";
import usthLogo from "../assets/usth-logo.png";

export default function Header({ onNavigate, role = "" }) {
  const [showPartnerLogo, setShowPartnerLogo] = useState(false);
  const go = (event, path) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" onClick={(event) => go(event, "/")} className="logo" aria-label="RentWear - trang chủ">
          rent<b>wear</b>
        </a>
        <div className="header__actions">
          {/* TODO: mở dropdown danh sách cửa hàng khi có API */}
          <button type="button" className="btn-ghost" aria-haspopup="listbox">
            <Icon name="i-pin" size={16} />
            <span className="header__store-label">Chọn cửa hàng</span>
            <Icon name="i-chevron-down" size={14} />
          </button>
          <a href="/cart.html" onClick={(event) => go(event, "/cart.html")} className="btn-ghost btn-ghost--icon" aria-label="Đơn thuê">
            <Icon name="i-cart" size={18} />
          </a>
          {role ? <a href="/profile.html" onClick={(event) => go(event, "/profile.html")} className="btn-white">Tài khoản</a> : <a href="/login.html" onClick={(event) => go(event, "/login.html")} className="btn-white">Đăng nhập</a>}
          <button type="button" className="header__partner-logo-button" aria-label="Phóng to logo USTH" onClick={() => setShowPartnerLogo(true)}>
            <img className="header__partner-logo" src={usthLogo} alt="USTH Vietnam France University" />
          </button>
        </div>
      </div>
      {showPartnerLogo && <div className="logo-viewer" role="presentation" onClick={() => setShowPartnerLogo(false)}>
        <div className="logo-viewer__content" role="dialog" aria-modal="true" aria-label="Logo USTH" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="logo-viewer__close" aria-label="Đóng ảnh" onClick={() => setShowPartnerLogo(false)}>×</button>
          <img src={usthLogo} alt="USTH Vietnam France University" />
        </div>
      </div>}
    </header>
  );
}
