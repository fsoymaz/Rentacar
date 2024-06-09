package com.tobeto.pair8.rules.customer;

import java.time.LocalDate;

public interface CustomerBusinessRulesService {
    void sameUser(int userId);
    void sameNameAndSurname(String name, String surName);
    void ageControl(LocalDate birthDate);
}
