package com.security.demo;

import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
import com.security.exception.ApiRequestException;
import com.security.hospital.HospitalService;
import com.security.specialization.SpecializationService;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserRepository;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository repository;
    private final AuthenticationService service;
    private final HospitalService hospitalService;
    private final SpecializationService specializationService;

    public AdminController(UserRepository repository, AuthenticationService service, HospitalService hospitalService, SpecializationService specializationService) {
        this.repository = repository;
        this.service = service;
        this.hospitalService = hospitalService;
        this.specializationService = specializationService;
    }

    record NewUserRequest(
            String firstname,
            String lastname,
            String email,
            String password,
            String iin,
            String number,
            String address,
            String gender,
            String dob,
            String office,
            String schedule,
            Integer hospital,
            Integer specialization,
            String role
    ) {
    }


    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public List<User> getUsers() {
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public void addUser(@RequestBody NewUserRequest request) {
        Role role;
        if(request.role().equals("ADMIN")) role = Role.ADMIN;
        else if (request.role().equals("DOCTOR")) role = Role.DOCTOR;
        else if (request.role().equals("USER")) role = Role.USER;
        else throw new ApiRequestException("Role \"" + request.role() + "\" is not exists!");
        var user = RegisterRequest.builder()
                .hospital(hospitalService.findOneById(request.hospital()))
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(request.password())
                .iin(request.iin())
                .number(request.number())
                .address(request.address())
                .gender(request.gender())
                .dob(request.dob())
                .office(role == Role.DOCTOR ? request.office() : "")
                .schedule(role == Role.DOCTOR ? request.schedule() : "")
                .specialization(role == Role.DOCTOR ? specializationService.findOneById(request.specialization()) : null)
                .role(role)
                .build();
        service.register(user);
    }

    @DeleteMapping("{userId}")
    @PreAuthorize("hasAuthority('admin:delete')")
    @Hidden
    public void deleteUser(@PathVariable("userId") Integer id) {
        repository.deleteById(id);
    }

    @PutMapping("{userId}")
    @PreAuthorize("hasAuthority('admin:update')")
    @Hidden
    public void updateCustomer(@PathVariable("userId") Integer id, @RequestBody NewUserRequest request) {
        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalIdentifierException("User not found: " + id));
        user.setFirstname(request.firstname() == null ? user.getFirstname() : request.firstname());
        user.setLastname(request.lastname() == null ? user.getLastname() : request.lastname());
        user.setEmail(request.email() == null ? user.getEmail() : request.email());
        if (request.role() != null){
            Role role = null;
            if(request.role().equals("ADMIN")) role = Role.ADMIN;
            else if (request.role().equals("DOCTOR")) role = Role.DOCTOR;
            else if (request.role().equals("USER")) role = Role.USER;
            user.setRole(role);
        }
        user.setIin(request.iin() == null ? user.getIin() : request.iin());
        user.setNumber(request.number() == null ? user.getNumber() : request.number());
        user.setAddress(request.address() == null ? user.getAddress() : request.address());
        user.setDob(request.dob() == null ? user.getDob() : request.dob());
        user.setGender(request.gender() == null ? user.getGender() : request.gender());
        user.setSchedule(request.schedule() == null ? user.getSchedule() : request.schedule());
        user.setHospital(request.hospital() == null ? user.getHospital() : hospitalService.findOneById(request.hospital()));
        user.setSpecialization(request.specialization() == null ? user.getSpecialization() : specializationService.findOneById(request.specialization()));
        repository.save(user);
    }
}
