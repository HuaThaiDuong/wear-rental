package com.rentwear.category;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

/**
 * Entity: 1 object = 1 dòng trong bảng categories (tạo ở V1__init.sql).
 * Kiểu Java phải khớp kiểu cột (ddl-auto: validate sẽ báo lỗi nếu lệch):
 * BIGSERIAL → Long, INT → Integer, VARCHAR → String, TIMESTAMPTZ → Instant.
 * Chỉ dùng bên trong backend, không trả thẳng ra API (đã có CategoryDto).
 */
@Entity
@Table(name = "categories")
@Getter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(nullable = false, length = 80, unique = true)
    private String slug;

    private String description;

    // Tên field camelCase, tên cột snake_case: phải ghi rõ bằng @Column(name = ...)
    @Column(name = "icon_url", length = 500)
    private String iconUrl;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    // Database tự điền now() nên không cho Hibernate ghi cột này
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Instant createdAt;
}
