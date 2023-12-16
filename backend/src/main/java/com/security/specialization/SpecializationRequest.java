package com.security.specialization;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SpecializationRequest {
    private Integer id;
    private String title;
}
