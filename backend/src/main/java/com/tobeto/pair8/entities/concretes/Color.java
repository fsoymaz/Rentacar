package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="colors")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Color extends BaseEntity {
    @Column(name="name")
    private String name;
    @Column(name="code")
    private String code;

    @OneToMany(mappedBy = "color")
    private List<Car> cars;

}
