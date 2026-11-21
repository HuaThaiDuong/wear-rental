import { useEffect, useState } from "react";
import IconSprite from "./components/IconSprite.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import { POPULAR_PRODUCTS } from "./data/products.js";
import { formatVND } from "./utils/format.js";
import "./styles/flows.css";

const categoryFor = (name) => name.startsWith("Váy cưới") ? "Váy cưới" : name.startsWith("Vest") ? "Vest" : name.startsWith("Áo dài") ? "Áo dài" : "Dạ hội";
const initialStock = POPULAR_PRODUCTS.map((product) => ({ ...product, status: "available", category: categoryFor(product.name) }));
const initialUsers = [
  { id: 1, name: "Nguyễn Minh Anh", email: "minhanh@example.com", role: "customer" },
  { id: 2, name: "Trần Quốc Bảo", email: "bao@example.com", role: "staff" },
];
const routeMap = { "login.html": "login", "register.html": "login", "product.html": "product", "products.html": "products", "category.html": "products", "cart.html": "orders", "orders.html": "orders", "profile.html": "profile", "staff.html": "staff", "admin.html": "admin", "about.html": "about", "policy.html": "policy" };
const screenFromUrl = () => routeMap[window.location.pathname.split("/").pop()] || "home";
const today = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [screen, setScreen] = useState(screenFromUrl);
  const [role, setRole] = useState("");
  const [registered, setRegistered] = useState(false);
  const [items, setItems] = useState(initialStock);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState(initialUsers);
  const [profile, setProfile] = useState({ name: "Khách hàng", email: "", phone: "" });
  const [productId, setProductId] = useState(Number(new URLSearchParams(window.location.search).get("id")) || 1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const sync = () => { setScreen(screenFromUrl()); setProductId(Number(new URLSearchParams(window.location.search).get("id")) || 1); };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setScreen(screenFromUrl());
    setProductId(Number(new URLSearchParams(window.location.search).get("id")) || 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2300); };
  const filtered = items.filter((item) => (category === "Tất cả" || item.category === category) && (!query || item.name.toLowerCase().includes(query.toLowerCase())) && item.status === "available");
  const selectedProduct = items.find((item) => item.id === productId) || items[0];
  const makeBooking = () => {
    if (!from || !to || to < from) return notify("Vui lòng chọn ngày nhận và ngày trả hợp lệ.");
    const days = Math.max(1, Math.ceil((new Date(to) - new Date(from)) / 86400000) + 1);
    const order = { id: `RW-${Date.now().toString().slice(-6)}`, itemId: selectedProduct.id, name: selectedProduct.name, from, to, days, fee: days * selectedProduct.price, deposit: selectedProduct.deposit, status: "Chờ thanh toán" };
    setOrders((all) => [order, ...all]);
    setItems((all) => all.map((item) => item.id === selectedProduct.id ? { ...item, status: "rented" } : item));
    navigate("/orders.html");
  };
  const setOrderStatus = (id, status) => setOrders((all) => all.map((order) => order.id === id ? { ...order, status } : order));

  return <>
    <IconSprite />
    <Header onNavigate={navigate} role={role} />
    {screen === "home" && <HomePage />}
    {screen === "login" && <main className="container flow-page"><form className="flow-card flow-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const nextRole = String(data.get("role")); setRole(nextRole); setProfile({ name: String(data.get("name") || "Khách hàng"), email: String(data.get("email")), phone: String(data.get("phone") || "") }); setRegistered(true); notify("Đăng nhập thành công"); navigate(nextRole === "admin" ? "/admin.html" : nextRole === "staff" ? "/staff.html" : "/profile.html"); }}><span className="flow-kicker">RENTWEAR · TÀI KHOẢN</span><h1>{registered ? "Đăng nhập" : "Đăng nhập / Đăng ký"}</h1><p>Đăng nhập hoặc tạo tài khoản để tiếp tục.</p>{!registered && <label>Họ và tên<input name="name" placeholder="Tên của bạn"/></label>}<label>Email<input name="email" type="email" required placeholder="ban@email.com"/></label>{!registered && <label>Số điện thoại<input name="phone" type="tel" placeholder="09xx xxx xxx"/></label>}<label>Mật khẩu<input name="password" type="password" required placeholder="Nhập mật khẩu"/></label><label>Vai trò<select name="role"><option value="customer">Khách hàng</option><option value="staff">Nhân viên</option><option value="admin">Quản trị viên</option></select></label><button className="btn-primary" type="submit">{registered ? "Đăng nhập" : "Đăng ký"}</button><button type="button" className="flow-link" onClick={() => setRegistered((value) => !value)}>{registered ? "Tạo tài khoản mới" : "Đã có tài khoản? Đăng nhập"}</button></form></main>}
    {screen === "products" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">BỘ SƯU TẬP RENTWEAR</span><h1>Trang phục cho dịp của bạn</h1><p>Lọc theo danh mục và tìm tên trang phục.</p></div><div className="flow-toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm váy cưới, vest, áo dài..."/><select value={category} onChange={(event) => setCategory(event.target.value)}>{["Tất cả", ...new Set(items.map((item) => item.category))].map((value) => <option key={value}>{value}</option>)}</select><label>Nhận <input type="date" min={today()} value={from} onChange={(event) => setFrom(event.target.value)}/></label><label>Trả <input type="date" min={from || today()} value={to} onChange={(event) => setTo(event.target.value)}/></label></div><div className="grid-4 flow-products">{filtered.map((item) => <article className="product" key={item.id}><button className="product__media flow-product-art" onClick={() => navigate(`/product.html?id=${item.id}`)} aria-label={`Xem ${item.name}`}><span>◈</span></button><div className="product__body"><h3>{item.name}</h3><span className="product__meta">Size {item.size} · Cọc {formatVND(item.deposit)}</span><span className="product__stock">Sẵn sàng</span><div className="price-box"><small>Thuê theo ngày</small><span className="price-box__price">{formatVND(item.price)}</span></div><button className="btn-primary flow-card-button" onClick={() => navigate(`/product.html?id=${item.id}`)}>Xem chi tiết</button></div></article>)}</div>{filtered.length === 0 && <p className="status-text">Không có sản phẩm phù hợp với bộ lọc.</p>}</main>}
    {screen === "product" && selectedProduct && <main className="container flow-page"><button className="flow-link" onClick={() => navigate("/products.html")}>← Quay lại danh mục</button><section className="flow-detail"><div className="flow-detail-art"><span>◈</span></div><div><span className="flow-kicker">{selectedProduct.category}</span><h1>{selectedProduct.name}</h1><p>Size {selectedProduct.size}. Trang phục được kiểm tra và vệ sinh trước mỗi lần cho thuê.</p><p className="product__stock">{selectedProduct.availability || "Sẵn sàng"}</p><h2>{formatVND(selectedProduct.price)} <small>/ ngày</small></h2><p>Tiền cọc: {formatVND(selectedProduct.deposit)}</p><div className="flow-dates"><label>Ngày nhận<input type="date" min={today()} value={from} onChange={(event) => setFrom(event.target.value)}/></label><label>Ngày trả<input type="date" min={from || today()} value={to} onChange={(event) => setTo(event.target.value)}/></label></div><button className="btn-primary" onClick={makeBooking}>Đặt thuê</button></div></section></main>}
    {screen === "orders" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">TÀI KHOẢN CỦA BẠN</span><h1>Đơn thuê</h1><p>Theo dõi lịch thuê và trạng thái đơn.</p></div>{orders.length === 0 ? <div className="flow-empty"><h2>Chưa có đơn thuê</h2><p>Chọn trang phục để bắt đầu thuê.</p><button className="btn-primary" onClick={() => navigate("/products.html")}>Xem trang phục</button></div> : <div className="flow-list">{orders.map((order) => <article className="flow-row" key={order.id}><div><small>{order.id}</small><h3>{order.name}</h3><p>{order.from} – {order.to} · {order.days} ngày</p></div><div><b>{formatVND(order.fee)}</b><small>Cọc {formatVND(order.deposit)}</small></div><span className="flow-status">{order.status}</span>{order.status === "Chờ thanh toán" && <button className="btn-primary" onClick={() => setOrderStatus(order.id, "Đã xác nhận")}>Thanh toán QR</button>}</article>)}</div>}</main>}
    {screen === "profile" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">HỒ SƠ CÁ NHÂN</span><h1>Tài khoản của bạn</h1><p>Cập nhật thông tin liên hệ.</p></div><form className="flow-card flow-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setProfile({ name: String(data.get("name")), email: String(data.get("email")), phone: String(data.get("phone")) }); notify("Đã lưu hồ sơ"); }}><label>Họ và tên<input name="name" defaultValue={profile.name}/></label><label>Email<input name="email" type="email" defaultValue={profile.email}/></label><label>Số điện thoại<input name="phone" defaultValue={profile.phone}/></label><button className="btn-primary">Lưu hồ sơ</button><button type="button" className="flow-link" onClick={() => { setRole(""); setRegistered(false); navigate("/"); }}>Đăng xuất</button></form></main>}
    {screen === "staff" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">KHU VỰC NHÂN VIÊN</span><h1>Quản lý đơn thuê & kho</h1></div><section className="flow-card"><h2>Đơn thuê</h2>{orders.length ? orders.map((order) => <div className="flow-row" key={order.id}><div><small>{order.id}</small><h3>{order.name}</h3><p>{order.from} – {order.to}</p></div><b>{formatVND(order.fee)} · cọc {formatVND(order.deposit)}</b><select value={order.status} onChange={(event) => setOrderStatus(order.id, event.target.value)}><option>Chờ thanh toán</option><option>Đã xác nhận</option><option>Đã nhận đồ</option><option>Đã trả đồ</option></select></div>) : <p className="status-text">Đơn thuê mới sẽ hiển thị tại đây.</p>}</section><section className="flow-card"><h2>Tình trạng kho</h2>{items.map((item) => <div className="flow-row" key={item.id}><div><h3>{item.name}</h3><small>{item.size} · {formatVND(item.price)}/ngày</small></div><select value={item.status} onChange={(event) => setItems((all) => all.map((entry) => entry.id === item.id ? { ...entry, status: event.target.value } : entry))}><option value="available">Sẵn sàng</option><option value="rented">Đang thuê</option><option value="cleaning">Đang giặt</option><option value="repair">Đang sửa</option></select></div>)}</section></main>}
    {screen === "admin" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">QUẢN TRỊ VIÊN</span><h1>Tổng quan cửa hàng</h1></div><div className="flow-metrics"><article><small>Sản phẩm</small><b>{items.length}</b></article><article><small>Đơn thuê</small><b>{orders.length}</b></article><article><small>Doanh thu</small><b>{formatVND(orders.reduce((sum, order) => sum + order.fee, 0))}</b></article></div><section className="flow-card"><h2>Quản lý tài khoản & vai trò</h2>{users.map((user) => <div className="flow-row" key={user.id}><div><h3>{user.name}</h3><small>{user.email}</small></div><select value={user.role} onChange={(event) => setUsers((all) => all.map((entry) => entry.id === user.id ? { ...entry, role: event.target.value } : entry))}><option value="customer">Khách hàng</option><option value="staff">Nhân viên</option><option value="admin">Quản trị viên</option></select></div>)}</section><section className="flow-card"><h2>Danh mục</h2><p>Danh mục sản phẩm đang hiển thị trên trang chủ và danh sách đồ.</p><button className="btn-primary" onClick={() => navigate("/products.html")}>Quản lý sản phẩm</button></section></main>}
    {screen === "about" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">VỀ RENTWEAR</span><h1>Thuê đồ cho những dịp đáng nhớ</h1><p>RentWear giúp khách hàng khám phá, đặt thuê và theo dõi trang phục trên cùng một nền tảng.</p></div></main>}
    {screen === "policy" && <main className="container flow-page"><div className="flow-heading"><span className="flow-kicker">HƯỚNG DẪN</span><h1>Chính sách thuê & đặt cọc</h1><p>Chọn ngày thuê, kiểm tra phí và tiền cọc trong chi tiết sản phẩm. Nhân viên xác nhận nhận/trả đồ tại cửa hàng.</p></div></main>}
    <Footer onNavigate={navigate}/>
    {toast && <div className="flow-toast" role="status">{toast}</div>}
  </>;
}


