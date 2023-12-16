package com.security.hospital;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository repository;

    public void save(HospitalRequest request) {
        var book = Hospital.builder()
                .id(request.getId())
                .title(request.getTitle())
                .address(request.getAddress())
                .build();
        repository.save(book);
    }

    public List<Hospital> findAll() {
        return repository.findAll();
    }

    public Hospital findOneById(Integer id){return repository.findById(id).orElseThrow();}
}
