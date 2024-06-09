package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.ColorService;
import com.tobeto.pair8.services.dtos.color.requests.AddColorRequest;
import com.tobeto.pair8.services.dtos.color.requests.UpdateColorRequest;
import com.tobeto.pair8.services.dtos.color.responses.GetAllListColorResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/colors")
@AllArgsConstructor
public class ColorController {
    private ColorService colorService;
    @GetMapping
    public List<GetAllListColorResponse> getAll()
    {
        return colorService.getAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public void add(@RequestBody @Valid AddColorRequest addColorRequest)
    {
        colorService.add(addColorRequest);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        colorService.delete(id);
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateColorRequest updateColorRequest){
        colorService.update(updateColorRequest);
    }


}
