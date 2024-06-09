package com.tobeto.pair8.services.dtos.car.requests;

import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.FuelType;
import com.tobeto.pair8.entities.concretes.TransmissionType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {

    @Min(value = 2005, message = "Model yılı en az 2005 olabilir.")
    @Max(value = 2024, message = "Model yılı 2024'ten büyük olmaz")
    private short modelYear;

    @Pattern(regexp = "^(\\d{1,2}\\s?[A-Z]{1,3}\\s?\\d{1,4})?$", message = "Geçersiz plaka formatı")
    private String plate;

    public void setPlate(String plate) {
        this.plate = plate != null ? plate.replaceAll("\\s", "") : null;
    }

    @NotNull
    @Positive
    @Min(value = 50,message = "Kredi Notunuz 50 den düşük olamaz.")
    private short minFindeksRate;


    @NotNull
    @PositiveOrZero(message = "Kilometere 0 'dan küçük olamaz.")
    private Long kilometer;

    @NotNull(message = "Vites tipi belirtilmelidir.")
    private TransmissionType transmissionType;

    @NotNull(message = "Yakıt tipi belirtilmelidir.")
    private FuelType fuelType;

    private Category category;

    @Positive(message ="Günlük Ücret için geçerli bir değer giriniz!")
    private Double DailyPrice;

    private short passengerCapacity;

    @Positive
    private int modelId;
    @Positive
    private int colorId;
    private int locationId;
    private Double discount;
}
