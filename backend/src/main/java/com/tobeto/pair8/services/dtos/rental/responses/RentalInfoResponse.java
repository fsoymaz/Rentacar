package com.tobeto.pair8.services.dtos.rental.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RentalInfoResponse {
    private String firstName;
    private String lastName;
    private String invoiceNo;
    private double totalPrice;
    private Double dailyPrice;
    private Float taxRate;
    private LocalDate startDate;
    private LocalDate endDate;
    private String plate;
    private String email;



}
