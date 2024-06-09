package com.tobeto.pair8.services.dtos.user.responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetListUserResponse {
    private String email;
    private int creditId;
}
