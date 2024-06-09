package com.tobeto.pair8.services.dtos.rental.requests;

import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AddRentalRequest {
    @FutureOrPresent(message = "Başlangıç Tarihi bugünden önce olamaz!")
    private LocalDate startDate;
    private LocalDate endDate;
    private int carId;
    private int userId;
}
