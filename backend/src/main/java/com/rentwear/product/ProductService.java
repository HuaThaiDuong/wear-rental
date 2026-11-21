package com.rentwear.product;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentwear.common.ApiException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
    static final int MAX_LIMIT = 50;

    private final ProductRepository productRepository;
    private final ProductItemRepository productItemRepository;
    private final ProductMediaRepository productMediaRepository;

    @Transactional(readOnly = true)
    public List<ProductCardDto> getCards(String sort, int limit) {
        if (limit < 1 || limit > MAX_LIMIT) {
            throw ApiException.badRequest("limit phải từ 1 đến " + MAX_LIMIT);
        }
        Sort order = switch (sort) {
            case "popular" -> Sort.by(Sort.Order.desc("rentCount"), Sort.Order.asc("id"));
            case "newest" -> Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"));
            default -> throw ApiException.badRequest("sort chỉ nhận popular hoặc newest");
        };

        List<Product> products = productRepository.findByStatus(ProductStatus.ACTIVE, PageRequest.of(0, limit, order));
        if (products.isEmpty()) {
            return List.of();
        }
        List<Long> ids = products.stream().map(Product::getId).toList();

        Map<Long, List<ProductItem>> itemsByProduct = productItemRepository
                .findByProductIdInAndStatusNot(ids, ProductItemStatus.RETIRED).stream()
                .collect(Collectors.groupingBy(i -> i.getProduct().getId()));

        Map<Long, String> imageByProduct = productMediaRepository
                .findByProductIdInAndTypeAndPrimaryTrue(ids, ProductMediaType.IMAGE).stream()
                .collect(Collectors.toMap(m -> m.getProduct().getId(), ProductMedia::getUrl, (a, b) -> a));

        return products.stream()
                .map(p -> ProductCardDto.from(p,
                        itemsByProduct.getOrDefault(p.getId(), List.of()),
                        imageByProduct.get(p.getId())))
                .toList();
    }
}
