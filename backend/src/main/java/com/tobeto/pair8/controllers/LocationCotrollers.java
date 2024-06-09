package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.LocationService;
import com.tobeto.pair8.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;
import com.tobeto.pair8.services.dtos.location.requests.AddLocation;
import com.tobeto.pair8.services.dtos.location.responses.GetAllLocation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/locations")
@AllArgsConstructor
public class LocationCotrollers {

    private LocationService locationService;

    @GetMapping
    public List<GetAllLocation>
    getAll() {
        return locationService.getAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddLocation addLocation){
        locationService.add(addLocation);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        locationService.delete(id);
    }
}
