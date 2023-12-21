package com.security.PaymentBill;

import com.security.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    Optional<List<Bill>> findAllByPatient(User patient);
    Optional<Bill> findBillByPatientAndId(User patient, Integer id);
    Optional<List<Bill>> findAllByDoctor(User doctor);
}
