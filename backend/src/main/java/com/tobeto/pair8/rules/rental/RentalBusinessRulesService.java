package com.tobeto.pair8.rules.rental;

import com.tobeto.pair8.services.dtos.rental.requests.AddRentalRequest;

import java.time.LocalDate;

public interface RentalBusinessRulesService {
    void dateControl(LocalDate startDate, LocalDate endDate);
    void availableCar(int carId, int userId, LocalDate startDate, LocalDate endDate);

    void maxRentalDays(LocalDate startDate, LocalDate endDate);

    void maxRentalDaysForDiscountedCar(int carId, LocalDate startDate, LocalDate endDate);
}
