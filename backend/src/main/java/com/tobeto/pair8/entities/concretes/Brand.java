package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="brands")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Brand extends BaseEntity {
    @Column(name="name")
    private String name;

}
