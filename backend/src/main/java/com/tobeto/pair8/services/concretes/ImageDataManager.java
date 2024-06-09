package com.tobeto.pair8.services.concretes;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.tobeto.pair8.core.utilities.images.ImageUtils;
import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Brand;
import com.tobeto.pair8.entities.concretes.Car;
import com.tobeto.pair8.entities.concretes.ImageData;
import com.tobeto.pair8.repositories.ImageDataRepository;
import com.tobeto.pair8.services.abstracts.ImageDataService;
import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.image.responses.ImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ImageDataManager implements ImageDataService {

    private final ImageDataRepository dataRepository;
    private final Cloudinary cloudinary;
    private final ModelMapperService modelMapperService;

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        ImageData imageData = ImageData.builder()
                .imageUrl(cloudinary.uploader()
                        .upload(file.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                        .get("url")
                        .toString())
                .build();

        dataRepository.save(imageData);
        return imageData.getImageUrl();
    }

    @Override
    public List<ImageResponse> getAll() {
        List<ImageData> images = dataRepository.findAll();
        List<ImageResponse> imageResponses = images.stream()
                .map(image -> this.modelMapperService
                        .forResponse().map(image, ImageResponse.class))
                .collect(Collectors.toList());
        return imageResponses;
    }
}
