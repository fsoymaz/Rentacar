package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair8.services.dtos.car.requests.CarDiscountRequest;
import com.tobeto.pair8.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByPlateResponse;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface    CarService {


    void add(AddCarRequest addCarRequest, MultipartFile file) throws IOException;

    void delete(Integer id);

    void update(UpdateCarRequest updateCarRequest);

    List<GetAllListCarResponse> getAll();

    GetByIdCarResponse getById(int id);




    List<GetAllListCarResponse> getAvailableCars(LocalDate startDate, LocalDate endDate, Integer locationId);

    List<GetAllListCarResponse> getCategorizeCars(Category category);


    List<GetAllListCarResponse> getAvailableCarsByCategory(LocalDate startDate,
                                                           LocalDate endDate, Integer locationId, Category category,
                                                            Double minPrice, Double maxPrice);

    GetByPlateResponse getPlate(String plate);


    void updateDiscount(CarDiscountRequest updateCarRequest, Integer carId);

    List<GetAllListCarResponse> findDiscountedCars();

    Long getTotalCars();
}
