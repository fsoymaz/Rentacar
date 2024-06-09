package com.tobeto.pair8.services.dtos.invoice.requests;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateInvoiceRequest {
    @NotNull(message = "model id boş olamaz")
    private int id;
    @NotBlank(message = "Fatura No Giriniz!")
    @Size(min = 7)
    private String InvoiceNo;
    @NotNull
    @Min(value = 200, message = "Ücret 200'den küçük olamaz")
    private Float totalPrice;
    private Float discountRate;
    @Min(value = 2/10, message = "Kdv Oranı %20'dir")
    private Float taxRate;

    private int rentalId;
}
