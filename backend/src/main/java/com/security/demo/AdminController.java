package com.security.demo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
import com.security.hospital.HospitalService;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserRepository;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.security.user.Role.USER;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository repository;
    private final AuthenticationService service;
    private final HospitalService hospitalService;

    public AdminController(UserRepository repository, AuthenticationService service, HospitalService hospitalService) {
        this.repository = repository;
        this.service = service;
        this.hospitalService = hospitalService;
    }

    @GetMapping

    @PreAuthorize("hasAuthority('admin:read')")
    public List<User> getUsers(){
        return repository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public void addUser(@RequestBody RegisterRequest request){
        var user = RegisterRequest.builder()
                .hospital(request.getHospital())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(request.getPassword())
                .iin(request.getIin())
                .number(request.getNumber())
                .address(request.getAddress())
                .gender(request.getGender())
                .dob(request.getDob())
                .office(request.getOffice())
                .schedule(request.getSchedule())
                .role(request.getRole())
                .build();
        System.out.println(user);
        service.register(user);
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
    public void updateCustomer(@PathVariable("customerId") Integer id, @RequestBody RegisterRequest request){
        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalIdentifierException("Not found: " + id));
        user.setFirstname(request.getFirstname() == null ? user.getFirstname() : request.getFirstname());
        user.setLastname(request.getLastname() == null ? user.getLastname() : request.getLastname());
        user.setEmail(request.getEmail() == null ? user.getEmail() : request.getEmail());
        if(request.getRole() != null) user.setRole(request.getRole());
        repository.save(user);
    }
}
