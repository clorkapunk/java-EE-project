package com.security.appointment;

import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;
    private final UserService userService;


    @GetMapping("patient/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
        public List<Appointment> findAllAppointmentsByPatient(@PathVariable("userId") Integer id){
        var user = userService.findOneById(id);
        return service.findAllByPatient(user);
    }


    @GetMapping("doctor/{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByDoctor(@PathVariable("userId") Integer id){
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
