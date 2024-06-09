package com.tobeto.pair8.entities.concretes;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "images")
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ImageData {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "image_Url", length = 1000)
    private String imageUrl;

    @OneToOne(mappedBy = "image")
    private Car car;

}

