package com.tobeto.pair8.rules.car;

import com.tobeto.pair8.core.utilities.exceptions.entityException.SamePlateException;
import com.tobeto.pair8.repositories.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.CarConstants.SAME_PLATE;

@Service
@AllArgsConstructor

public class CarBusinessRulesMenager implements CarBusinessRulesService {

private final CarRepository carRepository;
    @Override
    public void exceptionSamePlate(String plate) {
        if (carRepository.existsByPlate(plate)) {
            throw new SamePlateException(SAME_PLATE + plate);
        }
    }


}
