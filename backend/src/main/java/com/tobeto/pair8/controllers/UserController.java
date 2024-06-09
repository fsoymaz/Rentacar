package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.AutService;
import com.tobeto.pair8.services.abstracts.UserService;
import com.tobeto.pair8.services.dtos.creditCard.responses.GetByIdCreditCardResponse;
import com.tobeto.pair8.services.dtos.customer.request.UpdateRegisterCustomerAndUser;
import com.tobeto.pair8.services.dtos.user.requests.AddUserRequest;
import com.tobeto.pair8.services.dtos.user.responses.GetByIdUserResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetListUserResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final AutService autService;


    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddUserRequest addUserRequest){
        userService.add(addUserRequest);
    }




    @GetMapping("getAll")
    public List<GetListUserResponse> getAll()
    {
        return userService.getAll();
    }



    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        userService.delete(id);
    }
    @GetMapping("/getById")
    public GetByIdUserResponse getById(@RequestParam @Valid int id){
        return userService.getById(id);
    }

    @GetMapping("/getCreditCardById")
    public GetByIdCreditCardResponse getCreditCardById(@RequestParam @Valid int id){
        return userService.getCreditCardById(id);
    }


    @PutMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void registerCustomerAndUserUpdate(@RequestBody @Valid UpdateRegisterCustomerAndUser update){
        autService.registerCustomerAndUserUpdate(update);
    }
    @GetMapping("/userCount")
    public long getUserCount(){
        return userService.getUserCount();
    }

}
