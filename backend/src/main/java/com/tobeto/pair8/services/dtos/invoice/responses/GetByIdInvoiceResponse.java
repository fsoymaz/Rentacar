package com.tobeto.pair8.services.dtos.invoice.responses;

import com.tobeto.pair8.services.dtos.rental.responses.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GetByIdInvoiceResponse {
    private int id;
    private String invoiceNo;
    private Double totalPrice;
    private Float discountRate;
    private Float taxRate;


    private GetByIdRentalResponse rentalId;

}
