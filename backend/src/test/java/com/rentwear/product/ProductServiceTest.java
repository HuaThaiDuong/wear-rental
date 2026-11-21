package com.rentwear.product;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

import com.rentwear.common.ApiException;

class ProductServiceTest {
    private final ProductService service = new ProductService(null, null, null);

    @Test
    void limitOutOfRange_isBadRequest() {
        assertThatThrownBy(() -> service.getCards("popular", 0))
                .isInstanceOf(ApiException.class).hasMessageContaining("limit");
        assertThatThrownBy(() -> service.getCards("popular", 51))
                .isInstanceOf(ApiException.class).hasMessageContaining("limit");
    }

    @Test
    void unknownSort_isBadRequest() {
        assertThatThrownBy(() -> service.getCards("cheapest", 4))
                .isInstanceOf(ApiException.class).hasMessageContaining("sort");
    }
}
