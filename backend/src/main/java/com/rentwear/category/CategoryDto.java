package com.rentwear.category;

/**
 * DTO: dữ liệu trả ra API, đúng các field trong API contract (JSON camelCase).
 * Dùng record vì chỉ chứa dữ liệu, Java tự sinh constructor/getter/equals.
 * Tách khỏi Entity để đổi bảng không làm vỡ API, và không lộ cột nội bộ (sort_order, created_at).
 */
public record CategoryDto(Long id, String name, String slug, String description, String iconUrl) {

    public static CategoryDto from(Category c) {
        return new CategoryDto(c.getId(), c.getName(), c.getSlug(), c.getDescription(), c.getIconUrl());
    }
}
