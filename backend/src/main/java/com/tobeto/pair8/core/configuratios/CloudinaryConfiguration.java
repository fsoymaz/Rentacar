package com.tobeto.pair8.core.configuratios;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {
    private final String CLOUD_NAME = "dq6lsgssu";
    private final String API_KEY = "497253711217487";
    private final String API_SECRET = "efMt1UeiEVGZ2qSUhurVyIIs4xE";

    @Bean
    public Cloudinary cloudinary(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);

        return new Cloudinary(config);
    }
}
