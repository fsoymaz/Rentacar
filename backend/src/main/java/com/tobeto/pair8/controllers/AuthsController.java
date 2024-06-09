package com.tobeto.pair8.controllers;


import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.services.abstracts.AutService;
import com.tobeto.pair8.services.concretes.MailService;
import com.tobeto.pair8.services.dtos.customer.request.AddRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.auth.requests.LoginRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api/auths")
@AllArgsConstructor
public class AuthsController {
    private PasswordEncoder passwordEncoder;

    private final AutService authService;
    private final UserRepository userRepository;
    private final MailService mailService;

    @PostMapping("login")
    @ResponseStatus(HttpStatus.OK)
    public Object login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("registerCustomer")
    void registerCustomerAndUserAdd(@RequestBody @Valid AddRegisterCustomerAndUser addRegisterCustomerAndUser){
        authService.registerCustomerAndUserAdd(addRegisterCustomerAndUser);

    }

    // Parola sıfırlama talebini alacak endpoint
    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String token = UUID.randomUUID().toString();

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setResetPasswordToken(token);
            userRepository.save(user);

            // E-posta gönder
            mailService.sendPasswordResetEmail(user.getEmail(), token);

            return ResponseEntity.ok("Password reset link has been sent to your email.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + email);
        }
    }

    // Parola sıfırlama bağlantısını işleyecek endpoint
    @PostMapping("/reset-password")
    public ResponseEntity<?> processResetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        // Kullanıcıyı token ile bul
        User user = userRepository.findByResetPasswordToken(token);

        // Yeni parolayı kaydet
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        userRepository.save(user);

        return ResponseEntity.ok("Your password has been updated.");
    }

}
