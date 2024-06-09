package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageDataRepository extends JpaRepository<ImageData, Integer> {

}
