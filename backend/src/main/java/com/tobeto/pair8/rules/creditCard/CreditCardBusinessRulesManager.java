package com.tobeto.pair8.rules.creditCard;


import com.tobeto.pair8.core.utilities.exceptions.entityException.DuplicateCardNumberException;
import com.tobeto.pair8.repositories.CreditCardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.CreditCardConstants.DUPLICATE_CARD_NUMBER_MESSAGE;

@Service
@AllArgsConstructor
public class CreditCardBusinessRulesManager implements CreditCardBusinessRulesService{

    private final CreditCardRepository creditCardRepository;
    @Override
    public void checkCardNumber(String cardNumber) {
        if (creditCardRepository.existsByCardNumber(cardNumber)){
            throw new DuplicateCardNumberException(DUPLICATE_CARD_NUMBER_MESSAGE + cardNumber);

        }

    }


}
