package com.tobeto.pair8.services.dtos.car.requests;

import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.FuelType;
import com.tobeto.pair8.entities.concretes.TransmissionType;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateCarRequest {
 @NotNull(message = " id alanı boş olamaz!!!")
 private  int id;



 @Min(value = 2005, message = "Model yılı en az 2005 olabilir.")
 @Max(value = 2024, message = "Model yılı 2024'ten büyük olmaz")
 private short modelYear;

 @Pattern(regexp = "^(\\d{1,2}\\s?[A-Z]{1,3}\\s?\\d{1,4})?$", message = "Geçersiz plaka formatı")
 private String plate;

 public void setPlate(String plate) {
  System.out.println("işe yarıyor mu");
  this.plate = plate != null ? plate.replaceAll("\\s", "") : null;
 }

 @NotNull
 @Positive
 @Min(value = 50,message = "Kredi Notunuz 50 den düşük olamaz.")
 private short minFindeksRate;

 @NotNull(message = "Vites tipi belirtilmelidir.")
 private TransmissionType transmissionType;

 @NotNull(message = "Yakıt tipi belirtilmelidir.")
 private FuelType fuelType;

 @NotNull(message = "Category tipi belirtilmelidir")
 private Category category;

 @NotNull
 @PositiveOrZero(message = "Kilometere 0 'dan küçük olamaz.")
 private Long kilometer;



 @Positive(message ="Günlük Ücret için geçerli bir değer giriniz!")
 private Double dailyPrice;


 private String imagePath;

 private short passengerCapacity;
 private Double discount;

}

