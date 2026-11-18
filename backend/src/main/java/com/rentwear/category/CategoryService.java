package com.rentwear.category;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

/**
 * Service: nơi đặt logic nghiệp vụ. Gọi Repository lấy Entity, đổi sang DTO rồi trả cho Controller.
 * Lỗi nghiệp vụ thì ném ApiException ở đây (vd ApiException.notFound(...)).
 */
@Service
@RequiredArgsConstructor // Lombok sinh constructor, Spring tự truyền CategoryRepository vào
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryDto> getAll() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(CategoryDto::from)
                .toList();
    }
}
