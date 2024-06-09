package com.tobeto.pair8.services.dtos.brand.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdateBrandRequest {
    @NotNull
    @Positive(message = "Lütfen geçerli bir sayı giriniz!!!!")
    private int id;
    @NotBlank(message = "Marka alanları boş geçilemez!!!!!")
    private String name;
}
