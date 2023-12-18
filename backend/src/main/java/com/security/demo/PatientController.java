package com.security.demo;

import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
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
    private final UserService userService;

    public PatientController(UserRepository repository, AuthenticationService service, UserService userService) {
        this.repository = repository;
        this.service = service;
        this.userService = userService;
    }

    @GetMapping("{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    public User getUserById(@PathVariable("userId") Integer id){
        return repository.findById(id).orElseThrow();
    }

    record NewUserRequest(
            String firstname,
            String lastname,
            String email,
            String password,
            String role
    ){}

    @PostMapping
    @PreAuthorize("hasAuthority('admin:create')")
    @Hidden
    public void addUser(@RequestBody NewUserRequest request){
        var user = RegisterRequest.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(request.password())
                .role(request.role().equals("ADMIN") ? Role.ADMIN : Role.DOCTOR)
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
