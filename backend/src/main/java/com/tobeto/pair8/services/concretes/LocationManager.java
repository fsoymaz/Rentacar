package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Location;
import com.tobeto.pair8.entities.concretes.Model;
import com.tobeto.pair8.repositories.LocationRepository;
import com.tobeto.pair8.services.abstracts.LocationService;
import com.tobeto.pair8.services.dtos.location.requests.AddLocation;
import com.tobeto.pair8.services.dtos.location.responses.GetAllLocation;
import com.tobeto.pair8.services.dtos.model.responses.GetAllListModelRespose;
import com.tobeto.pair8.services.dtos.model.responses.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LocationManager implements LocationService {

    private final ModelMapperService modelMapperService;
    private final LocationRepository locationRepository;

    @Override
    public void add(AddLocation addLocation) {
        Location location = this.modelMapperService.forRequest().map(addLocation, Location.class);
        locationRepository.save(location);
    }

    @Override
    public List<GetAllLocation> getAll() {
        List<Location> locations = locationRepository.findAll();
        List<GetAllLocation> locationResponses = locations.stream()
                .map(location -> this.modelMapperService
                        .forResponse().map(location, GetAllLocation.class))
                .collect(Collectors.toList());
        return locationResponses;
    }

    @Override
    public GetAllLocation getById(int id) {
        Location location = locationRepository.findById(id).orElseThrow();
        GetAllLocation locationResponse = this.modelMapperService.forResponse().map(location, GetAllLocation.class);
        return locationResponse;
    }

    @Override
    public void delete(Integer id) {
        Location locationToDelete = locationRepository.findById(id).orElseThrow();
        locationRepository.delete(locationToDelete);
    }
}
