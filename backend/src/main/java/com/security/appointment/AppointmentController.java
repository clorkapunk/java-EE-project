package com.security.appointment;

import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.hibernate.Internal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.chrono.ChronoLocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;
    private final UserService userService;

    @GetMapping("patient/{userId}/{appointmentId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public Appointment findAllAppointmentsByPatientAndId(@PathVariable("userId") Integer id,
                                                         @PathVariable("appointmentId") Integer aId) {
        var user = userService.findOneById(id);
        return service.findAppointmentByPatientAndId(user, aId);
    }

    @GetMapping("patient/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByPatient(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);
        return service.findAllByPatient(user);
    }

    record AvailableTime(
            String date,
            String time
    ) {
    }

    @GetMapping("/available/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByDoctor2(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);

        var appointmentRaw = service.findAllByDoctor(user);
        List<Appointment> appointmentsFiltered;
        appointmentsFiltered = appointmentRaw.stream().filter(x -> {
                    LocalDate date = LocalDate.parse(x.getDate());
                    return date.isAfter(LocalDate.now().minusDays(1));
                }
        ).collect(Collectors.toList());

        return appointmentsFiltered;
    }


    @GetMapping("doctor/{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByDoctor(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);
        return service.findAllByDoctor(user);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('doctor:read')")
    public ResponseEntity<List<Appointment>> findAllAppointments() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('doctor:create')")
    public ResponseEntity<?> save(
            @RequestBody AppointmentRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }


}
