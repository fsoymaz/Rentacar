package com.tobeto.pair8.services.dtos.car.responses;

import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.FuelType;
import com.tobeto.pair8.entities.concretes.TransmissionType;
import com.tobeto.pair8.services.dtos.color.responses.GetColorNameResponse;
import com.tobeto.pair8.services.dtos.location.responses.GetAllLocation;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import com.tobeto.pair8.services.dtos.model.responses.GetModelNameResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllListCarResponse {
    private int id;
    private Long kilometer;
    private String plate;
    private short modelYear;
    private Double dailyPrice;
    private short minFindeksRate;
    private TransmissionType transmissionType;
    private FuelType fuelType;
    private Category category;
    private short passengerCapacity;
    private Double discount;
    private String modelName;
    private String brandName;
    private String colorName;
    private String imageUrl;
    private UUID uuid;
    private GetAllLocation location;
}
