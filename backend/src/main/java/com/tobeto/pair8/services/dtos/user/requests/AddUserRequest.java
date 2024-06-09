package com.tobeto.pair8.services.dtos.user.requests;

import com.tobeto.pair8.entities.concretes.Role;
import com.tobeto.pair8.entities.concretes.User;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddUserRequest {

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
    @NotNull()
    private Role roles;

    @Transient
    private String confirmPassword;

}