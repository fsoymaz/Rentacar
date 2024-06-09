package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Model;
import com.tobeto.pair8.repositories.ModelRepository;
import com.tobeto.pair8.rules.model.ModelRulesService;
import com.tobeto.pair8.services.abstracts.BrandService;
import com.tobeto.pair8.services.abstracts.ModelService;
import com.tobeto.pair8.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair8.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import com.tobeto.pair8.services.dtos.model.responses.GetByIdModelResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Service
public class ModelManager implements ModelService {
    private ModelRepository modelRepository;
    private final ModelMapperService modelMapperService;
    private final ModelRulesService modelRulesService;
    private final BrandService brandService;

    @Override
    public void add(AddModelRequest addModelRequest) {

        modelRulesService.checkModel(addModelRequest.getName());

        Model model = this.modelMapperService.forRequest().map(addModelRequest, Model.class);
        model.setId(0);
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {
        Model modelToUpdate = modelRepository.findById(updateModelRequest.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(updateModelRequest,modelToUpdate);

        modelRepository.saveAndFlush(modelToUpdate);
    }

    @Override
    public void delete(Integer id) {
        Model modelToDelete = modelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Model Bulunamad, ID:" + id));
        modelRepository.delete(modelToDelete);

    }

    @Override
    public List<GetAllListModelRespose> getAll() {
        List<Model> models = modelRepository.findAll();
        List<GetAllListModelRespose> modelResposes = models.stream()
                .map(model -> this.modelMapperService
                        .forResponse().map(model, GetAllListModelRespose.class))
                .collect(Collectors.toList());
        return modelResposes;
    }

    @Override
    public GetByIdModelResponse getById(int id) {
        Model model = modelRepository.findById(id).orElseThrow();
        GetByIdModelResponse modelResponses = this.modelMapperService.forResponse().map(model, GetByIdModelResponse.class);
        return modelResponses;
    }

}
