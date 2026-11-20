export default function PromoCards() {
  return (
    <section aria-label="Bộ sưu tập và ưu đãi">
      <div className="grid-4">
        <a className="promo promo--dark" href="collection.html?slug=mua-cuoi-2026">
          <span className="promo__tag">Bộ sưu tập</span>
          <h3>Mùa cưới<br />2026</h3>
        </a>
        <a className="promo promo--yellow" href="collection.html?slug=ao-dai-tet">
          <span className="promo__tag">Đặt sớm giữ size</span>
          <h3>Áo dài Tết</h3>
        </a>
        <a className="promo promo--mint" href="promotion.html?slug=khach-moi">
          <span className="promo__tag">Khách mới</span>
          <h3>Thuê lần đầu<br />giảm [X]%</h3>
        </a>
        <a className="promo promo--white" href="delivery.html">
          <span className="promo__tag">Tiện lợi</span>
          <h3>Giao &amp; nhận<br />đồ tận nơi</h3>
        </a>
      </div>
    </section>
  );
}