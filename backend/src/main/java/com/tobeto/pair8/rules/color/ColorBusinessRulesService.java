package com.tobeto.pair8.rules.color;

import com.tobeto.pair8.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair8.services.dtos.color.requests.UpdateColorRequest;

public interface ColorBusinessRulesService {

    void exceptionSameName(String color);

}
