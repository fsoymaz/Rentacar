package com.tobeto.pair8.entities.abstracts;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.time.LocalDate;
import java.util.UUID;

@MappedSuperclass
@Data
public abstract class BaseEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="created_date", nullable = false)
    private LocalDate createdDate;

    @Column(name="updated_date",nullable = true)
    private LocalDate updatedDate;

    @PrePersist
    private void beforeAdd() {
        createdDate = LocalDate.now();
        setUuid(UUID.randomUUID());

    }

    @PreUpdate
    private void beforeUpdate() {
        updatedDate = LocalDate.now();
    }

    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @JdbcTypeCode(Types.VARCHAR)
    private UUID uuid;

    protected void setUuid(UUID uuid) {
        this.uuid = uuid;
    }
}
