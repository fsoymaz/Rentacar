package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Invoice;
import com.tobeto.pair8.entities.concretes.Rental;
import com.tobeto.pair8.repositories.RentalRepository;
import com.tobeto.pair8.rules.rental.RentalBusinessRulesService;
import com.tobeto.pair8.services.abstracts.*;
import com.tobeto.pair8.services.dtos.car.responses.GetByIdCarResponse;
import com.tobeto.pair8.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair8.services.dtos.rental.requests.AddRentalRequest;
import com.tobeto.pair8.services.dtos.rental.requests.UpdateRentalRequest;
import com.tobeto.pair8.services.dtos.rental.responses.GetByIdRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetDailyPriceResponse;
import com.tobeto.pair8.services.dtos.rental.responses.GetListRentalResponse;
import com.tobeto.pair8.services.dtos.rental.responses.RentalInfoResponse;
import com.tobeto.pair8.services.dtos.user.responses.GetByIdUserResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@Service
public class RentalManager implements RentalService {
    private final RentalRepository rentalRepository;
    private final ModelMapperService modelMapperService;
    private final CarService carService;
    private final RentalBusinessRulesService rentalBusinessRulesService;
    private final InvoiceService invoiceService;
    private final UserService userService;
    private final LocationService locationService;

    @Override
    public RentalInfoResponse add(AddRentalRequest addRentalRequest) {
        rentalBusinessRulesService.dateControl(addRentalRequest.getStartDate(), addRentalRequest.getEndDate());
        rentalBusinessRulesService.availableCar(addRentalRequest.getCarId(),addRentalRequest.getUserId(), addRentalRequest.getStartDate(), addRentalRequest.getEndDate());
        rentalBusinessRulesService.maxRentalDays(addRentalRequest.getStartDate(), addRentalRequest.getEndDate());
        rentalBusinessRulesService.maxRentalDaysForDiscountedCar(addRentalRequest.getCarId(), addRentalRequest.getStartDate(), addRentalRequest.getEndDate());
        GetByIdCarResponse carResponse = carService.getById(addRentalRequest.getCarId());
        Rental rental = this.modelMapperService.forRequest().map(addRentalRequest, Rental.class);
        rental.setTotalPrice(TotalPrice(addRentalRequest.getStartDate(), addRentalRequest.getEndDate(), carResponse.getDailyPrice(), carResponse.getDiscount()));
        rental.setStartKilometer(carResponse.getKilometer());
       Rental rental1 = rentalRepository.save(rental);
       Invoice invoice =invoiceService.add(new AddInvoiceRequest(rental1,rental1.getTotalPrice()));
       GetByIdUserResponse getByIdUserResponse = userService.getById(rental1.getUser().getId());
        return RentalInfoResponse.builder()
                .invoiceNo(invoice.getInvoiceNo())
                .totalPrice(invoice.getTotalPrice())
                .taxRate(invoice.getTaxRate())
                .plate(carResponse.getPlate())
                .dailyPrice(carResponse.getDailyPrice())
                .startDate(rental1.getStartDate())
                .endDate(rental1.getEndDate())
                .firstName(getByIdUserResponse.getFirstName())
                .lastName(getByIdUserResponse.getLastName())
                .email(getByIdUserResponse.getEmail())
                .build();
    }

    @Override
    public void update(UpdateRentalRequest updateRentalRequest) {
        rentalBusinessRulesService.dateControl(updateRentalRequest.getStartDate(), updateRentalRequest.getEndDate());
        rentalBusinessRulesService.availableCar(updateRentalRequest.getCarId(), updateRentalRequest.getUserId(), updateRentalRequest.getStartDate(), updateRentalRequest.getEndDate());
        rentalBusinessRulesService.maxRentalDays(updateRentalRequest.getStartDate(), updateRentalRequest.getEndDate());
        Rental rentalToUpdate = rentalRepository.findById(updateRentalRequest.getId())
                .orElseThrow();
        this.modelMapperService.forRequest().map(updateRentalRequest, rentalToUpdate);
        rentalRepository.saveAndFlush(rentalToUpdate);

    }

    @Override
    public void delete(Integer id) {
        Rental rentalToDelete = rentalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bulunamadı, ID:" + id));

        rentalRepository.delete(rentalToDelete);
    }


    @Override
    public List<GetListRentalResponse> getAll() {
        List<Rental> rentals = rentalRepository.findAll();
        List<GetListRentalResponse> rentalResponses = rentals.stream()
                .map(rental -> this.modelMapperService
                        .forResponse().map(rental, GetListRentalResponse.class))
                .collect(Collectors.toList());
        return rentalResponses;
    }

    @Override
    public List<GetListRentalResponse> getAllRental(String email) {
        List<Rental> rentals = rentalRepository.findAll();
        List<GetListRentalResponse> rentalResponses = rentals.stream()
                .map(rental -> this.modelMapperService
                        .forResponse().map(rental, GetListRentalResponse.class))
                .collect(Collectors.toList());
        return rentalResponses.stream().filter(getListRentalResponse -> getListRentalResponse.getUserResponse().getEmail().equals(email)).toList();
    }



    @Override
    public GetByIdRentalResponse getById ( int id){

        Rental rental = rentalRepository.findById(id).orElseThrow();
        GetByIdRentalResponse rentalResponses = this.modelMapperService.forResponse().map(rental, GetByIdRentalResponse.class);
        return rentalResponses;
    }

    @Override
    public Long countDailyRentedCars(LocalDate date) {
        return rentalRepository.countDailyRentedCars(date);
    }

    @Override
    public Double calculateMonthlyIncome(int month, int year) {
        return rentalRepository.findMonthlyIncome(month, year);
    }

    @Override
    public List<Object[]> calculateYearlyIncome(int year) {
        return rentalRepository.findYearlyIncome(year);
    }

    @Override
    public List<GetDailyPriceResponse> calculateDailySalesForLastWeek() {
        LocalDate now = LocalDate.now();
        LocalDate start = now.minusWeeks(1).with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        List<Object[]> results = rentalRepository.findSalesForPeriod(start, end);
        return results.stream()
                .map(result -> new GetDailyPriceResponse((LocalDate) result[0], (Double) result[1]))
                .collect(Collectors.toList());
    }

    @Override
    public List<GetDailyPriceResponse> calculateDailySalesForThisWeek() {
        LocalDate now = LocalDate.now();
        LocalDate start = now.with(DayOfWeek.MONDAY);
        LocalDate end = start.plusDays(6);
        List<Object[]> results = rentalRepository.findSalesForPeriod(start, end);
        return results.stream()
                .map(result -> new GetDailyPriceResponse((LocalDate) result[0], (Double) result[1]))
                .collect(Collectors.toList());
    }

    private double TotalPrice(LocalDate start, LocalDate end, double dailyPrice, double discount) {
        long daysBetween = start.until(end, ChronoUnit.DAYS);
        double totalPrice = daysBetween * dailyPrice;
        if (discount != 0) {
            totalPrice = totalPrice - (totalPrice * discount / 100);
        }
        return totalPrice;
    }
}
