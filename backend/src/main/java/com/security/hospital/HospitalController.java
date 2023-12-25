package com.security.hospital;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospitals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HospitalController {

    private final HospitalService service;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody HospitalRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }


    // get all hospitals
    record HospitalsShort(
            @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "districtDoctor", "patient"})
            List<Hospital> hospitals
    ){}
    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public HospitalsShort findAllHositals() {
        return new HospitalsShort(service.findAll());
    }
}
