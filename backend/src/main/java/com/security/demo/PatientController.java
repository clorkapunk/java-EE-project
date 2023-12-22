package com.security.demo;

import com.security.appointment.AppointmentRepository;
import com.security.appointment.AppointmentRequest;
import com.security.appointment.AppointmentService;
import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
import com.security.exception.ApiRequestException;
import com.security.hospital.HospitalService;
import com.security.specialization.SpecializationService;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserRepository;
import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/patient")
@PreAuthorize("hasRole('USER')")
public class PatientController {
    private final UserRepository repository;
    private final AuthenticationService service;
    private final AppointmentService appointmentService;
    private final UserService userService;
    private final HospitalService hospitalService;
    private final SpecializationService specializationService;

    public PatientController(UserRepository repository, AuthenticationService service, AppointmentRepository appointmentRepository, AppointmentService appointmentService, UserService userService, HospitalService hospitalService, SpecializationService specializationService) {
        this.repository = repository;
        this.service = service;
        this.appointmentService = appointmentService;

        this.userService = userService;
        this.hospitalService = hospitalService;
        this.specializationService = specializationService;
    }

    @GetMapping("{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    public User getUserById(@PathVariable("userId") Integer id){
        return repository.findById(id).orElseThrow(() -> new ApiRequestException("User is not found"));
    }

    record NewUserRequest(
            String firstname,
            String lastname,
            String email,
            String password,
            String role
    ){}

    record NewAppointmentRequest(
            String date,
            String time,
            String note,
            Integer doctorId,
            Integer patientId
    ){}

    @PostMapping("/appointment")
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public void addUser(@RequestBody NewAppointmentRequest request) {
        var user = userService.findOneById(request.patientId());
        var doctor = userService.findOneById(request.doctorId());
        var appointment = AppointmentRequest.builder()
                .date(request.date())
                .time(request.time())
                .note(request.note())
                .status(null)
                .result(null)
                .patient(user)
                .doctor(doctor)
                .build();
        appointmentService.save(appointment);
    }

    @DeleteMapping("{userId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    @Hidden
    public void deleteUser(@PathVariable("userId") Integer id){
        repository.deleteById(id);
    }

    @PutMapping("{customerId}")
    @PreAuthorize("hasAuthority('admin:update')")
    @Hidden
    public void updateCustomer(@PathVariable("customerId") Integer id, @RequestBody NewUserRequest request){
        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalIdentifierException("Not found: " + id));
        user.setFirstname(request.firstname == null ? user.getFirstname() : request.firstname);
        user.setLastname(request.lastname == null ? user.getLastname() : request.lastname);
        user.setEmail(request.email == null ? user.getEmail() : request.email);
        if(request.role() != null) user.setRole(request.role().equals("ADMIN") ? Role.ADMIN : Role.DOCTOR);
        repository.save(user);
    }
}
