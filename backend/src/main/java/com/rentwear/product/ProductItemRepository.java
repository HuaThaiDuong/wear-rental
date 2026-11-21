package com.rentwear.product;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
    List<ProductItem> findByProductIdInAndStatusNot(Collection<Long> productIds, ProductItemStatus status);
}
