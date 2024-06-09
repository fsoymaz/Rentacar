package com.tobeto.pair8.core.services;

import com.cloudinary.Cloudinary;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
public class CloudinaryManager{
    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws IOException {
        return cloudinary.uploader()
                .upload(file.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();
    }
}
