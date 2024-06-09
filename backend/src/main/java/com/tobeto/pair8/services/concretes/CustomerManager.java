package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Customer;
import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.repositories.CustomerRepository;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.rules.customer.CustomerBusinessRulesService;
import com.tobeto.pair8.rules.user.UserBusinessRulesService;
import com.tobeto.pair8.services.abstracts.CustomerService;
import com.tobeto.pair8.services.dtos.customer.request.*;
import com.tobeto.pair8.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair8.services.dtos.customer.responses.GetByIdCustomerResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerManager implements CustomerService {
    private final CustomerRepository customerRepository;
    private final ModelMapperService modelMapperService;
    private final CustomerBusinessRulesService customerBusinessRulesService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserBusinessRulesService userBusinessRulesService;


    @Override
    public void add(AddCustomerRequest addCustomerRequest) {
        customerBusinessRulesService.sameUser(addCustomerRequest.getUserId());
        customerBusinessRulesService.sameNameAndSurname(addCustomerRequest.getFirstName(), addCustomerRequest.getLastName());
        customerBusinessRulesService.ageControl(addCustomerRequest.getBirthDate());
        Customer customer = this.modelMapperService.forRequest().map(addCustomerRequest, Customer.class);

        customerRepository.save(customer);
    }

    @Override
    public void update(UpdateCustomerRequest updateCustomerRequest) {
        //customerBusinessRulesService.sameNameAndSurname(updateCustomerRequest.getFirstName(), updateCustomerRequest.getLastName());
        customerBusinessRulesService.ageControl(updateCustomerRequest.getBirthDate());
        Customer customerToUpdate = customerRepository.findById(updateCustomerRequest.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(updateCustomerRequest, customerToUpdate);
        customerRepository.saveAndFlush(customerToUpdate);
    }

    @Override
    public void delete(Integer id) {
        Customer customerToDelete = customerRepository.findById(id).orElseThrow();
        customerRepository.delete(customerToDelete);

    }

    @Override
    public List<GetAllCustomerResponse> getAll() {
        List<Customer> customers = customerRepository.findAll();
        List<GetAllCustomerResponse> getAllCustomerResponses = customers.stream()
                .map(customer -> this.modelMapperService
                        .forResponse().map(customer, GetAllCustomerResponse.class))
                .collect(Collectors.toList());
        return getAllCustomerResponses;
    }

    @Override
    public GetByIdCustomerResponse getById(int id) {
        if (!customerRepository.existsById(id)) {
            throw new EntityNotFoundException("Customer not found");
        }
        Customer customer = customerRepository.findById(id).orElseThrow();
        GetByIdCustomerResponse getByIdCustomerResponse =
                this.modelMapperService.forResponse().map(customer, GetByIdCustomerResponse.class);
        return getByIdCustomerResponse;
    }

    @Override
    public Customer getByUserId(Integer id) {

        return  customerRepository.findByUserId(id);
    }


}

