package com.tobeto.pair8.services.abstracts;

import com.tobeto.pair8.entities.concretes.Invoice;
import com.tobeto.pair8.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair8.services.dtos.invoice.requests.UpdateInvoiceRequest;
import com.tobeto.pair8.services.dtos.invoice.responses.GetByIdInvoiceResponse;
import com.tobeto.pair8.services.dtos.invoice.responses.GetListInvoceResponse;

import java.util.List;

public interface InvoiceService {
    Invoice add(AddInvoiceRequest addInvoiceRequest);

    void update(UpdateInvoiceRequest updateInvoiceRequest);

    void delete (Integer id);

    List<GetListInvoceResponse> getAll();

    GetByIdInvoiceResponse getById(int id);
}
