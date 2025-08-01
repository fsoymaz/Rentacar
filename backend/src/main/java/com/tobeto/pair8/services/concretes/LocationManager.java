package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Location;
import com.tobeto.pair8.repositories.LocationRepository;
import com.tobeto.pair8.services.abstracts.LocationService;
import com.tobeto.pair8.services.dtos.location.requests.AddLocationRequest;
import com.tobeto.pair8.services.dtos.location.requests.UpdateLocationRequest;
import com.tobeto.pair8.services.dtos.location.responses.GetAllListLocationResponse;
import com.tobeto.pair8.services.dtos.location.responses.GetByIdLocationResponse;
import jakarta.persistence.EntityNotFoundException;
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
    public void add(AddLocationRequest addLocationRequest) {
        Location location = this.modelMapperService.forRequest().map(addLocationRequest, Location.class);
        locationRepository.save(location);
    }

    @Override
    public void update(UpdateLocationRequest updateLocationRequest) {
        Location locationToUpdate = locationRepository.findById(updateLocationRequest.getId())
                .orElseThrow(() -> new EntityNotFoundException("Location bulunamadı, ID: " + updateLocationRequest.getId()));
        this.modelMapperService.forRequest().map(updateLocationRequest, locationToUpdate);
        locationRepository.saveAndFlush(locationToUpdate);
    }

    @Override
    public List<GetAllListLocationResponse> getAll() {
        List<Location> locations = locationRepository.findAll();
        List<GetAllListLocationResponse> locationResponses = locations.stream()
                .map(location -> this.modelMapperService
                        .forResponse().map(location, GetAllListLocationResponse.class))
                .collect(Collectors.toList());
        return locationResponses;
    }

    @Override
    public GetByIdLocationResponse getById(int id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location bulunamadı, ID: " + id));
        GetByIdLocationResponse locationResponse = this.modelMapperService.forResponse().map(location, GetByIdLocationResponse.class);
        return locationResponse;
    }

    @Override
    public void delete(Integer id) {
        Location locationToDelete = locationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location bulunamadı, ID: " + id));
        locationRepository.delete(locationToDelete);
    }
}
