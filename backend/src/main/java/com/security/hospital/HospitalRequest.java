package com.security.hospital;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HospitalRequest {
    private Integer id;
    private String title;
    private String address;
    private Integer districtDoctor;
}
