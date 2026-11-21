package com.rentwear.product;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.rentwear.common.ApiException;

@WebMvcTest(ProductController.class)
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    private static final ProductCardDto VEST = new ProductCardDto(2L, "vest-nam-xanh-navy", "Vest nam xanh navy",
            "M–XL", 800000L, 180000L, "Thuê theo ngày", 0, 3, "Còn 3 bộ", null);

    @Test
    void popular_returnsCardsWithFrontendFieldNames() throws Exception {
        given(productService.getCards("popular", 4)).willReturn(List.of(VEST));

        mockMvc.perform(get("/api/products").param("sort", "popular").param("limit", "4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Vest nam xanh navy"))
                .andExpect(jsonPath("$[0].size").value("M–XL"))
                .andExpect(jsonPath("$[0].deposit").value(800000))
                .andExpect(jsonPath("$[0].price").value(180000))
                .andExpect(jsonPath("$[0].rentalPlan").value("Thuê theo ngày"))
                .andExpect(jsonPath("$[0].discountPercent").value(0))
                .andExpect(jsonPath("$[0].availability").value("Còn 3 bộ"))
                .andExpect(jsonPath("$[0].image").doesNotExist());
    }

    @Test
    void defaults_arePopularAnd12() throws Exception {
        given(productService.getCards("popular", 12)).willReturn(List.of(VEST));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(2));
    }

    @Test
    void badParams_return400() throws Exception {
        given(productService.getCards("cheapest", 12))
                .willThrow(ApiException.badRequest("sort chỉ nhận popular hoặc newest"));

        mockMvc.perform(get("/api/products").param("sort", "cheapest"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"));

        mockMvc.perform(get("/api/products").param("limit", "abc"))
                .andExpect(status().isBadRequest());
    }
}
