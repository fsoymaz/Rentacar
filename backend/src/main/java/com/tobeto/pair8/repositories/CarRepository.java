package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Car;
import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.Location;
import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByPlateResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {
    boolean existsByPlate(String plate);

    @Query("SELECT new com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse(" +
            "c.id, c.kilometer, c.plate, c.modelYear, c.dailyPrice, c.minFindeksRate, " +
            "c.transmissionType, c.fuelType, c.category, c.passengerCapacity, c.discount, " +
            "c.model.name, c.model.brand.name, c.color.name, c.image.imageUrl, c.uuid," +
            "new com.tobeto.pair8.services.dtos.location.responses.GetAllLocation(c.location.id, c.location.name)) " +
            "FROM Car c WHERE c.category = :category")
    List<GetAllListCarResponse> findByCategory(@Param("category") Category category);

    @Query("SELECT new com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse(" +
            "c.id, c.kilometer, c.plate, c.modelYear, c.dailyPrice, c.minFindeksRate, " +
            "c.transmissionType, c.fuelType, c.category, c.passengerCapacity, c.discount, " +
            "c.model.name, c.model.brand.name, c.color.name, c.image.imageUrl, c.uuid," +
            "new com.tobeto.pair8.services.dtos.location.responses.GetAllLocation(c.location.id, c.location.name)) " +
            "FROM Car c "  +
            "WHERE c.id NOT IN (" +
            "    SELECT r.car.id " +
            "    FROM Rental r " +
            "    WHERE r.startDate <= :endDate AND r.endDate >= :startDate" +
            ") AND c.location.id = :locationId AND c.discount <> 0")
    List<GetAllListCarResponse> findAvailableCars(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("locationId") Integer locationId);

    @Query("SELECT new com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse(" +
            "c.id, c.kilometer, c.plate, c.modelYear, c.dailyPrice, c.minFindeksRate, " +
            "c.transmissionType, c.fuelType, c.category, c.passengerCapacity, c.discount, " +
            "c.model.name, c.model.brand.name, c.color.name, c.image.imageUrl, c.uuid," +
            "new com.tobeto.pair8.services.dtos.location.responses.GetAllLocation(c.location.id, c.location.name)) " +
            "FROM Car c "  +
            "WHERE (:category IS NULL OR c.category = :category) AND " +
            "(:minPrice IS NULL OR c.dailyPrice >= :minPrice) AND " +
            "(:maxPrice IS NULL OR c.dailyPrice <= :maxPrice) AND " +
            "c.id NOT IN (" +
            "    SELECT r.car.id " +
            "    FROM Rental r " +

            "    WHERE r.startDate <= :endDate AND r.endDate >= :startDate" +
            ") " +
            "AND c.location.id = :locationId AND c.discount <= 0")
    List<GetAllListCarResponse> findAvailableCarsByCategory(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("locationId") Integer locationId,
            @Param("category") Category category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    @Query("SELECT new com.tobeto.pair8.services.dtos.car.responses.GetByPlateResponse(" +
            "c.id, c.kilometer, c.plate, c.modelYear, c.dailyPrice, c.minFindeksRate, " +
            "c.transmissionType, c.fuelType, c.category, c.passengerCapacity" +
            ") FROM Car c WHERE c.plate = :plate")
    GetByPlateResponse findPlate(@Param("plate") String plate);


    @Query("SELECT new com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse(" +
            "c.id, c.kilometer, c.plate, c.modelYear, c.dailyPrice, c.minFindeksRate, " +
            " c.transmissionType, c.fuelType, c.category, c.passengerCapacity, c.discount, " +
            "c.model.name, c.model.brand.name, c.color.name, c.image.imageUrl, c.uuid," +
            "new com.tobeto.pair8.services.dtos.location.responses.GetAllLocation(c.location.id, c.location.name)) " +
            "FROM Car c " +
            "JOIN c.model " +
            "JOIN c.model.brand " +
            "JOIN c.color " +
            "JOIN c.location " +
            "WHERE c.id NOT IN (" +
            "    SELECT r.car.id " +
            "    FROM Rental r " +
            "    WHERE r.startDate <= CURRENT_DATE " +
            "    AND r.endDate >= CURRENT_DATE) " +
            "AND c.discount > 0")
    List<GetAllListCarResponse> findwithDiscountCars();


    @Query("SELECT COUNT(c) FROM Car c")
    Long countTotalCars();


}