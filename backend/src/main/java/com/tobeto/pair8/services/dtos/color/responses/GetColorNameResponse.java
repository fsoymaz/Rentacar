package com.tobeto.pair8.services.dtos.color.responses;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetColorNameResponse {
    @NotNull(message = "isim alanı boş olamaz!!!")
    private String name;
}
