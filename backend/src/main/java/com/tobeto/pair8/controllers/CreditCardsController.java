package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.CreditCardService;
import com.tobeto.pair8.services.dtos.creditCard.requests.AddCreditCardRequest;
import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/creditsCard")
@AllArgsConstructor
public class CreditCardsController {

    private CreditCardService creditCardService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestParam("userId") int userId ,@RequestBody @Valid AddCreditCardRequest addCreditCardRequest) {
        creditCardService.add(userId,addCreditCardRequest);
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public GetByIdCreditCardResponse getById(@RequestParam int id) {
        return creditCardService.getById(id);
    }
}
