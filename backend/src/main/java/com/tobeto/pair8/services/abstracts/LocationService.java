package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.location.requests.AddLocationRequest;
import com.tobeto.pair8.services.dtos.location.requests.UpdateLocationRequest;
import com.tobeto.pair8.services.dtos.location.responses.GetAllListLocationResponse;
import com.tobeto.pair8.services.dtos.location.responses.GetByIdLocationResponse;

import java.util.List;

public interface LocationService {

    void add(AddLocationRequest addLocationRequest);
    void update(UpdateLocationRequest updateLocationRequest);

    List<GetAllListLocationResponse> getAll();
    GetByIdLocationResponse getById(int id);

    void delete(Integer id);
}
