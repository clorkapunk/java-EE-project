package com.security.appointment;

import com.security.user.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    Optional<List<Appointment>> findAllByPatient(User patient);
    Optional<Appointment> findAppointmentByPatientAndId(User patient, Integer id);

    Optional<List<Appointment>> findAllByDoctor(User doctor);
}
