package com.rentwear.category;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * Controller: nhận request HTTP và trả JSON. Không chứa logic, không gọi Repository,
 * chỉ gọi Service. Spring tự đổi List<CategoryDto> thành mảng JSON.
 */
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // GET /api/categories
    @GetMapping
    public List<CategoryDto> getAll() {
        return categoryService.getAll();
    }
}
