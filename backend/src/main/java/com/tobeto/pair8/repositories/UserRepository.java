package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.CreditCard;
import com.tobeto.pair8.entities.concretes.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);


    CreditCard findByCreditId(int id);

    long count();
    Optional<User> findByUsername(String username);

    User findByResetPasswordToken(String token);
}
