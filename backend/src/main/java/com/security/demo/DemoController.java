package com.security.demo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.security.user.User;
import com.security.user.UserRepository;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/demo-controller")
@PreAuthorize("hasRole('ADMIN')")
@Hidden
public class DemoController {

  private final UserRepository repository;

  public DemoController(UserRepository repository) {
    this.repository = repository;
  }

  @GetMapping
  @PreAuthorize("hasAuthority('admin:read')")
  public ResponseEntity<String> sayHello() {
    return ResponseEntity.ok("Hello from secured endpoint");
  }

  @GetMapping("/1")
  @PreAuthorize("hasAuthority('admin:read')")
  public List<User> getusers(){return repository.findAll();}

}
