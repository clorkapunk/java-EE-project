package com.security.PaymentBill;

import com.security.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class BillRequest {
    private Integer id;
    private String description;
    private String total;
    private String status;
    private User patient;
    private User doctor;
}
