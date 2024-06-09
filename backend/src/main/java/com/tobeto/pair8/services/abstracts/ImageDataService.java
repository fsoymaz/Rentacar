package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.image.responses.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageDataService {
    String uploadImage(MultipartFile file) throws IOException;
    List<ImageResponse> getAll();


}
