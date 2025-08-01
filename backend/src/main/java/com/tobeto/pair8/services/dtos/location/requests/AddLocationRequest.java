package com.tobeto.pair8.services.dtos.location.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddLocationRequest {
    @NotBlank(message = "Şehir adı boş olamaz")
    @Size(min = 2, max = 50, message = "Şehir adı 2-50 karakter arasında olmalıdır")
    private String city;
} 