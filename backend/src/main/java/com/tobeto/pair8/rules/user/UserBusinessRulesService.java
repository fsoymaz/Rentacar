package com.tobeto.pair8.rules.user;

import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;

import java.time.LocalDate;

public interface UserBusinessRulesService {
    void emailCheck(String email);

    void truePassword(String password, String confirmPassword);
    void usernameCheck(String username);
}
