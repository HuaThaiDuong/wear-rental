import { useState } from "react";
import Icon from "./Icon.jsx";

export default function SearchForm() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromType, setFromType] = useState("text");
  const [toType, setToType] = useState("text");

  const handleSubmit = (e) => {
    e.preventDefault(); // TODO: bỏ khi có trang search.html
    if (from && to && to < from) {
      alert("Ngày trả phải sau ngày nhận");
    }
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <div className="search__field search__field--wide">
        <label htmlFor="q">Trang phục</label>
        <input
          id="q"
          name="q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Váy cưới, vest, áo dài..."
          autoComplete="off"
        />
      </div>

      <div className="search__field">
        <label htmlFor="from">Ngày nhận</label>
        <input
          id="from"
          name="from"
          type={fromType}
          value={from}
          placeholder="Thêm ngày"
          onChange={(e) => setFrom(e.target.value)}
          onFocus={() => setFromType("date")}
          onBlur={() => { if (!from) setFromType("text"); }}
        />
      </div>

      <div className="search__field">
        <label htmlFor="to">Ngày trả</label>
        <input
          id="to"
          name="to"
          type={toType}
          value={to}
          min={from || undefined}
          placeholder="Thêm ngày"
          onChange={(e) => setTo(e.target.value)}
          onFocus={() => setToType("date")}
          onBlur={() => { if (!to) setToType("text"); }}
        />
      </div>

      <button type="submit" className="btn-primary">
        <Icon name="i-search" size={17} />
        Tìm đồ
      </button>
    </form>
  );
}