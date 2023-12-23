package com.security.demo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.security.appointment.*;
import com.security.exception.ApiRequestException;
import com.security.user.User;
import com.security.user.UserRepository;
import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalField;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

import static com.security.appointment.AppointmentController.timePeriod20;

@RestController
@RequestMapping("/api/v1/doctor")
@CrossOrigin(origins = "*")
@Tag(name = "Management")
public class DoctorController {
    private final AppointmentService appointmentService;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public DoctorController(AppointmentService appointmentService, AppointmentRepository appointmentRepository, UserRepository userRepository, UserService userService) {
        this.appointmentService = appointmentService;
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Operation(
            description = "Get endpoint for manager",
            summary = "This is a summary for management get endpoint",
            responses = {
                    @ApiResponse(
                            description = "Success",
                            responseCode = "200"
                    ),
                    @ApiResponse(
                            description = "Unauthorized / Invalid Token",
                            responseCode = "403"
                    )
            }

    )

    @GetMapping("{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    public User getUserById(@PathVariable("userId") Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new ApiRequestException("User is not found"));
    }

    record TimeAppointment(
            String time,
            @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "doctor", "patient"})
            Appointment appointment
    ) {
    }

    record ScheduleDay(
            String date,
            ArrayList<TimeAppointment> schedule
    ) {
    }

    public ScheduleDay dayAppointments(String date, List<Appointment> appointments) {
        String dayOfWeek = LocalDate.parse(date).getDayOfWeek().toString();
        ArrayList<TimeAppointment> schedule = new ArrayList<>();

        // group appointments by time
        Map<String, List<Appointment>> appointmentsGrouped =
                appointments.stream().collect(Collectors.groupingBy(Appointment::getTime));

        // determine time range
        ArrayList<String> timeRange;
        if (List.of("MONDAY", "WEDNESDAY", "FRIDAY").contains(dayOfWeek)) {
            timeRange = timePeriod20("08:00", "12:00");
        } else if (List.of("THURSDAY", "TUESDAY").contains(dayOfWeek)) {
            timeRange = timePeriod20("14:00", "18:00");
        } else timeRange = new ArrayList<>();

        for (int i = 0; i < timeRange.size(); i++) {
            var dateTemp = timeRange.get(i);
            if (!appointmentsGrouped.containsKey(dateTemp)) {
                schedule.add(new TimeAppointment(dateTemp, null));
                continue;
            }
            schedule.add(new TimeAppointment(dateTemp, appointmentsGrouped.get(dateTemp).get(0)));
        }

        return new ScheduleDay(date, schedule);
    }

    public ArrayList<ScheduleDay> weekAppointment(String date, List<Appointment> appointments){
        var start = LocalDate.parse(date);
        var end = start.plusDays(6);
        ArrayList<ScheduleDay> result = new ArrayList<>();

        while (start.isBefore(end)){
            LocalDate finalStart = start;
            var appointmentsDay = appointments.stream().filter(x -> {
                        LocalDate dateTemp = LocalDate.parse(x.getDate());
                        return (dateTemp.isEqual(finalStart));
                    }
            ).toList();
            result.add(dayAppointments(start.toString(), appointmentsDay));
            start = start.plusDays(1);
        }

        return result;
    }

    @GetMapping("/schedule/{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    public ArrayList<ArrayList<ScheduleDay>> getAllAppointments(@PathVariable("userId") Integer id) {
        var user = userService.findOneById(id);
        var appointments = appointmentService.findAllByDoctor(user);

        // takes only approved appointments
        appointments = appointments.stream().filter(x -> {
            return x.getStatus().equals("APPROVED") || x.getStatus().equals("COMPLETED") || x.getStatus().equals("CANCELLED");
        }).toList();

        ArrayList<ArrayList<ScheduleDay>> result = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            var day = LocalDate.now().plusDays(i * 7).with(DayOfWeek.MONDAY);
            var appointmentsWeek = appointments.stream().filter(x -> {
                        LocalDate date = LocalDate.parse(x.getDate());
                        return (date.isAfter(day.minusDays(1)) && date.isBefore(day.plusDays(6)));
                    }
            ).toList();
            result.add(weekAppointment(day.toString(), appointmentsWeek));
        }

        return result;
    }

    record UpdateAppointmentRequest(
            String result
    ){}

    @PutMapping("/appointment/{appointmentId}")
    @PreAuthorize("hasAuthority('doctor:update')")
    public void updateAppointment(@PathVariable Integer appointmentId, @RequestBody AppointmentRequest request){
        var appointment = appointmentService.findOneById(appointmentId);
        appointment.setStatus("COMPLETED");
        appointment.setResult(request.getResult() == null ? appointment.getResult() : request.getResult());
        appointmentRepository.save(appointment);
    }

    record ShortAppointmentsList(
            @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "doctor", "patient"})
            List<Appointment> appointments
    ){}
    @GetMapping("/appointments/{userId}")
    @PreAuthorize("hasAuthority('doctor:update')")

    public ShortAppointmentsList findAllBooks(@PathVariable Integer userId) {
        List<Appointment> appointments = appointmentService.findAllByDoctor(userService.findOneById(userId));
        appointments.sort((x, y) -> {
            var date = x.getDate();
            var time = x.getTime();
            time = time.substring(0, time.indexOf('-'));
            LocalDateTime dateTimeX = LocalDateTime.parse(date + "T" + time);

            date = y.getDate();
            time = y.getTime();
            time = time.substring(0, time.indexOf('-'));
            LocalDateTime dateTimeY = LocalDateTime.parse(date + "T" + time);
            if (dateTimeX.isBefore(dateTimeY)) return -1;
            else if (dateTimeX.isAfter(dateTimeY)) return 1;
            else return 0;
        });

        appointments = appointments.stream().filter(x -> {
            return x.getStatus().equals("APPROVED") || x.getStatus().equals("COMPLETED") || x.getStatus().equals("CANCELLED");
        }).toList();


        return new ShortAppointmentsList(appointments);
    }
}
