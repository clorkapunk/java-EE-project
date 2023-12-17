package com.security.config;

import com.security.user.Permission;
import com.security.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;

import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
@CrossOrigin(origins = "*")
public class SecurityConfiguration {

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/api/v1/management/**",
            "/api/v1/admin/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/admin/**").hasAnyRole(Role.ADMIN.name())
                                .requestMatchers(GET, "/api/v1/admin/**").hasAnyAuthority(Permission.ADMIN_READ.name())
                                .requestMatchers(POST, "/api/v1/admin/**").hasAnyAuthority(Permission.ADMIN_CREATE.name())
                                .requestMatchers(PUT, "/api/v1/admin/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/admin/**").hasAnyAuthority(Permission.ADMIN_DELETE.name())
                                .requestMatchers("/api/v1/doctor/**").hasAnyRole(Role.ADMIN.name(), Role.DOCTOR.name())
                                .requestMatchers(GET, "/api/v1/doctor/**").hasAnyAuthority(Permission.ADMIN_READ.name(), Permission.DOCTOR_READ.name())
                                .requestMatchers(POST, "/api/v1/doctor/**").hasAnyAuthority(Permission.ADMIN_CREATE.name(), Permission.DOCTOR_CREATE.name())
                                .requestMatchers(PUT, "/api/v1/doctor/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name(), Permission.DOCTOR_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/doctor/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(), Permission.DOCTOR_DELETE.name())
                                .requestMatchers("/api/v1/patient/**").hasAnyRole(Role.ADMIN.name(), Role.DOCTOR.name(), Role.USER.name())
                                .requestMatchers(GET, "/api/v1/patient/**").hasAnyAuthority(Permission.ADMIN_READ.name(), Permission.DOCTOR_READ.name(), Permission.USER_READ.name())
                                .requestMatchers(POST, "/api/v1/patient/**").hasAnyAuthority(Permission.ADMIN_CREATE.name(), Permission.DOCTOR_CREATE.name(), Permission.USER_CREATE.name())
                                .requestMatchers(PUT, "/api/v1/patient/**").hasAnyAuthority(Permission.ADMIN_UPDATE.name(), Permission.DOCTOR_UPDATE.name(), Permission.USER_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/patient/**").hasAnyAuthority(Permission.ADMIN_DELETE.name(), Permission.DOCTOR_DELETE.name(), Permission.USER_DELETE.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;

        return http.build();
    }
}
