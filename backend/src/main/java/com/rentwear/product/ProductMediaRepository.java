package com.rentwear.product;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductMediaRepository extends JpaRepository<ProductMedia, Long> {
    List<ProductMedia> findByProductIdInAndTypeAndPrimaryTrue(Collection<Long> productIds, ProductMediaType type);
}
