import { POPULAR_PRODUCTS } from "../data/products.js";
import { formatVND } from "../utils/format.js";
import Icon from "./Icon.jsx";

function ProductCard({ product: p }) {
  return (
    <a className="product" href={`product.html?id=${encodeURIComponent(p.id)}`}>
      <div className="product__media" style={{ background: p.placeholderBg }}>
        {p.image ? (
          <img src={p.image} alt={p.name} loading="lazy" />
        ) : (
          <Icon name="i-hanger" size={36} />
        )}
      </div>
      <div className="product__body">
        <h3>{p.name}</h3>
        <span className="product__meta">
          Size {p.size} · Cọc {formatVND(p.deposit)}
        </span>
        <span className="product__stock">{p.availability}</span>
        <div className="price-box">
          <small>{p.rentalPlan}</small>
          <span className="price-box__price">{formatVND(p.price)}</span>
          {p.discountPercent > 0 && (
            <span className="price-box__discount">-{p.discountPercent}%</span>
          )}
        </div>
      </div>
    </a>
  );
}

export default function PopularProducts() {
  return (
    <section>
      <div className="section-head">
        <h2>Đang được thuê nhiều</h2>
        <a className="pill" href="products.html?sort=popular">
          Xem tất cả
          <Icon name="i-chevron-right" size={13} />
        </a>
      </div>
      <div className="grid-4 products">
        {POPULAR_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}