package com.tobeto.pair8.services.dtos.invoice.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.tobeto.pair8.entities.concretes.Rental;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AddInvoiceRequest {
    @NotBlank(message = "Fatura No Giriniz!")
    @Size(min = 7)
    @Pattern(regexp = "[0-9]{7}", message = "Fatura numarası 7 haneli olmalı (7 haneli)")
    private String invoiceNo;
    @Min(value = 2/10, message = "Kdv Oranı %20'dir")
    private Float taxRate;

    private double totalPrice;
    private int rentalId;
    private Rental rental;

    public AddInvoiceRequest(Rental rental,double totalPrice) {
        this.rental = rental;
        this.totalPrice =totalPrice;

    }


}
