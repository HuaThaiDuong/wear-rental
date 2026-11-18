package com.rentwear.category;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository: tầng nói chuyện với database. Chỉ cần khai báo interface,
 * Spring Data tự viết SQL dựa vào tên hàm:
 * findAllByOrderBySortOrderAsc → SELECT * FROM categories ORDER BY sort_order ASC
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByOrderBySortOrderAsc();
}
