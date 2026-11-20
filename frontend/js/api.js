// Địa chỉ gốc của backend API
const API_BASE_URL = "http://localhost:8080/api";

// Hàm gọi GET API dùng chung
async function apiGet(path) {
  const res = await fetch(API_BASE_URL + path);
  if (!res.ok) {
    let message = `Lỗi ${res.status}`;
    try {
      const data = await res.json();
      if (data && data.message) {
        message = data.message;
      }
    } catch {
      // Không đọc được JSON lỗi thì giữ message mặc định
    }
    throw new Error(message);
  }
  return res.json();
}
