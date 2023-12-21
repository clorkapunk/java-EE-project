package com.security.PaymentBill;

import com.security.exception.ApiRequestException;
import com.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillService {

    private final BillRepository repository;

    public void save(BillRequest request) {
        var book = Bill.builder()
                .id(request.getId())
                .patient(request.getPatient())
                .doctor(request.getDoctor())
                .deadline(LocalDateTime.now().plus(7, ChronoUnit.MONTHS))
                .status(request.getStatus())
                .total(request.getTotal())
                .description(request.getDescription())
                .build();
        repository.save(book);
    }

    public List<Bill> findAll() {
        return repository.findAll();
    }

    public List<Bill> findAllByPatient(User user) {return repository.findAllByPatient(user).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

    public Bill findBillByPatientAndId(User user, Integer id) { return  repository.findBillByPatientAndId(user, id).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

    public List<Bill> findAllByDoctor(User user) {return repository.findAllByDoctor(user).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

}
