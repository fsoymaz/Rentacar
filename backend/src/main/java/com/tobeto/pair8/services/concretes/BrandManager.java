package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Brand;
import com.tobeto.pair8.repositories.BrandRepository;
import com.tobeto.pair8.rules.brand.BrandBusinessRulesService;
import com.tobeto.pair8.services.abstracts.BrandService;
import com.tobeto.pair8.services.dtos.brand.requests.AddBrandRequest;
import com.tobeto.pair8.services.dtos.brand.requests.UpdateBrandRequest;
import com.tobeto.pair8.services.dtos.brand.responses.GetAllListBrandResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BrandManager implements BrandService {
    private final BrandRepository brandRepository;
    private ModelMapperService modelMapperService;
    private final BrandBusinessRulesService brandBusinessRulesService;

    @Override
    public void add(AddBrandRequest addBrandRequest) {
        brandBusinessRulesService.exceptionSameBrand(addBrandRequest.getName());
        Brand brand = this.modelMapperService.forRequest().map(addBrandRequest, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void update(UpdateBrandRequest updateBrandRequest) {
        brandBusinessRulesService.exceptionSameBrand(updateBrandRequest.getName());
        Brand brandToUpdate = brandRepository.findById(updateBrandRequest.getId())
                .orElseThrow(() -> new EntityNotFoundException("Araç id bulunamadı : ID" + updateBrandRequest));

        this.modelMapperService.forRequest().map(updateBrandRequest, brandToUpdate);

        brandRepository.saveAndFlush(brandToUpdate);
    }

    @Override
    public void delete(Integer id) {
        Brand BrandToDelete = brandRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Brand bulunamadı, ID: " + id));

        brandRepository.delete(BrandToDelete);
    }


    @Override
    public List<GetAllListBrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        List<GetAllListBrandResponse> brandResponses = brands.stream()
                .map(brand -> this.modelMapperService
                        .forResponse().map(brand, GetAllListBrandResponse.class))
                .collect(Collectors.toList());
        return brandResponses;
    }

    @Override
    public GetAllListBrandResponse getByName(String brandName) {
        return brandRepository.existsByName(brandName) ? this.modelMapperService
                .forResponse().map(brandRepository.findByName(brandName), GetAllListBrandResponse.class) : null;
    }
}
