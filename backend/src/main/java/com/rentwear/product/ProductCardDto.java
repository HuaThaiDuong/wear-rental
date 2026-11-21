package com.rentwear.product;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;

public record ProductCardDto(
        Long id,
        String slug,
        String name,
        String size,
        Long deposit,
        Long price,
        String rentalPlan,
        Integer discountPercent,
        Integer availableCount,
        String availability,
        String image) {
    static final String DAILY_PLAN = "Thuê theo ngày";

    static ProductCardDto from(Product p, List<ProductItem> items, String imageUrl) {
        int available = (int) items.stream()
                .filter(i -> i.getStatus() == ProductItemStatus.AVAILABLE)
                .count();
        return new ProductCardDto(
                p.getId(), p.getSlug(), p.getName(),
                sizeRange(items.stream().map(ProductItem::getSize).toList()),
                p.getDepositAmount(), p.getPricePerDay(),
                DAILY_PLAN, 0,
                available, availabilityText(available),
                imageUrl);
    }

    static String sizeRange(Collection<ProductSize> sizes) {
        List<ProductSize> real = sizes.stream()
                .filter(s -> s != ProductSize.FREE)
                .distinct()
                .sorted(Comparator.naturalOrder())
                .toList();
        if (real.isEmpty()) {
            return sizes.isEmpty() ? null : "Free size";
        }
        ProductSize min = real.getFirst();
        ProductSize max = real.getLast();
        return min == max ? min.name() : min.name() + "–" + max.name();
    }

    static String availabilityText(int availableCount) {
        return availableCount > 0 ? "Còn " + availableCount + " bộ" : "Tạm hết";
    }
}
