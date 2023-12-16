package com.security.specialization;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpecializationService {

    private final SpecializationRepository repository;

    public void save(SpecializationRequest request) {
        var book = Specialization.builder()
                .id(request.getId())
                .title(request.getTitle())
                .build();
        repository.save(book);
    }

    public List<Specialization> findAll() {
        return repository.findAll();
    }

    public Specialization findOneById(Integer id){return repository.findById(id).orElseThrow();}
}
