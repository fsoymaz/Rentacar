package com.tobeto.pair8.controllers;

import com.tobeto.pair8.services.abstracts.RentalService;
import com.tobeto.pair8.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair8.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair8.services.dtos.rental.responses.GetByIdRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetDailyPriceResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetListRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.RentalInfoResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/rentals")
@AllArgsConstructor
public class RentalsController {
    private final RentalService rentalService;

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public RentalInfoResponse add(@RequestBody @Valid AddRentalRequest addRentalRequest){
       return  rentalService.add(addRentalRequest);
    }

    @PutMapping
    @ResponseStatus(code = HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateRentalRequest updateRentalRequest){
        rentalService.update(updateRentalRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        rentalService.delete(id);
    }

    @GetMapping
    public List<GetListRentalResponse> getAll() {
        return rentalService.getAll();}

    @GetMapping("/getById")
    public GetByIdRentalResponse getById(@RequestParam @Valid int id){
        return rentalService.getById(id);
    }

    @GetMapping("/getAllRental")
    public List<GetListRentalResponse>  getAllRental(@RequestParam @Valid String email){
        return rentalService.getAllRental(email);
    }

    @GetMapping("/daily")
    public Long countDailyRentedCars(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return rentalService.countDailyRentedCars(date);
    }

    @GetMapping("/incomeMonthly")
    public Double getMonthlyIncome(@RequestParam int month, @RequestParam int year) {
        return rentalService.calculateMonthlyIncome(month, year);
    }

    @GetMapping("/incomeYearly")
    public List<Object[]> getYearlyIncome(@RequestParam int year) {
        return rentalService.calculateYearlyIncome(year);
    }


    @GetMapping("/sales/lastWeek")
    public List<GetDailyPriceResponse> getSalesForLastWeek() {
        return rentalService.calculateDailySalesForLastWeek();
    }

    @GetMapping("/sales/thisWeek")
    public List<GetDailyPriceResponse> getSalesForThisWeek() {
        return rentalService.calculateDailySalesForThisWeek();
    }
}
