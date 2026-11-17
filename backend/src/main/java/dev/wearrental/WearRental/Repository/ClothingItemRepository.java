package dev.wearrental.WearRental.Repository;

import dev.wearrental.WearRental.Model.ClothingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {

}
