package com.tobeto.pair8;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Pair8Application {

    public static void main(String[] args) {
        // Https deneme
        Dotenv dotenv = Dotenv.configure()
                .directory(System.getProperty("user.dir"))
                .load();

        System.setProperty("spring.datasource.url", dotenv.get("DATABASE_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("DATABASE_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("DATABASE_PASSWORD"));
        System.setProperty("spring.security.jwt.key", dotenv.get("JWT_KEY"));
        System.setProperty("spring.mail.username", dotenv.get("MAIL_USERNAME"));
        System.setProperty("spring.mail.password", dotenv.get("MAIL_PASSWORD"));

        SpringApplication.run(Pair8Application.class, args);
    }
}