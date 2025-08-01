package com.tobeto.pair8.core.services;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.Collectors;

public abstract class BaseEntityService<T, R, ID> {
    
    protected final JpaRepository<T, ID> repository;
    protected final ModelMapperService modelMapperService;
    protected final Class<R> responseClass;
    
    protected BaseEntityService(JpaRepository<T, ID> repository, 
                              ModelMapperService modelMapperService,
                              Class<R> responseClass) {
        this.repository = repository;
        this.modelMapperService = modelMapperService;
        this.responseClass = responseClass;
    }
    
    public List<R> getAll() {
        List<T> entities = repository.findAll();
        return entities.stream()
                .map(entity -> modelMapperService.forResponse().map(entity, responseClass))
                .collect(Collectors.toList());
    }
    
    public R getById(ID id) {
        T entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName() + " bulunamadı, ID: " + id));
        return modelMapperService.forResponse().map(entity, responseClass);
    }
    
    public void delete(ID id) {
        T entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName() + " bulunamadı, ID: " + id));
        repository.delete(entity);
    }
    
    protected abstract String getEntityName();
} 