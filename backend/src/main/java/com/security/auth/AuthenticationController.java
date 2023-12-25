package com.security.auth;

import com.security.exception.ApiRequestException;
import com.security.hospital.HospitalService;
import com.security.specialization.SpecializationService;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

import static com.security.user.Role.DOCTOR;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

  private final AuthenticationService service;
  private final HospitalService hospitalService;
  private final SpecializationService specializationService;
  private final UserRepository userRepository;

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


  // register a new user
  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody NewUserRequest request
  ) {
    Optional<User> candidate;
    candidate = userRepository.findByEmail(request.email());
    if(candidate.isPresent()) throw new ApiRequestException("Email already registered");
    candidate = userRepository.findByIin(request.iin());
    if(candidate.isPresent()) throw new ApiRequestException("Iin already registered");

    Role role;
    if(request.role().equals("ADMIN")) role = Role.ADMIN;
    else if (request.role().equals("DOCTOR")) role = Role.DOCTOR;
    else if (request.role().equals("USER")) role = Role.USER;
    else throw new ApiRequestException("Role \"" + request.role() + "\" is not exists!");
    var regRequest = RegisterRequest.builder()
            .hospital(hospitalService.findOneById(1))
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
    return ResponseEntity.ok(service.register(regRequest));
  }


  // auth service return token if all good
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }


  // jwt token check service return token if all good
  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
