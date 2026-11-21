export default function Footer({ onNavigate }) {
  const go = (event, path) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <a href="/" onClick={(event) => go(event, "/")} className="logo">rent<b>wear</b></a>
            <p className="footer__desc">
              Cho thuê trang phục cưới, dạ hội, áo dài và cosplay. Giặt sạch trước mỗi lần thuê.
            </p>
          </div>
          <nav className="footer__links">
            <a href="/about.html" onClick={(event) => go(event, "/about.html")}>Giới thiệu</a>
            <a href="/policy.html" onClick={(event) => go(event, "/policy.html")} className="is-solid">Chính sách thuê &amp; cọc</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© 2026 RentWear · Đồ án Group Project – USTH</span>
          {/* TODO: điền địa chỉ / SĐT / email thật */}
          <span>[Địa chỉ] · [Số điện thoại] · [Email]</span>
        </div>
      </div>
    </footer>
  );
}
