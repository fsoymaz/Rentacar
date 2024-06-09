package com.tobeto.pair8.rules.customer;


import com.tobeto.pair8.core.utilities.exceptions.entityException.DuplicateNameAndSurnameException;
import com.tobeto.pair8.core.utilities.exceptions.entityException.MinorAgeException;
import com.tobeto.pair8.core.utilities.exceptions.entityException.UserAlreadyExistsException;
import com.tobeto.pair8.repositories.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static com.tobeto.pair8.core.utilities.constants.CustomerConstants.*;

@Service
@AllArgsConstructor
public class CustomerBusinesRulesManager implements CustomerBusinessRulesService {
    private final CustomerRepository customerRepository;

    @Override
    public void sameUser(int userId) {
        if (customerRepository.existsByUserId(userId)) {
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS_MESSAGE + userId);
        }
    }

    @Override
    public void sameNameAndSurname(String name, String surName) {
        if (customerRepository.existsByFirstNameAndLastName(name, surName)) {
            throw new DuplicateNameAndSurnameException(DUPLICATE_NAME_AND_SURNAME_MESSAGE);
        }
    }

    @Override
    public void ageControl(LocalDate birthDate) {
        LocalDate now = LocalDate.now();
        LocalDate eighteenYearsAgo = now.minusYears(18);

        if (birthDate.isAfter(eighteenYearsAgo))
        {
            throw new MinorAgeException(MINOR_AGE_MESSAGE);

        }
    }
}

