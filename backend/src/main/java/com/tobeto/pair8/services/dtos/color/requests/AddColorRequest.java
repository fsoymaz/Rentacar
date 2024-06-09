package com.tobeto.pair8.services.dtos.color.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddColorRequest {
    //Lenght olarak kullanımıda mevcuttur.
    @Size(min = 2, message = "Renk Alanı en az iki olabilir.")
    private String name;
}
