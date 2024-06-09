package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.services.JwtService;
import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Customer;
import com.tobeto.pair8.entities.concretes.Role;
import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.repositories.CustomerRepository;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.rules.customer.CustomerBusinessRulesService;
import com.tobeto.pair8.rules.user.UserBusinessRulesService;
import com.tobeto.pair8.services.abstracts.AutService;
import com.tobeto.pair8.services.abstracts.CustomerService;
import com.tobeto.pair8.services.dtos.auth.responses.AuthResponse;
import com.tobeto.pair8.services.dtos.customer.request.AddRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.customer.request.UpdateCustomerRequest;
import com.tobeto.pair8.services.dtos.customer.request.UpdateRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.auth.requests.LoginRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class AuthManager implements AutService {

    private final AuthenticationManager authenticationManager;

    private CustomerService customerService;
    private final CustomerRepository customerRepository;
    private final ModelMapperService modelMapperService;
    private final CustomerBusinessRulesService customerBusinessRulesService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserBusinessRulesService userBusinessRulesService;
    private final JwtService jwtService;
    private final UserRepository userRepo;
    private final MailService mailService;
    @Override
    public Object login(LoginRequest loginRequest) {


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            var user =userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            String accessToken = jwtService.generateToken(loginRequest.getEmail(),user);
            AuthResponse authResponse = new AuthResponse();
            authResponse.setAccessToken("Bearer " + accessToken);
            return authResponse;
        }

        throw new RuntimeException("Kullanıcı adı ve şifre yanlış");
    }


    @Override
    public void registerCustomerAndUserAdd(AddRegisterCustomerAndUser addRegisterCustomerAndUser) {
        customerBusinessRulesService.sameNameAndSurname(addRegisterCustomerAndUser.getFirstName(),
                addRegisterCustomerAndUser.getLastName());

        customerBusinessRulesService.ageControl(addRegisterCustomerAndUser.getBirthDate());
        userBusinessRulesService.usernameCheck(addRegisterCustomerAndUser.getUsername());
        userBusinessRulesService.emailCheck(addRegisterCustomerAndUser.getEmail());
        userBusinessRulesService.truePassword(addRegisterCustomerAndUser.getPassword(),
                addRegisterCustomerAndUser.getConfirmPassword());

        Customer customer = this.modelMapperService.forRequest().map(addRegisterCustomerAndUser, Customer.class);

        User userAut = User.builder().username(addRegisterCustomerAndUser.getUsername())
                .email(addRegisterCustomerAndUser.getEmail())
                .authorities(Role.USER)
                .password(passwordEncoder.encode(addRegisterCustomerAndUser.getPassword()))
                .build();
        User userSaved = userRepository.save(userAut);
        customer.setUser(userSaved);
        customerRepository.save(customer);
        mailService.sendWelcomeEmail(userAut.getEmail());

    }


    @Override
    public void registerCustomerAndUserUpdate(UpdateRegisterCustomerAndUser updateRegisterCustomerAndUser) {
        User user = userRepository.findById(updateRegisterCustomerAndUser.getId()).orElseThrow();
        user.setUsername(updateRegisterCustomerAndUser.getUsername());
        user.setEmail(updateRegisterCustomerAndUser.getEmail());
        if (updateRegisterCustomerAndUser.getPassword()!=null) {
            user.setPassword(passwordEncoder.encode(updateRegisterCustomerAndUser.getPassword()));
        }
        Customer customer = customerService.getByUserId(updateRegisterCustomerAndUser.getId());

        UpdateCustomerRequest updateRequest = new UpdateCustomerRequest();
        updateRequest.setId(customer.getId());
        updateRequest.setFirstName(updateRegisterCustomerAndUser.getFirstName());
        updateRequest.setLastName(updateRegisterCustomerAndUser.getLastName());
        updateRequest.setBirthDate(updateRegisterCustomerAndUser.getBirthDate());

        updateRequest.setUserId(user.getId());
        customerService.update(updateRequest);
        userRepository.saveAndFlush(user);
        mailService.sendUpdateInfoEmail(user.getEmail());

    }
}