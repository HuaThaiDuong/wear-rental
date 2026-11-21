package com.rentwear.product;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductCardDto> getCards(
            @RequestParam(defaultValue = "popular") String sort,
            @RequestParam(defaultValue = "12") int limit) {
        return productService.getCards(sort, limit);
    }
}
