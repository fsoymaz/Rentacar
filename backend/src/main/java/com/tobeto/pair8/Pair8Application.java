package com.tobeto.pair8;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Pair8Application {

    public static void main(String[] args) {
        // Load .env file if it exists (for local development)
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory(System.getProperty("user.dir"))
                    .ignoreIfMissing()
                    .load();

            // Only set system properties if they're not already set (Docker environment variables take precedence)
            setPropertyIfNotExists("spring.datasource.url", dotenv.get("DATABASE_URL"));
            setPropertyIfNotExists("spring.datasource.username", dotenv.get("DATABASE_USERNAME"));
            setPropertyIfNotExists("spring.datasource.password", dotenv.get("DATABASE_PASSWORD"));
            setPropertyIfNotExists("spring.security.jwt.key", dotenv.get("JWT_KEY"));
            setPropertyIfNotExists("spring.mail.username", dotenv.get("MAIL_USERNAME"));
            setPropertyIfNotExists("spring.mail.password", dotenv.get("MAIL_PASSWORD"));
        } catch (Exception e) {
            System.out.println("No .env file found, using environment variables or application.properties");
        }

        SpringApplication.run(Pair8Application.class, args);
    }

    private static void setPropertyIfNotExists(String propertyName, String value) {
        if (System.getProperty(propertyName) == null && value != null && !value.isEmpty()) {
            System.setProperty(propertyName, value);
        }
    }
}