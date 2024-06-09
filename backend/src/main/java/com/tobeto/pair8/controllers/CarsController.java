package com.tobeto.pair8.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tobeto.pair8.entities.concretes.Category;
import com.tobeto.pair8.services.abstracts.CarService;
import com.tobeto.pair8.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair8.services.dtos.car.requests.CarDiscountRequest;
import com.tobeto.pair8.services.dtos.car.requests.UpdateCarRequest;
import com.tobeto.pair8.services.dtos.car.responses.GetAllListCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair8.services.dtos.car.responses.GetByPlateResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/cars")
@AllArgsConstructor
public class CarsController {
    private CarService carService;

    @GetMapping
    public List<GetAllListCarResponse> getAll() {
        return carService.getAll();
    }

    @GetMapping("/{plate}")
    public GetByPlateResponse getCarByPlate(@PathVariable String plate) {
        return carService.getPlate(plate);
    }

    @GetMapping("/getById")
    public GetByIdCarResponse getById(@RequestParam @Valid int id) {
        return carService.getById(id);
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestParam("car") String carJson,
                    @RequestParam("file") MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        AddCarRequest addCarRequest = objectMapper.readValue(carJson, AddCarRequest.class);
        carService.add(addCarRequest, file);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        carService.delete(id);
    }


    @PutMapping
    public void update(@RequestBody @Valid UpdateCarRequest updateCarRequest) {
        carService.update(updateCarRequest);
    }


    @GetMapping("/available")
    public List<GetAllListCarResponse> getAvailableCars(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam Integer locationId) {
        return carService.getAvailableCars(startDate, endDate, locationId);
    }


    @GetMapping("/category")
    public List<GetAllListCarResponse> getCategorizeCars(@RequestParam Category category) {
        return carService.getCategorizeCars(category);
    }

    @GetMapping("/availableByCategory")
    public List<GetAllListCarResponse> getAvailableCarsByCategory(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam(required = false) Integer locationId,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        return carService.getAvailableCarsByCategory(startDate, endDate, locationId, category, minPrice, maxPrice);
    }

    @PutMapping("/discount")
    public void updateDiscount(@RequestBody @Valid CarDiscountRequest updateCarRequest, @RequestParam Integer carId) {
        carService.updateDiscount(updateCarRequest, carId);
    }

    @GetMapping("/discounted")
    public ResponseEntity<List<GetAllListCarResponse>> getDiscountedCars() {
        List<GetAllListCarResponse> discountedCars = carService.findDiscountedCars();
        return ResponseEntity.ok(discountedCars);
    }

    @GetMapping("/total")
    public Long getTotalCars() {
        return carService.getTotalCars();
    }

}

