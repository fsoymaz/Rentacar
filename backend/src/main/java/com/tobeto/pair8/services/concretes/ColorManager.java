package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Color;
import com.tobeto.pair8.repositories.ColorRepository;
import com.tobeto.pair8.rules.color.ColorBusinessRulesService;
import com.tobeto.pair8.services.abstracts.ColorService;
import com.tobeto.pair8.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair8.services.dtos.color.requests.UpdateColorRequest;
import com.tobeto.pair8.services.dtos.color.responses.GetAllListColorResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ColorManager implements ColorService {
    private final ColorRepository colorRepository;
    private final ModelMapperService modelMapperService;
    private final ColorBusinessRulesService colorBusinessRulesService;

    @Override
    public void add(AddColorRequest addColorRequest) {
        colorBusinessRulesService.exceptionSameName(addColorRequest.getName());
        Color color = this.modelMapperService.forRequest().map(addColorRequest, Color.class);
        colorRepository.save(color);
    }

    @Override
    public void update(UpdateColorRequest updateColorRequest) {
        colorBusinessRulesService.exceptionSameName(updateColorRequest.getName());
        Color colorToUpate = colorRepository.findById(updateColorRequest.getId()).orElseThrow();
        this.modelMapperService.forRequest().map(updateColorRequest, colorToUpate);
        colorRepository.saveAndFlush(colorToUpate);

    }

    @Override
    public void delete(Integer id) {
        Color colorToDelete = colorRepository.findById(id).orElseThrow();
        colorRepository.delete(colorToDelete);


    }

    @Override
    public List<GetAllListColorResponse> getAll() {
        List<Color> colors = colorRepository.findAll();
        List<GetAllListColorResponse> colorResponses = colors.stream()
                .map(color -> this.modelMapperService.forResponse().map(color, GetAllListColorResponse.class))
                .collect(Collectors.toList());

        return colorResponses;
    }


}
