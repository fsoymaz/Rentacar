package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
    @Query("SELECT COUNT(r) > 0 FROM Rental r " +
            "WHERE (r.car.id = :carId OR r.user.id = :userId) AND " +
            "((r.startDate <= :endDate AND r.endDate >= :startDate) OR " +
            "(r.startDate <= :startDate AND r.endDate >= :endDate))")
    boolean existsByCarIdOrUserIdAndDateRange(
            @Param("carId") int carId,
            @Param("userId") int userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    @Query("SELECT COUNT(r) FROM Rental r WHERE r.startDate <= :date AND r.endDate >= :date")
    Long countDailyRentedCars(@Param("date") LocalDate date);

    @Query("SELECT SUM(r.totalPrice) FROM Rental r WHERE MONTH(r.startDate) = :month AND YEAR(r.startDate) = :year")
    Double findMonthlyIncome(@Param("month") int month, @Param("year") int year);

    @Query("SELECT MONTH(r.startDate), SUM(r.totalPrice) FROM Rental r WHERE YEAR(r.startDate) = :year GROUP BY MONTH(r.startDate)")
    List<Object[]> findYearlyIncome(@Param("year") int year);

    @Query("SELECT MIN(r.startDate), SUM(r.totalPrice) FROM Rental r " +
            "WHERE MONTH(r.startDate) = :month " +
            "GROUP BY WEEK(r.startDate) ORDER BY MIN(r.startDate)")
    List<Object[]> findWeeklyIncomeForMonth(@Param("month") int month);

    @Query("SELECT r.startDate, SUM(r.totalPrice) FROM Rental r " +
            "WHERE r.startDate >= :start AND r.startDate <= :end " +
            "GROUP BY r.startDate ORDER BY r.startDate")
    List<Object[]> findSalesForPeriod(@Param("start") LocalDate start, @Param("end") LocalDate end);
}
