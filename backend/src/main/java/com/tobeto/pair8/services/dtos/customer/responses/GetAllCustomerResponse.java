package com.tobeto.pair8.services.dtos.customer.responses;

import com.tobeto.pair8.services.dtos.user.responses.GetByIdUserResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCustomerResponse {
    private int id;
    private String firstName;
    private String lastName;
    private GetListUserResponse user;
}
