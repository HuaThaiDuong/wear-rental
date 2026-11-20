const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

export async function apiGet(path) {
  const res = await fetch(API_BASE_URL + path);
  if (!res.ok) {
    let message = `Lỗi ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      /* giữ message mặc định */
    }
    throw new Error(message);
  }
  return res.json();
}