import { useEffect, useState } from "react";
import { apiGet } from "../api/client.js";
import Icon from "./Icon.jsx";

export default function CategoryList() {
  const [categories, setCategories] = useState(null); // null = đang tải
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    apiGet("/categories")
      .then((data) => { if (!cancelled) setCategories(data ?? []); })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setError(err);
      });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <section aria-label="Danh mục trang phục">
        <p className="status-text">Không tải được danh mục. Vui lòng thử lại sau.</p>
      </section>
    );
  }
  if (categories === null) {
    return (
      <section aria-label="Danh mục trang phục">
        <p className="status-text">Đang tải danh mục...</p>
      </section>
    );
  }
  if (categories.length === 0) {
    return (
      <section aria-label="Danh mục trang phục">
        <p className="status-text">Chưa có danh mục nào.</p>
      </section>
    );
  }

  return (
    <section aria-label="Danh mục trang phục">
      <div className="grid-4 cats">
        {categories.map((cat) => (
          <a
            className="cat"
            key={cat.slug}
            href={`category.html?slug=${encodeURIComponent(cat.slug)}`}
          >
            <span className="cat__icon">
              {cat.iconUrl ? (
                <img src={cat.iconUrl} alt="" width="26" height="26" />
              ) : (
                <Icon name="i-hanger" size={26} />
              )}
            </span>
            <div>
              <h3>{cat.name}</h3>
              {cat.description && <p>{cat.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}