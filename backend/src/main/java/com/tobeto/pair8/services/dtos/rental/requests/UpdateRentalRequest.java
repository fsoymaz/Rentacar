package com.tobeto.pair8.services.dtos.rental.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateRentalRequest {
    @NotNull(message = "id boş geçilemez")
    @Positive(message = "id sıfırdan büyük olmalıdır.")
    private int id;

    @FutureOrPresent(message = "Tarih bugünden eski olamaz!")
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnDate;
    @PositiveOrZero(message = "Başlangıç kilometresi sıfır veya üzeri olmalıdır!")
    private Long startKilometer;

    @Min(value = 200, message = "Minimum tutar 200 olmalıdır!")
    private double totalPrice;

    private int carId;
    private int userId;
}
