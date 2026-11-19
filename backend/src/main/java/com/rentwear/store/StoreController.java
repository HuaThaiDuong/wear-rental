package com.rentwear.store;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public List<StoreDto> getAll() {
        return storeService.getAll();
    }

    @GetMapping("/{id}")
    public StoreDto getById(@PathVariable Long id) {
        return storeService.getById(id);
    }
}
