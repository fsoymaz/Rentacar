package com.tobeto.pair8.rules.user;


import com.tobeto.pair8.core.utilities.exceptions.entityException.EmailAlreadyExistsException;
import com.tobeto.pair8.core.utilities.exceptions.entityException.PasswordMismatchException;
import com.tobeto.pair8.core.utilities.exceptions.entityException.UserAlreadyExistsException;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.UserConstants.*;


@Service
@AllArgsConstructor
public class UserBusinessRulesManager implements UserBusinessRulesService {
    private final UserRepository userRepository;



    @Override
    public void emailCheck(String email) {
        if (userRepository.existsByEmail(email))
        {
            throw new EmailAlreadyExistsException(EMAIL_ALREADY_EXISTS_MESSAGE);
        }
    }

    @Override
    public void truePassword(String password, String confirmPassword) {

        if (!password.equals(confirmPassword)) {
            throw new PasswordMismatchException(PASSWORD_MISMATCH_MESSAGE);

        }
    }

    @Override
    public void usernameCheck(String username) {
        if (userRepository.existsByUsername(username))
        {
            throw new UserAlreadyExistsException(USER_ALREADY_EXISTS_MESSAGE + username);
        }
    }


}
