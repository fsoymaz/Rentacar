package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.customer.request.AddRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.customer.request.UpdateRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.auth.requests.LoginRequest;

public interface AutService {

    Object login(LoginRequest loginRequest);

    void registerCustomerAndUserAdd(AddRegisterCustomerAndUser addRegisterCustomerAndUser);
    void registerCustomerAndUserUpdate(UpdateRegisterCustomerAndUser updateRegisterCustomerAndUser);
}
