package com.tobeto.pair8.entities.concretes;

import com.tobeto.pair8.entities.abstracts.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Table(name = "users")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends BaseEntity implements UserDetails {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role authorities;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="credit_id")
    private CreditCard credit;
    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    public List<CreditCard> getAllCreditCards() {
        return this.credit != null ? List.of(this.credit) : Collections.emptyList();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.authorities.name()));
    }
    public String getAuth(){
        return authorities.name();

    }

    public String getUsername() {
        return email;
    }

    public String getName()
    {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void setResetPasswordToken(String token) {
        this.resetPasswordToken = token;
    }
}


