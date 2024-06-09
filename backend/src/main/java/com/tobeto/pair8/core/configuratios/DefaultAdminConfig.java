package com.tobeto.pair8.core.configuratios;

import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.entities.concretes.Role;
import com.tobeto.pair8.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Set;

@Configuration
public class DefaultAdminConfig {

    @Bean
    public CommandLineRunner createDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .email("admin@gmail.com")
                        .authorities(Role.ADMIN) // Role.ADMIN'i doğrudan atayın
                        .build();
                User savedAdmin = userRepository.save(admin);
                System.out.println("Admin user created: " + savedAdmin);
            }
        };
    }
}