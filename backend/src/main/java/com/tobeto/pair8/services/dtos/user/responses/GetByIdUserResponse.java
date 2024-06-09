package com.tobeto.pair8.services.dtos.user.responses;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdUserResponse {
        private String firstName;
        private String lastName;
        private LocalDate birthDate;
        private String email;
        private String username;
        private String CardId;

}
