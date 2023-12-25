package com.security.appointment;

import com.security.exception.ApiRequestException;
import com.security.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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


    // scheduler that every n-time check if there is a new appointments and either APPROVE or REJECT
    // APPROVE in case if this is first appointment to this date and time
    // REJECT otherwise
    @Scheduled(fixedRate = 20000)
    public void checkSentAppointments() {
        var appointments = findAllByStatus("SENT");
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


    // scheduler that every n-time check all APPROVED appointments and REJECT them if time is out
    @Scheduled(fixedRate = 60000)
    public void checkAppointmentToCancel() {
        var appointments = findAllByStatus("APPROVED");
        List<Appointment> newAppointments = new ArrayList<>();
        for (Appointment appointment : appointments) {
            var date = appointment.getDate();
            var time = appointment.getTime();
            time = time.substring(time.indexOf('-') + 1);
            LocalDateTime dateTime = LocalDateTime.parse(date + "T" + time);
            if (dateTime.isBefore(LocalDateTime.now())) {
                appointment.setStatus("CANCELLED");
            }
            newAppointments.add(appointment);
        }

        repository.saveAll(newAppointments);
    }


    public List<Appointment> findAllByStatus(String status) {
        return repository.findAllByStatus(status).orElseThrow(() -> new ApiRequestException("Appointments are not found"));
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
