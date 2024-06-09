package com.tobeto.pair8.rules.brand;

import com.tobeto.pair8.core.utilities.constants.BrandConstants;
import com.tobeto.pair8.core.utilities.exceptions.entityException.SameBrandException;
import com.tobeto.pair8.repositories.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import static com.tobeto.pair8.core.utilities.constants.BrandConstants.SAME_BRAND;


@Service
@AllArgsConstructor

public class BrandBusinessRulesManager implements BrandBusinessRulesService {
    private final BrandRepository brandRepository;

    @Override
    public void exceptionSameBrand(String name) {
        if (brandRepository.existsByName(name)) {
            throw new SameBrandException(SAME_BRAND + name);
        }
    }

}

