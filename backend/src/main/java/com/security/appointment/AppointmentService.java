package com.security.appointment;

import com.security.exception.ApiRequestException;
import com.security.user.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository repository;

    public Integer save(AppointmentRequest request) {
        var appointment = Appointment.builder()
                .id(request.getId())
                .patient(request.getPatient())
                .doctor(request.getDoctor())
                .date(request.getDate())
                .time(request.getTime())
                .note(request.getNote())
                .status(request.getStatus() == null ? "SENT" : request.getStatus())
                .result(request.getResult() == null ? "" : request.getResult())
                .build();
        repository.save(appointment);
        return appointment.getId();
    }

    @Scheduled(fixedRate = 60000)
    public void reportCurrentTime() {
        var appointments = findAllSent();
        List<Appointment> newAppointments = new ArrayList<>();
        Map<String, List<Appointment>> appointmentsGrouped =
                appointments.stream().collect(Collectors.groupingBy(Appointment::getDate));

        for (Map.Entry<String, List<Appointment>> entry : appointmentsGrouped.entrySet()) {

            Map<String, List<Appointment>> timeGrouped =
                    entry.getValue().stream().collect(Collectors.groupingBy(Appointment::getTime));

            for (Map.Entry<String, List<Appointment>> entry2 : timeGrouped.entrySet()){
                if (entry2.getValue().isEmpty()) continue;
                if (entry2.getValue().size() == 1) {
                    entry2.getValue().get(0).setStatus("APPROVED");
                    newAppointments.add(entry2.getValue().get(0));
                    continue;
                }
                entry2.getValue().sort((x, y) -> {
                    if (x.getId() > y.getId()) return 1;
                    else if (x.getId() < y.getId()) return -1;
                    else return 0;
                });
                entry2.getValue().get(0).setStatus("APPROVED");
                for (int i = 1; i < entry2.getValue().size(); i++) {
                    entry2.getValue().get(i).setStatus("REJECTED");
                }
                newAppointments.addAll(entry2.getValue());
            }
        }

        repository.saveAll(newAppointments);
    }

    public Optional<Appointment> findOneByAllExceptId(User patient, User doctor, String date, String time, String note) {
        return repository.findAppointmentByPatientAndDoctorAndDateAndTimeAndNote(patient, doctor, date, time, note);
    }

    public List<Appointment> findAllSent() {
        return repository.findAllByStatus("SENT").orElseThrow(() -> new ApiRequestException("Appointments are not found"));
    }


    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public List<Appointment> findAllByPatient(User user) {
        return repository.findAllByPatient(user).orElseThrow(() -> new ApiRequestException("Appointments are not found"));
    }

    public Appointment findAppointmentByPatientAndId(User user, Integer id) {
        return repository.findAppointmentByPatientAndId(user, id).orElseThrow(() -> new ApiRequestException("Appointments are not found"));
    }

    public Appointment findAppointmentByDoctorAndId(User user, Integer id) {
        return repository.findAppointmentByDoctorAndId(user, id).orElseThrow(() -> new ApiRequestException("Appointments are not found " + user.getId() + " " + id));
    }

    public Appointment findOneById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new ApiRequestException("Appointments are not found"));
    }

    public List<Appointment> findAllByDoctor(User user) {
        return repository.findAllByDoctor(user).orElseThrow(() -> new ApiRequestException("Appointments are not found"));
    }

}
