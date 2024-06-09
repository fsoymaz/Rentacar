package com.tobeto.pair8.rules.car;

import com.tobeto.pair8.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair8.services.dtos.car.requests.AddCarRequest;
import com.tobeto.pair8.services.dtos.car.requests.UpdateCarRequest;

public interface CarBusinessRulesService {
    void exceptionSamePlate(String plate);


}
