package com.tobeto.pair8.services.dtos.user.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddCreditId {

    private int creditId;

    public AddCreditId(int creditId) {
        this.creditId = creditId;
    }
}


