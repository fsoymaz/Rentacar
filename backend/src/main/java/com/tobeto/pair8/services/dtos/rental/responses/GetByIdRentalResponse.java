package com.tobeto.pair8.services.dtos.rental.responses;

import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdRentalResponse {
    private int id;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnDate;
    private double totalPrice;

}
