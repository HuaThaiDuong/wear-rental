package com.rentwear.store;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentwear.common.ApiException;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    @Transactional(readOnly = true)
    public List<StoreDto> getAll() {
        return storeRepository.findAllByStatusOrderBySortOrderAsc(StoreStatus.ACTIVE).stream()
                .map(StoreDto::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public StoreDto getById(Long id) {
        return storeRepository.findByIdAndStatus(id, StoreStatus.ACTIVE)
                .map(StoreDto::from)
                .orElseThrow(() -> ApiException.notFound("Không tìm thấy cửa hàng"));
    }
}
