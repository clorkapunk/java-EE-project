package com.alibou.security.demo;

import com.alibou.security.auth.AuthenticationService;
import com.alibou.security.auth.RegisterRequest;
import com.alibou.security.user.User;
import com.alibou.security.user.UserRepository;
import com.alibou.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.alibou.security.user.Role.ADMIN;
import static com.alibou.security.user.Role.MANAGER;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final UserRepository repository;
    private final AuthenticationService service;

    public AdminController(UserRepository repository, AuthenticationService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public List<User> getUsers(){
        return repository.findAll();
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
                .role(request.role().equals("ADMIN") ? ADMIN : MANAGER)
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
        if(request.role() != null) user.setRole(request.role().equals("ADMIN") ? ADMIN : MANAGER);
        repository.save(user);
    }
}
