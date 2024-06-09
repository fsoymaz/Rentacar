package com.tobeto.pair8.rules.color;

import com.tobeto.pair8.core.utilities.exceptions.entityException.SameColorNameException;
import com.tobeto.pair8.repositories.ColorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.ColorConstants.SAME_COLOR;

@Service
@AllArgsConstructor
public class ColorBusinessRulesMenager implements ColorBusinessRulesService {
private final ColorRepository colorRepository;


    @Override
    public void exceptionSameName(String color) {
        if (colorRepository.existsByName(color)){
            throw new SameColorNameException(SAME_COLOR + color);
        }
    }
}
