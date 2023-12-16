package com.security.user;

import com.security.appointment.Appointment;
import com.security.hospital.Hospital;
import com.security.specialization.Specialization;
import com.security.token.Token;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;
import java.util.List;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private Integer id;
  private String firstname;
  private String lastname;
  private String password;
  private String iin;
  private String login;
  private String number;
  private String email;
  private String address;
  private String gender;
  private String dob;
  private String office;
  private String schedule;


  @Getter
  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "hospital_id")
  public Hospital hospital;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "specialization_id")
  public Specialization specialization;

  @JsonIgnore
  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
  private List<Token> tokens;

  @JsonIgnore
  @OneToMany(mappedBy = "doctor", cascade = CascadeType.REMOVE)
  private List<Appointment> appointments2;

  @JsonIgnore
  @OneToMany(mappedBy = "patient", cascade = CascadeType.REMOVE)
  private List<Appointment> appointments;


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return login;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
