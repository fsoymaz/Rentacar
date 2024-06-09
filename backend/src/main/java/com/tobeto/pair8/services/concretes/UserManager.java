package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Customer;
import com.tobeto.pair8.entities.concretes.User;
import com.tobeto.pair8.repositories.UserRepository;
import com.tobeto.pair8.rules.user.UserBusinessRulesService;
import com.tobeto.pair8.services.abstracts.CreditCardService;
import com.tobeto.pair8.services.abstracts.CustomerService;
import com.tobeto.pair8.services.abstracts.UserService;
import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;
import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair8.services.dtos.user.requests.UpdateUserRequest;
import com.tobeto.pair8.services.dtos.user.responses.GetByIdUserResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class UserManager implements UserService {
    private final ModelMapperService modelMapperService;
    private final UserRepository userRepository;
    private final UserBusinessRulesService userBusinessRulesService;
    private final PasswordEncoder passwordEncoder;
    private final CustomerService customerService;

    private final CreditCardService creditCardService;

    public UserManager(ModelMapperService modelMapperService,
                       UserRepository userRepository, UserBusinessRulesService userBusinessRulesService,
                       PasswordEncoder passwordEncoder, CustomerService customerService,
                       @Lazy CreditCardService creditCardService) {
        this.modelMapperService = modelMapperService;
        this.userRepository = userRepository;
        this.userBusinessRulesService = userBusinessRulesService;
        this.passwordEncoder = passwordEncoder;
        this.customerService = customerService;
        this.creditCardService = creditCardService;
    }

    @Override
    public void add(AddUserRequest addUserRequest) {
        User userAut;

        userBusinessRulesService.emailCheck(addUserRequest.getEmail());
        userBusinessRulesService.truePassword(addUserRequest.getPassword(),
                addUserRequest.getConfirmPassword());

        userAut = User.builder().username(addUserRequest.getUsername())
                .email(addUserRequest.getEmail())
                .authorities(addUserRequest.getRoles())
                .password(passwordEncoder.encode(addUserRequest.getPassword()))
                .build();
        userRepository.save(userAut);

    }

    @Override
    public void update(UpdateUserRequest updateUserRequest) {
        //userBusinessRulesService.emailCheck(updateUserRequest.getEmail());
        //userBusinessRulesService.truePassword(updateUserRequest.getPassword(),
        //updateUserRequest.getConfirmPassword());
        User userUpdate = userRepository.findById(updateUserRequest.getId()).orElseThrow();
        userUpdate.setUsername(updateUserRequest.getUsername());
        userUpdate.setAuthorities(updateUserRequest.getRoles());
        userUpdate.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
        userRepository.saveAndFlush(userUpdate);
    }

    @Override
    public void updateV2(UpdateUserRequest updateUserRequest) {
        //userBusinessRulesService.emailCheck(updateUserRequest.getEmail());
        //userBusinessRulesService.truePassword(updateUserRequest.getPassword(),
        //updateUserRequest.getConfirmPassword());
        User userUpdate = userRepository.findById(updateUserRequest.getId()).orElseThrow();
        userUpdate.setCredit(updateUserRequest.getCreditCard());
        userRepository.saveAndFlush(userUpdate);
    }



    @Override
    public void delete(Integer id) {
        User userDelete = userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Kullanıcı bulunamadı"));
        userRepository.delete(userDelete);

    }


    @Override
    public List<GetListUserResponse> getAll() {
        List<User> users = userRepository.findAll();
        List<GetListUserResponse> userResponses = users.stream()
                .map(user -> this.modelMapperService.forResponse()
                        .map(user, GetListUserResponse.class))
                .collect(Collectors.toList());
        return userResponses;
    }




    @Override
    public GetByIdUserResponse getById(int id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("No user found!!!!"));
        Customer customer = customerService.getByUserId(user.getId());
        GetByIdUserResponse getByIdUserResponse = GetByIdUserResponse.builder().firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .birthDate(customer.getBirthDate())
                .email(user.getEmail())
                .username(user.getUsername()).build();

        return getByIdUserResponse;
    }

    @Override
    public GetByIdCreditCardResponse getCreditCardById(int id) {
      return creditCardService.getCreditCardById(id);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("No user found!"));
    }

    @Override
    public long getUserCount() {
        return userRepository.count();
    }
}