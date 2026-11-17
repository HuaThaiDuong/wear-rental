package dev.wearrental.WearRental.Repository;

import dev.wearrental.WearRental.Model.Rental;
import dev.wearrental.WearRental.Model.RentalStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Long> {
    @Query("""
            select count(r) from Rental r
            where r.item.id = :itemId
                and r.status in :statuses
                and r.startDate <= :end
                and r.endDate >= :start""")
    long countOverlapping(@Param("itemId") Long itemId,
                          @Param("start") LocalDate start,
                          @Param("end") LocalDate end,
                          @Param("statuses")Collection<RentalStatus> statuses);

    @EntityGraph(attributePaths = {"customer", "item"})
    @Query("select r from Rental r where r.id = :id")
    Optional<Rental> findWithDetailsById(@Param("id") long id);

    boolean existsByItemId(Long itemId);
    boolean existsByCustomerId(Long customerId);
}
