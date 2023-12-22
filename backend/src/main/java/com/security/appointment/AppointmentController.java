package com.security.appointment;

import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.hibernate.Internal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.chrono.ChronoLocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;
    private final UserService userService;

    @GetMapping("patient/{userId}/{appointmentId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public Appointment findAllAppointmentsByPatientAndId(@PathVariable("userId") Integer id,
                                                         @PathVariable("appointmentId") Integer aId) {
        var user = userService.findOneById(id);
        return service.findAppointmentByPatientAndId(user, aId);
    }

    @GetMapping("patient/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByPatient(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);
        return service.findAllByPatient(user);
    }

    record AvailableTime(
            String date,
            ArrayList<String> availableTime
    ) {
    }

    public static ArrayList<String> timePeriod20(String start, String end){
        ArrayList<String> result = new ArrayList<>();
        LocalTime first = LocalTime.parse(start);
        if(first.getMinute() % 20 != 0){
            first = first.withMinute(first.getMinute() / 20 * 20).plusMinutes(20);
        }
        LocalTime second = first.plusMinutes(20);
        LocalTime last = LocalTime.parse(end);
        while(!second.isAfter(last)){
            result.add(first.toString() + "-" + second.toString());
            first = first.plusMinutes(20);
            second = first.plusMinutes(20);
        }
        return result;
    }

    @GetMapping("available/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public List<List<AvailableTime>> findAllAppointmentsByDoctor2(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);

        var appointmentRaw = service.findAllByDoctor(user);
        List<Appointment> appointmentsFiltered;
        appointmentsFiltered = appointmentRaw.stream()
                .filter(x -> x.getStatus().equals("APPROVED"))
                .filter(x -> {
                    LocalDate date = LocalDate.parse(x.getDate());
                    return date.isAfter(LocalDate.now().minusDays(1));
                }
        ).collect(Collectors.toList());

        List<List<AvailableTime>> result = new ArrayList<>();

        var days = 0;
        for (int i = 0; i < 4; i++) {
            List<AvailableTime> temp = new ArrayList<>();
            for (int j = 0; j < 5; j++) {
                String dayOfWeek = LocalDate.now().plusDays(days).getDayOfWeek().toString();
                ArrayList<String> timeTemp;
                if (List.of("MONDAY", "WEDNESDAY", "FRIDAY").contains(dayOfWeek)) {
                    if(days == 0) timeTemp = timePeriod20(LocalTime.now().toString(), "12:00");
                    else timeTemp = timePeriod20("08:00", "12:00");
                }
                else if (List.of("THURSDAY", "TUESDAY").contains(dayOfWeek)) {
                    if(days == 0) timeTemp = timePeriod20(LocalTime.now().toString(), "18:00");
                    else timeTemp = timePeriod20("14:00", "18:00");
                }
                else timeTemp = new ArrayList<>();
                temp.add(new AvailableTime(LocalDate.now().plusDays(days).toString(), timeTemp));
                days += 1;
            }
            result.add(temp);
        }

        Map<String, List<Appointment>> appointmentsGrouped =
                appointmentsFiltered.stream().collect(Collectors.groupingBy(Appointment::getDate));

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 5; j++) {
                String date = result.get(i).get(j).date;
                if (!appointmentsGrouped.containsKey(date)) continue;
                List<String> busyTime = appointmentsGrouped.get(date).stream().map(Appointment::getTime).toList();
                result.get(i).get(j).availableTime.removeAll(busyTime);
            }
        }


        return result;
    }

    @GetMapping("doctor/{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    @Hidden
    public List<Appointment> findAllAppointmentsByDoctor(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);
        return service.findAllByDoctor(user);
    }

    @GetMapping("doctor/{userId}/{appointmentId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    @Hidden
    public Appointment findAppointmentByDoctorAndId(@PathVariable("userId") Integer id,
                                                         @PathVariable("appointmentId") Integer aId) {
        var user = userService.findOneById(id);
        return service.findAppointmentByDoctorAndId(user, aId);
    }
    @GetMapping
    @PreAuthorize("hasAuthority('doctor:read')")
    public ResponseEntity<List<Appointment>> findAllAppointments() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('doctor:create')")
    public ResponseEntity<?> save(
            @RequestBody AppointmentRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }


}
