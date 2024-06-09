package com.tobeto.pair8.repositories;

import com.tobeto.pair8.entities.concretes.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Integer>
{
}
