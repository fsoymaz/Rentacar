package com.tobeto.pair8.services.dtos.creditCard.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCreditCardRequest {
    @NotNull
   @Length(max = 20,message = "Kart numarası 16 haneden uzun olamaz!!!")
    private String cardNumber;
    @NotNull
   @Length(max = 7, message = "Geçersiz tarih biçimi")
    private String validityDate;

    @NotNull(message = "İsim alanı boş geçilemez!!")
    private String cardName;

    @NotNull
   @Length(max = 4,message = "Cvc numarası 4 haneden uzun olamaz")
    private String cardCvc;
}
