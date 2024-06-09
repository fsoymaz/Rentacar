package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.BrandService;
import com.tobeto.pair8.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair8.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/brands")
@AllArgsConstructor
public class BrandsController {
    private BrandService brandService;

    @GetMapping
    public List<GetAllListBrandResponse> getAll() {
        return brandService.getAll();
    }

    @GetMapping("/{brandName}")
    public GetAllListBrandResponse getByName(@PathVariable String brandName) {
        return brandService.getByName(brandName);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddBrandRequest addBrandRequest) {
        brandService.add(addBrandRequest);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        brandService.delete(id);
    }


    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateBrandRequest updateBrandRequest) {
        brandService.update(updateBrandRequest);
    }

}
