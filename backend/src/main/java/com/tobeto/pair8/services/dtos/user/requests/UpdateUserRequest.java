package com.tobeto.pair8.services.dtos.user.requests;

import com.tobeto.pair8.entities.concretes.CreditCard;
import com.tobeto.pair8.entities.concretes.Role;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequest {
@NotNull(message = "Id boş olamaz")
    private int id;

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

    private CreditCard creditCard;

    public UpdateUserRequest(int id, CreditCard creditCard) {
        this.id = id;
        this.creditCard = creditCard;
    }

    public UpdateUserRequest(int id, String email, String password, String username, Role roles, String confirmPassword) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.roles = roles;
        this.confirmPassword = confirmPassword;
    }
}

