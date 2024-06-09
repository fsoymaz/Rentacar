package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    boolean existsByUserId(int userId);
    boolean existsByFirstNameAndLastName(String name, String surName);

    Customer findByUserId(Integer id);
}
