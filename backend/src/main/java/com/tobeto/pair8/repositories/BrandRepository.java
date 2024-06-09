package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    boolean existsByName(String name);
    Object findByName(String brandName);
}
