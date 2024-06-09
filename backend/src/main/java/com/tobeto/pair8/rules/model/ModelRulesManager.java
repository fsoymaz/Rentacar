package com.tobeto.pair8.rules.model;

import com.tobeto.pair8.core.utilities.exceptions.entityException.ModelAlreadyExistsException;
import com.tobeto.pair8.repositories.ModelRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.MOdelConstants.MODEL_ALREADY_EXISTS_MESSAGE;

@Service
@AllArgsConstructor
public class ModelRulesManager implements ModelRulesService{
    private final ModelRepository modelRepository;



    public void checkModel(String model) {

        if (modelRepository.existsByNameIgnoreCase(model)) {
            throw new ModelAlreadyExistsException(MODEL_ALREADY_EXISTS_MESSAGE + model);

        }
    }

}
