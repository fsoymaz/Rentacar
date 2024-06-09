package com.tobeto.pair8.services.dtos.customer.responses;

import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import lombok.Data;

@Data
public class GetByIdCustomerResponse {
    private String firstName;
    private String lastName;
    private GetListUserResponse userListResponse;
}
