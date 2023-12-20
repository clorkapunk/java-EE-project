package com.security.auth;

import com.security.exception.ApiRequestException;
import com.security.hospital.HospitalService;
import com.security.specialization.SpecializationService;
import com.security.user.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import static com.security.user.Role.DOCTOR;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

  private final AuthenticationService service;
  private final HospitalService hospitalService;
  private final SpecializationService specializationService;

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

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody NewUserRequest request
  ) {
    Role role;
    if(request.role().equals("ADMIN")) role = Role.ADMIN;
    else if (request.role().equals("DOCTOR")) role = Role.DOCTOR;
    else if (request.role().equals("USER")) role = Role.USER;
    else throw new ApiRequestException("Role \"" + request.role() + "\" is not exists!");
    var regRequest = RegisterRequest.builder()
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
    return ResponseEntity.ok(service.register(regRequest));
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
