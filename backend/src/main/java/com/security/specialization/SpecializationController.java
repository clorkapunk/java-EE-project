package com.security.specialization;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/specializations")
@RequiredArgsConstructor
public class SpecializationController {

    private final SpecializationService service;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestBody SpecializationRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping
    public ResponseEntity<List<Specialization>> findAllSpec() {
        return ResponseEntity.ok(service.findAll());
    }
}
