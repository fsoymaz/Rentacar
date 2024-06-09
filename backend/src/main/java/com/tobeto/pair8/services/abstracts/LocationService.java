package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.location.requests.AddLocation;
import com.tobeto.pair8.services.dtos.location.responses.GetAllLocation;

import java.util.List;

public interface LocationService {

    void add(AddLocation addLocation);

    List<GetAllLocation> getAll();
    GetAllLocation getById(int id);

    void delete(Integer id);
}
