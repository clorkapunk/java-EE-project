package com.security.auth;

import com.security.config.JwtService;
import com.security.exception.ApiException;
import com.security.exception.ApiRequestException;
import com.security.token.Token;
import com.security.token.TokenRepository;
import com.security.token.TokenType;
import com.security.user.Permission;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;


  // register a new user and add specific data according to ROLE
  public AuthenticationResponse register(RegisterRequest request) {
    User user;
    if(request.getRole() == Role.DOCTOR){
      user = User.builder()
              .hospital(request.getHospital())
              .specialization(request.getSpecialization())
              .firstname(request.getFirstname())
              .lastname(request.getLastname())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .iin(request.getIin())
              .address(request.getAddress())
              .number(request.getNumber())
              .dob(request.getDob())
              .gender(request.getGender())
              .office(request.getOffice())
              .schedule(request.getSchedule())
              .verified(true)
              .build();
    }
    else {
      user = User.builder()
              .hospital(request.getHospital())
              .firstname(request.getFirstname())
              .lastname(request.getLastname())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .iin(request.getIin())
              .address(request.getAddress())
              .number(request.getNumber())
              .dob(request.getDob())
              .gender(request.getGender())
              .office("")
              .schedule("")
              .verified(false)
              .build();
    }
    var savedUser = repository.save(user);
    var jwtToken = jwtService.generateToken(user, user.getId());
    var refreshToken = jwtService.generateRefreshToken(user, user.getId());
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }



  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()
        )
    );
    var user = repository.findByEmail(request.getEmail())
        .orElseThrow(() ->
          new UsernameNotFoundException("User not found")
        );
    var jwtToken = jwtService.generateToken(user, user.getId());
    var refreshToken = jwtService.generateRefreshToken(user, user.getId());
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder()
        .accessToken(jwtToken)
            .refreshToken(refreshToken)
        .build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
        .user(user)
        .token(jwtToken)
        .tokenType(TokenType.BEARER)
        .expired(false)
        .revoked(false)
        .build();
    tokenRepository.save(token);
  }


  // all tokens would be revoked
  private void revokeAllUserTokens(User user) {
    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }


  // check old token for validity and return new token
  public void refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    final String refreshToken;
    final String userEmail;
    if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
      return;
    }
    refreshToken = authHeader.substring(7);
    userEmail = jwtService.extractUsername(refreshToken);
    if (userEmail != null) {
      var user = this.repository.findByEmail(userEmail)
              .orElseThrow(() -> new ApiRequestException("User is not found!"));

      if (jwtService.isTokenValid(refreshToken, user)) {
        var accessToken = jwtService.generateToken(user, user.getId());
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);
        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
      }
    }
  }
}
