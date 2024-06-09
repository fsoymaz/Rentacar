package com.tobeto.pair8.services.dtos.rental.responses;

import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetListRentalResponse {
    private LocalDate startDate;
    private LocalDate endDate;
    private Double totalPrice;
    private GetAllListCarResponse carResponse;
    private GetListUserResponse userResponse;
}
