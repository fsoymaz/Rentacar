package com.tobeto.pair8.services.dtos.customer.request;


import com.tobeto.pair8.entities.concretes.Role;
import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair8.services.dtos.user.requests.UpdateUserRequest;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRegisterCustomerAndUser {
    @Min(value = 1, message = "Geçerli bir müşteri ID'si giriniz")
    private int id;

    @NotBlank(message = "Ad boş olamaz")
    @Size(min = 1, max = 50, message = "Ad en az 1, en fazla 50 karakter olmalıdır")
    private String firstName;

    @NotBlank(message = "Soyad boş olamaz")
    @Size(min = 1, max = 50, message = "Soyad en az 1, en fazla 50 karakter olmalıdır")
    private String lastName;

    @NotNull(message = "Doğum tarihi boş olamaz")
    private LocalDate birthDate;

    @Email(message = "Geçersiz e-posta adresi formatı")
    @NotBlank(message = "E-posta boş olamaz")
    private String email;


    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.@#$%^&+=!])(?=\\S+$).{8,}$",
            message = "Şifre güçlü olmalıdır: en az bir rakam, bir büyük harf, bir küçük harf, bir özel karakter içermeli ve boşluk içermemelidir."
    )
    private String password;

    @NotNull(message = "Kullanıcı adı boş olamaz!!!!")
    private String username;

    @Transient
    private String confirmPassword;
}


