package com.rentwear.store;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByStatusOrderBySortOrderAsc(StoreStatus status);

    Optional<Store> findByIdAndStatus(Long id, StoreStatus status);
}
