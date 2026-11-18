package com.rentwear.common;

/**
 * Định dạng lỗi chung cho mọi API (theo API contract):
 * { "code": "NOT_FOUND", "message": "Không tìm thấy sản phẩm" }
 */
public record ErrorResponse(String code, String message) {
}
