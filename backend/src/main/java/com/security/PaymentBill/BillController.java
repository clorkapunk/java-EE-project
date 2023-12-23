package com.security.PaymentBill;

import com.security.demo.PatientController;
import com.security.user.Role;
import com.security.user.User;
import com.security.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/bills")
@RequiredArgsConstructor
public class BillController {

    private final BillService service;
    private final BillRepository billRepository;
    private final UserService userService;

    @GetMapping("patient/{userId}/{billId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
    public Bill findAllAppointmentsByPatientAndId(@PathVariable("userId") Integer id,
                                                  @PathVariable("billId") Integer aId){
        var user = userService.findOneById(id);
        return service.findBillByPatientAndId(user, aId);
    }

    @GetMapping("patient/{userId}")
    @PreAuthorize("hasAuthority('user:read')")
    @Hidden
        public List<Bill> findAllAppointmentsByPatient(@PathVariable("userId") Integer id){
        var user = userService.findOneById(id);
        return service.findAllByPatient(user);
    }


    @GetMapping("doctor/{userId}")
    @PreAuthorize("hasAuthority('doctor:read')")
    @Hidden
    public List<Bill> findAllAppointmentsByDoctor(@PathVariable("userId") Integer id){
        var user = userService.findOneById(id);
        return service.findAllByDoctor(user);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('doctor:read')")
    public ResponseEntity<List<Bill>> findAllAppointments() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('doctor:create')")
    public ResponseEntity<?> save(
            @RequestBody BillRequest request
    ) {
        service.save(request);
        return ResponseEntity.accepted().build();
    }

    @PutMapping("/pay/{customerId}/{billId}")
    @PreAuthorize("hasAuthority('user:update')")
    @Hidden
    public void updateCustomer(@PathVariable("customerId") Integer id, @PathVariable("billId") Integer billId){
        User user = userService.findOneById(id);
        Bill bill = service.findBillByPatientAndId(user, billId);
        bill.setStatus("PAID");
        billRepository.save(bill);
    }

}
