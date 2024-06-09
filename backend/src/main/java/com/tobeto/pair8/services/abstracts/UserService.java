package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;
import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair8.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair8.services.dtos.user.responses.GetByIdUserResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    void add(AddUserRequest addUserRequest);
    void update(UpdateUserRequest updateUserRequest);

    void updateV2(UpdateUserRequest updateUserRequest);

    void delete(Integer deleteUserRequest);
    List<GetListUserResponse> getAll();

    GetByIdUserResponse getById(int id);

    GetByIdCreditCardResponse getCreditCardById(int id);

    long getUserCount();
    //String login(LoginRequest loginRequest);


}
