package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair8.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair8.services.dtos.rental.responses.GetByIdRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetDailyPriceResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetListRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.RentalInfoResponse;

import java.time.LocalDate;
import java.util.List;

public interface RentalService {

    RentalInfoResponse add(AddRentalRequest addRentalRequest);

    void update(UpdateRentalRequest updateRentalRequest);

    void delete(Integer deleteRentalRequest);


    List<GetListRentalResponse> getAll();

    List<GetListRentalResponse> getAllRental(String email);


    GetByIdRentalResponse getById(int id);


    Long countDailyRentedCars(LocalDate date);

    Double calculateMonthlyIncome(int month, int year);

    List<Object[]> calculateYearlyIncome(int year);


    List<GetDailyPriceResponse> calculateDailySalesForLastWeek();

    List<GetDailyPriceResponse> calculateDailySalesForThisWeek();
}
