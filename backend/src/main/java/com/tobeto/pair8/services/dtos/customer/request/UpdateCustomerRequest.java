package com.tobeto.pair8.services.dtos.customer.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateCustomerRequest {

    @Min(value = 1, message = "Geçerli bir müşteri ID'si giriniz")
    private int id;

    @NotBlank(message = "Ad boş olamaz")
    @Size(min = 1, max = 50, message = "Ad en az 1, en fazla 50 karakter olmalıdır")
    private String firstName;

    @NotBlank(message = "Soyad boş olamaz")
    @Size(min = 1, max = 50, message = "Soyad en az 1, en fazla 50 karakter olmalıdır")
    private String lastName;

    @NotNull(message = "Doğum tarihi boş olamaz")
    private LocalDate birthDate;

    @NotNull(message = "Kullanıcı ID boş olamaz")
    private Integer userId;
}
