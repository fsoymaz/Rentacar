package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="cars")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car extends BaseEntity {
    @Column(name="model_year")
    private short modelYear;

    @Column(name="plate")
    private String plate;

    @Column(name="min_findeks_rate")
    private short minFindeksRate;

    @Column(name="kilometer")
    private Long kilometer;

    @Column(name="daily_price")
    private Double dailyPrice;

    @Column (name = "discount")
    private Double discount;

    @ManyToOne()
    @JoinColumn(name="model_id")
    private Model model;

    @Column(name = "passenger_capacity")
    private short passengerCapacity;
    @Enumerated(EnumType.STRING)
    @Column(name="transmission_type")
    private TransmissionType transmissionType;

    @Enumerated(EnumType.STRING)
    @Column(name="fuel_type")
    private FuelType fuelType;

    @Enumerated(EnumType.STRING)
    @Column(name ="category")
    private Category category;

    @OneToMany(mappedBy = "car")
    private List<Rental> rentals;

    @ManyToOne
    @JoinColumn(name="color_id")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "location_id") // location_id, gerçek bir sütun adı olmalı
    private Location location;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private ImageData image;
}
