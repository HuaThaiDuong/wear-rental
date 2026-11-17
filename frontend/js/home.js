// ===== Tiện ích =====
// 1200000 -> "1.200.000đ"
function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}

// Chống chèn HTML khi dữ liệu đến từ API
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ===== Render "Đang được thuê nhiều" =====
function renderProducts(products) {
  const container = document.getElementById("popularProducts");
  container.innerHTML = products
    .map((p) => {
      const media = p.image
        ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy">`
        : `<svg width="36" height="36" aria-hidden="true"><use href="#i-hanger"/></svg>`;
      const discount = p.discountPercent > 0 ? `<span class="price-box__discount">-${p.discountPercent}%</span>` : "";

      return `
        <a class="product" href="product.html?id=${encodeURIComponent(p.id)}">
          <div class="product__media" style="background:${escapeHTML(p.placeholderBg)}">${media}</div>
          <div class="product__body">
            <h3>${escapeHTML(p.name)}</h3>
            <span class="product__meta">Size ${escapeHTML(p.size)} · Cọc ${formatVND(p.deposit)}</span>
            <span class="product__stock">${escapeHTML(p.availability)}</span>
            <div class="price-box">
              <small>${escapeHTML(p.rentalPlan)}</small>
              <span class="price-box__price">${formatVND(p.price)}</span>${discount}
            </div>
          </div>
        </a>`;
    })
    .join("");
}

// ===== Ô ngày: hiện "Thêm ngày" khi trống, đổi sang lịch khi bấm vào =====
function setupDateInputs() {
  document.querySelectorAll("input[data-date]").forEach((input) => {
    input.addEventListener("focus", () => (input.type = "date"));
    input.addEventListener("blur", () => {
      if (!input.value) input.type = "text";
    });
  });

  // Ngày trả không được trước ngày nhận
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  from.addEventListener("change", () => (to.min = from.value));

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    if (from.value && to.value && to.value < from.value) {
      e.preventDefault();
      alert("Ngày trả phải sau ngày nhận");
    }
    // TODO: khi chưa có trang search.html thì có thể chặn submit tại đây
  });
}

// ===== Khởi động =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(POPULAR_PRODUCTS);
  setupDateInputs();
});
