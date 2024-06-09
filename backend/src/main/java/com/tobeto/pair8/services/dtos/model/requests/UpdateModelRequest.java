package com.tobeto.pair8.services.dtos.model.requests;

import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;
import com.tobeto.pair8.services.dtos.brand.responses.GetIdBrandResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateModelRequest {
   @NotNull(message = "model id boş olamaz")
    private int id;
   @NotBlank(message = "isim boş olamaz")
    private String name;

   private int brandId;
    //GetAllListBrandResponse'un burada ne için olduğunu anlamadığım için sildim
}
