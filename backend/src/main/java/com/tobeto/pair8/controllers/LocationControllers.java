package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.LocationService;
import com.tobeto.pair8.services.dtos.location.requests.AddLocationRequest;
import com.tobeto.pair8.services.dtos.location.requests.UpdateLocationRequest;
import com.tobeto.pair8.services.dtos.location.responses.GetAllListLocationResponse;
import com.tobeto.pair8.services.dtos.location.responses.GetByIdLocationResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locations")
@AllArgsConstructor
public class LocationControllers {
    private final LocationService locationService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddLocationRequest addLocationRequest) {
        locationService.add(addLocationRequest);
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateLocationRequest updateLocationRequest) {
        locationService.update(updateLocationRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        locationService.delete(id);
    }

    @GetMapping
    public List<GetAllListLocationResponse> getAll() {
        return locationService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdLocationResponse getById(@RequestParam @Valid int id) {
        return locationService.getById(id);
    }
} 