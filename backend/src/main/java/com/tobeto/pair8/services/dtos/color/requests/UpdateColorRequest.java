package com.tobeto.pair8.services.dtos.color.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UpdateColorRequest {
    @NotNull(message = "color id bulunamadı.")
    @Positive
    private int id;
    @NotNull(message = "color name bulunamadı.")
    @Positive
    private String name;
}
