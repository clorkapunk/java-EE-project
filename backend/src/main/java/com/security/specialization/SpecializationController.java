package com.security.specialization;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.security.hospital.Hospital;
import com.security.hospital.HospitalController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/specializations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SpecializationController {

    private final SpecializationService service;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody SpecializationRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }


    // get all specializations
    @GetMapping
    @PreAuthorize("hasAuthority('admin:read')")
    public List<Specialization> findAllHositals() {
        return service.findAll();
    }
}
