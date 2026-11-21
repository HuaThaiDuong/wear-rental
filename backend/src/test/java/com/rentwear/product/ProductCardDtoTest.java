package com.rentwear.product;

import static com.rentwear.product.ProductSize.FREE;
import static com.rentwear.product.ProductSize.L;
import static com.rentwear.product.ProductSize.M;
import static com.rentwear.product.ProductSize.S;
import static com.rentwear.product.ProductSize.XL;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;

class ProductCardDtoTest {
    @Test
    void sizeRange_smallestToLargest() {
        assertThat(ProductCardDto.sizeRange(List.of(M, S, L, M))).isEqualTo("S–L");
        assertThat(ProductCardDto.sizeRange(List.of(XL, M))).isEqualTo("M–XL");
    }

    @Test
    void sizeRange_singleSize() {
        assertThat(ProductCardDto.sizeRange(List.of(M, M))).isEqualTo("M");
    }

    @Test
    void sizeRange_freeSize() {
        assertThat(ProductCardDto.sizeRange(List.of(FREE, FREE))).isEqualTo("Free size");
        assertThat(ProductCardDto.sizeRange(List.of(FREE, S, M))).isEqualTo("S–M");
    }

    @Test
    void sizeRange_noItems() {
        assertThat(ProductCardDto.sizeRange(List.of())).isNull();
    }

    @Test
    void availabilityText() {
        assertThat(ProductCardDto.availabilityText(3)).isEqualTo("Còn 3 bộ");
        assertThat(ProductCardDto.availabilityText(0)).isEqualTo("Tạm hết");
    }
}
