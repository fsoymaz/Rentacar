package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair8.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;

import java.util.List;

public interface BrandService {
    void add(AddBrandRequest addBrandRequest);
    void update(UpdateBrandRequest updateBrandRequest);

    void delete(Integer id);

    List<GetAllListBrandResponse>getAll();


    GetAllListBrandResponse getByName(String brandName);
}
