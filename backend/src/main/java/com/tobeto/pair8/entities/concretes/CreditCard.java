package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="credit_card")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditCard extends BaseEntity {

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "validity_date")
    private String validityDate;

    @Column(name = "card_name")
    private String cardName;

    @Column(name = "card_cvc")
    private String cardCvc;

    @OneToMany(mappedBy = "credit")
    private List<User> users;





}
