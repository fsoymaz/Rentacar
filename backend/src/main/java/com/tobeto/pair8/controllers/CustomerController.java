package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.CustomerService;
import com.tobeto.pair8.services.dtos.customer.request.*;
import com.tobeto.pair8.services.dtos.customer.responses.GetAllCustomerResponse;
import com.tobeto.pair8.services.dtos.customer.responses.GetByIdCustomerResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddCustomerRequest addCustomerRequest) {
        customerService.add(addCustomerRequest);
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateCustomerRequest updateCustomerRequest) {
        customerService.update(updateCustomerRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        customerService.delete(id);
    }

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<GetAllCustomerResponse> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdCustomerResponse getById(@RequestParam @Valid int id) {
        return customerService.getById(id);
    }




}
