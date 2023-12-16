package com.security.appointment;

import com.security.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AppointmentRequest {
    private Integer id;
    private String date;
    private String time;
    private String note;
    private String status;
    private String result;
    private User patient;
    private User doctor;
}
