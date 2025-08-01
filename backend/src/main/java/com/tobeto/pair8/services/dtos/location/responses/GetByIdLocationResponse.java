package com.tobeto.pair8.services.dtos.location.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdLocationResponse {
    private int id;
    private String city;
} 