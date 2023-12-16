package com.security.appointment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;

    public void save(AppointmentRequest request) {
        var book = Appointment.builder()
                .id(request.getId())
                .patient(request.getPatient())
                .doctor(request.getDoctor())
                .date(request.getDate())
                .time(request.getTime())
                .note(request.getNote())
                .status(request.getStatus())
                .result(request.getResult())
                .build();
        repository.save(book);
    }

    public List<Appointment> findAll() {
        return repository.findAll();
    }
}
