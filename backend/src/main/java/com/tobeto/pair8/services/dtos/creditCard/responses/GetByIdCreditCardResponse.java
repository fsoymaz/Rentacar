package com.tobeto.pair8.services.dtos.creditCard.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCreditCardResponse {


    private String cardNumber;
    private String validityDate;
    private String cardName;
    private String cardCvc;
}
