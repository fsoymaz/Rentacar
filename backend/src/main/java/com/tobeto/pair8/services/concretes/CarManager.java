package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Car;
import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.entities.concretes.ImageData;
import com.tobeto.pair8.repositories.CarRepository;
import com.tobeto.pair8.repositories.ImageDataRepository;
import com.tobeto.pair8.rules.car.CarBusinessRulesMenager;
import com.tobeto.pair8.rules.car.CarBusinessRulesService;
import com.tobeto.pair8.services.abstracts.CarService;
import com.tobeto.pair8.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair8.services.dtos.car.requests.CarDiscountRequest;
import com.tobeto.pair8.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByPlateResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarManager implements CarService {
    private final CarRepository carRepository;
    private final ModelMapperService modelMapperService;
    private final ImageDataManager imageDataManager;
    private final ImageDataRepository dataRepository;
    private final CarBusinessRulesService carBusinessRulesService;
    @Override
    public List<GetAllListCarResponse> getAll() {
        List<Car> cars = carRepository.findAll();
        List<GetAllListCarResponse> carResponses = cars.stream()
                .map(car -> this.modelMapperService
                        .forResponse().map(car, GetAllListCarResponse.class))
                .collect(Collectors.toList());
        return carResponses;
    }


    @Override
    public GetByIdCarResponse getById(int id) {
        Car car = carRepository.findById(id).orElseThrow();
        GetByIdCarResponse carResponses = this.modelMapperService.forResponse().map(car, GetByIdCarResponse.class);
        return carResponses;
    }


    @Override
    public void add(AddCarRequest addCarRequest, MultipartFile file) throws IOException {
        carBusinessRulesService.exceptionSamePlate(addCarRequest.getPlate());
        Car car = this.modelMapperService.forRequest().map(addCarRequest, Car.class);

        // UUID ataması yapılıyor
        String imageUrl = imageDataManager.uploadImage(file);
        ImageData imageData = new ImageData();
        imageData.setImageUrl(imageUrl);
        dataRepository.save(imageData);

        car.setImage(imageData);



        carRepository.save(car);
    }

    @Override
    public void delete(Integer id) {
        Car carToDelete = carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Araç bulunamadı, ID: " + id));

        carRepository.delete(carToDelete);
    }

    @Override
    public void update(UpdateCarRequest updateCarRequest) {
        Car carToUpdate = carRepository.findById(updateCarRequest.getId())
                .orElseThrow();

        this.modelMapperService.forRequest().map(updateCarRequest, carToUpdate);
        carRepository.saveAndFlush(carToUpdate);

    }


    @Override
    public List<GetAllListCarResponse> getAvailableCars(LocalDate startDate, LocalDate endDate, Integer locationId) {
        return carRepository.findAvailableCars(startDate, endDate, locationId);
    }

    @Override
    public List<GetAllListCarResponse> getCategorizeCars(Category category) {
        return carRepository.findByCategory(category);
    }

    @Override
    public List<GetAllListCarResponse> getAvailableCarsByCategory(LocalDate startDate, LocalDate endDate, Integer locationId, Category category, Double minPrice, Double maxPrice) {
        return carRepository.findAvailableCarsByCategory(startDate, endDate, locationId, category, minPrice, maxPrice);
    }

    @Override
    public GetByPlateResponse getPlate(String plate) {
        return carRepository.findPlate(plate);
    }

    @Override
    public void updateDiscount(CarDiscountRequest updateCarRequest, Integer carId) {
        Car carToUpdate = carRepository.findById(carId)
                .orElseThrow();
        this.modelMapperService.forRequest().map(updateCarRequest, carToUpdate);
        carRepository.saveAndFlush(carToUpdate);
    }

    @Override
    public List<GetAllListCarResponse> findDiscountedCars() {
        return carRepository.findwithDiscountCars();
    }

    @Override
    public Long getTotalCars() {
        return carRepository.countTotalCars();
    }
}
