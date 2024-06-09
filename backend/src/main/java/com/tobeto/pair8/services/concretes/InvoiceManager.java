package com.tobeto.pair8.services.concretes;

import com.tobeto.pair8.core.utilities.mappers.services.ModelMapperService;
import com.tobeto.pair8.entities.concretes.Invoice;
import com.tobeto.pair8.repositories.InvoiceRepository;
import com.tobeto.pair8.services.abstracts.InvoiceService;
import com.tobeto.pair8.services.dtos.invoice.requests.AddInvoiceRequest;
import com.tobeto.pair8.services.dtos.invoice.requests.UpdateInvoiceRequest;
import com.tobeto.pair8.services.dtos.invoice.responses.GetByIdInvoiceResponse;
import com.tobeto.pair8.services.dtos.invoice.responses.GetListInvoceResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InvoiceManager implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private ModelMapperService modelMapperService;


    @Override
    public Invoice add(AddInvoiceRequest addInvoiceRequest){
        String randomInvoiceNumber = generateRandomInvoiceNumber();
        addInvoiceRequest.setInvoiceNo(randomInvoiceNumber);

        Invoice invoice = new Invoice();
        invoice.setInvoiceNo(addInvoiceRequest.getInvoiceNo());
        invoice.setRental(addInvoiceRequest.getRental());
        invoice.setTaxRate(Float.valueOf(18));
        invoice.setTotalPrice(addInvoiceRequest.getTotalPrice());
           return invoiceRepository.save(invoice);
    }


    @Override
    public void update(UpdateInvoiceRequest updateInvoiceRequest) {
        Invoice invoiceToUpdate = invoiceRepository.findById(updateInvoiceRequest.getId())
                .orElseThrow(() -> new EntityNotFoundException("Fatura Id'si bulunamadı : ID" + updateInvoiceRequest));

        this.modelMapperService.forRequest().map(updateInvoiceRequest, invoiceToUpdate);

        invoiceRepository.saveAndFlush(invoiceToUpdate);
    }

    @Override
    public void delete(Integer id){
        Invoice invoiceToDelete = invoiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fatura bulunamadı, ID" + id));

        invoiceRepository.delete(invoiceToDelete);


    }

    @Override
    public List<GetListInvoceResponse> getAll() {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<GetListInvoceResponse> invoceResponses = invoices.stream()
                .map(invoice -> this.modelMapperService
                        .forResponse().map(invoice, GetListInvoceResponse.class))
                .collect(Collectors.toList());
        return invoceResponses;
    }

    @Override
    public GetByIdInvoiceResponse getById(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        GetByIdInvoiceResponse invoiceResponses = this.modelMapperService.forResponse().map(invoice, GetByIdInvoiceResponse.class);

        return invoiceResponses;

    }
    private String generateRandomInvoiceNumber() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 7; i++) {
            sb.append(random.nextInt(10)); // 0 ile 9 arasında rastgele sayılar ekler
        }
        return sb.toString();
    }

}
