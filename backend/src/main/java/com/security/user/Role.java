package com.security.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {

  ADMIN(
          Set.of(
                  Permission.ADMIN_READ,
                  Permission.ADMIN_UPDATE,
                  Permission.ADMIN_DELETE,
                  Permission.ADMIN_CREATE,
                  Permission.DOCTOR_READ,
                  Permission.DOCTOR_UPDATE,
                  Permission.DOCTOR_DELETE,
                  Permission.DOCTOR_CREATE,
                  Permission.USER_READ,
                  Permission.USER_UPDATE,
                  Permission.USER_DELETE,
                  Permission.USER_CREATE
          )
  ),
  DOCTOR(
          Set.of(
                  Permission.DOCTOR_READ,
                  Permission.DOCTOR_UPDATE,
                  Permission.DOCTOR_DELETE,
                  Permission.DOCTOR_CREATE
          )
  ),
  USER (
          Set.of(
                  Permission.USER_READ,
                  Permission.USER_UPDATE,
                  Permission.USER_DELETE,
                  Permission.USER_CREATE
          )
  )

  ;

  @Getter
  private final Set<Permission> permissions;

  public List<SimpleGrantedAuthority> getAuthorities() {
    var authorities = getPermissions()
            .stream()
            .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
            .collect(Collectors.toList());
    authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
    return authorities;
  }
}
