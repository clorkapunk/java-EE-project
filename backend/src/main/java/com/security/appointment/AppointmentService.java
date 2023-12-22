package com.security.appointment;

import com.security.exception.ApiRequestException;
import com.security.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
                .status(request.getStatus() == null ? "SENT" : request.getStatus())
                .result(request.getResult() == null ? "" : request.getResult())
                .build();
        repository.save(book);
    }

    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public List<Appointment> findAllByPatient(User user) {return repository.findAllByPatient(user).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

    public Appointment findAppointmentByPatientAndId(User user, Integer id) { return  repository.findAppointmentByPatientAndId(user, id).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

    public List<Appointment> findAllByDoctor(User user) {return repository.findAllByDoctor(user).orElseThrow(() -> new ApiRequestException("Appointments are not found")); }

}
