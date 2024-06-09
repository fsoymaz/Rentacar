package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair8.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import com.tobeto.pair8.services.dtos.model.responses.GetByIdModelResponse;

import java.util.List;

public interface ModelService {
    void add(AddModelRequest addModelRequest);
    void update(UpdateModelRequest updateModelRequest);
    void delete(Integer deleteModelRequest);

    List<GetAllListModelRespose> getAll();

    GetByIdModelResponse getById(int id);
}
