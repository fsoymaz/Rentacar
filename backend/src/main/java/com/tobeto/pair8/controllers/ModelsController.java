package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.ModelService;
import com.tobeto.pair8.services.dtos.model.requests.AddModelRequest;
import com.tobeto.pair8.services.dtos.model.requests.UpdateModelRequest;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import com.tobeto.pair8.services.dtos.model.responses.GetByIdModelResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/models")
@AllArgsConstructor
public class ModelsController {
    private final ModelService modelService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddModelRequest addModelRequest){
        modelService.add(addModelRequest);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateModelRequest updateModelRequest) { modelService.update(updateModelRequest);}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        modelService.delete(id);
    }
    @GetMapping
    public List<GetAllListModelRespose> getAll() {
        return modelService.getAll();
    }

    @GetMapping("/getById")
    public GetByIdModelResponse getById(@RequestParam @Valid int id){
        return modelService.getById(id);
    }
}
