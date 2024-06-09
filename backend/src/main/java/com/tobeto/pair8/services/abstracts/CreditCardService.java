package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.creditCard.requests.AddCreditCardRequest;
import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;

import java.util.List;

public interface CreditCardService {
    void add(int userId , AddCreditCardRequest addCreditCardRequest);
    GetByIdCreditCardResponse getById(int id);
    GetByIdCreditCardResponse getCreditCardById(int id);
}
