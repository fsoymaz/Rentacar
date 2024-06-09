package com.tobeto.pair8.services.dtos.car.responses;

import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.FuelType;
import com.tobeto.pair8.entities.concretes.TransmissionType;
import com.tobeto.pair8.services.dtos.color.responses.GetColorNameResponse;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarResponse {
    private Short modelYear;
    private Long kilometer;
    private String plate;
    private Double dailyPrice;
    private Double discount;
    private String imagePath;
    private GetAllListModelRespose model;
    private GetColorNameResponse color;
    private TransmissionType transmissionType;
    private FuelType fuelType;
    private Category category;
}