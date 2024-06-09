package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCard,Integer> {
    boolean existsByCardNumber(String cardNumber);

    CreditCard findByUsersId(int id);
}
