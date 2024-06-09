package com.tobeto.pair8.services.concretes;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        System.out.println("Mail sent to " + to);
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, click the link below:\n" +
                "http://localhost:8080/reset-password?token=" + token);

        mailSender.send(message);
    }

    public void sendUpdateInfoEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Account Update");
        message.setText("Your account information has been updated successfully.");

        mailSender.send(message);
    }

    public void sendWelcomeEmail(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Welcome");
        message.setText("Welcome to our platform! We're glad to have you here.");

        mailSender.send(message);
    }
}