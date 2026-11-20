// 1200000 -> "1.200.000đ"
export function formatVND(n) {
  return n.toLocaleString("vi-VN") + "đ";
}