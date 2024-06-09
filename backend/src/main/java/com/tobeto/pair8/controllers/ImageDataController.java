package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.ImageDataService;
import com.tobeto.pair8.services.dtos.image.responses.ImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/imagedata")
@AllArgsConstructor
public class ImageDataController {
    private final ImageDataService dataService;

    @PostMapping(value = "" , consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public String uploadImage(@RequestPart("image") MultipartFile file) throws IOException {
        return dataService.uploadImage(file);
    }

    @GetMapping
    public ResponseEntity<List<ImageResponse>> getAll() {
        return ResponseEntity.ok(dataService.getAll());
    }
}
