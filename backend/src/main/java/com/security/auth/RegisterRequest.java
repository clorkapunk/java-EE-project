package com.security.auth;

import com.security.hospital.Hospital;
import com.security.specialization.Specialization;
import com.security.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  private String firstname;
  private String lastname;
  private String email;
  private String password;
  private String iin;
  private String login;
  private String number;
  private String address;
  private String gender;
  private String dob;
  private String office;
  private String schedule;
  private Hospital hospital;
  private Specialization specialization;
  private Role role;

}
