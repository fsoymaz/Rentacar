package com.tobeto.pair8.core.configuratios;

import com.tobeto.pair8.core.filter.JwtAuthFilter;
import com.tobeto.pair8.entities.concretes.Role;
import com.tobeto.pair8.services.abstracts.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
public class SecurityConfiguration {

    private final PasswordEncoder passwordEncoder;
    private final JwtAuthFilter jwtAuthFilter;

    private final UserDetailsService userService;

    private static final String[] WHITE_LIST_URLS = {
            "/swagger-ui/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/api/customers/**",
            "/api/rentals/**",
            "/api/models/**",
            "/api/auths/**",
            "api/brands/**",
            "/api/cars/**",
            "/api/colors/**",
            "api/users/**",
            "api/imagedata/**",
            "api/test/**",
            "/api/invoices/**",
            "/api/locations/**",
            "/api/creditsCard/**",
            "/reset-password/**",
            "/forgot-password/**",
    };


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.disable())
                .authorizeHttpRequests(auth -> auth

                        // .requestMatchers().hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers("swagger-ui/**").permitAll()

                        //.requestMatchers(HttpMethod.POST,"/api/colors/**").hasAnyAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/colors").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/cars").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/brands").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/models").hasAuthority(Role.ADMIN.name())
                        .requestMatchers(HttpMethod.POST, "/api/locations").hasAuthority(Role.ADMIN.name())


                        .requestMatchers(WHITE_LIST_URLS).permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        authenticationProvider.setUserDetailsService(userService);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }


}