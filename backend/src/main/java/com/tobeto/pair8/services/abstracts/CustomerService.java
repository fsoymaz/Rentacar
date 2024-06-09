package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.entities.concretes.Customer;
import com.tobeto.pair8.services.dtos.customer.request.*;
import com.tobeto.pair8.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair8.services.dtos.customer.responses.GetByIdCustomerResponse;

import java.util.List;

public interface CustomerService {
    void add(AddCustomerRequest addCustomerRequest);
    void update(UpdateCustomerRequest updateCustomerRequest);
    void delete(Integer id);

    List<GetAllCustomerResponse> getAll();

    GetByIdCustomerResponse getById(int id);


    Customer getByUserId(Integer id);
}
