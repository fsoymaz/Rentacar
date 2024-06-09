package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.CreditCard;
import com.tobeto.pair8.entities.concretes.Model;
import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.repositories.CreditCardRepository;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.rules.creditCard.CreditCardBusinessRulesManager;
import com.tobeto.pair8.services.abstracts.CreditCardService;
import com.tobeto.pair8.services.abstracts.UserService;
import com.tobeto.pair8.services.dtos.creditCard.requests.AddCreditCardRequest;
import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;
import com.tobeto.pair8.services.dtos.model.responses.GetByIdModelResponse;
import com.tobeto.pair8.services.dtos.user.requests.UpdateUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CreditCardManeger implements CreditCardService {


    private final CreditCardRepository creditCardRepository;
    private final ModelMapperService modelMapperService;
    private final CreditCardBusinessRulesManager creditCardBusinessRulesManager;
    private final UserService userService;


    @Override
    public void add(int userId, AddCreditCardRequest addCreditCardRequest) {

        creditCardBusinessRulesManager.checkCardNumber(addCreditCardRequest.getCardNumber());
        CreditCard creditCard = this.modelMapperService.forRequest().map(addCreditCardRequest, CreditCard.class);
        CreditCard savedCreditCart = creditCardRepository.save(creditCard);
        userService.updateV2(new UpdateUserRequest(userId,savedCreditCart));

    }

    @Override
    public GetByIdCreditCardResponse getById(int id) {
        CreditCard creditCard = creditCardRepository.findById(id).orElseThrow();
        GetByIdCreditCardResponse creditCardResponse = this.modelMapperService.forResponse().map(creditCard, GetByIdCreditCardResponse.class);
        return creditCardResponse;
    }

    @Override
    public GetByIdCreditCardResponse getCreditCardById(int id) {
        CreditCard creditCard = creditCardRepository.findByUsersId(id);
        GetByIdCreditCardResponse creditCardResponse = this.modelMapperService.forResponse().map(creditCard, GetByIdCreditCardResponse.class);
        return creditCardResponse;
    }



}
