package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Invoice extends BaseEntity {
    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "tax_rate")
    private Float taxRate;

    @Column(name = "total_price")
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "rental_id")
    private Rental rental;
}