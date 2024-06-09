package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, Integer> {
    boolean existsByNameIgnoreCase(String model);
    // büyük harf küçük harf duyarlılığı olmadan model adı ile eşleşen bir kayıt var mı?
}
