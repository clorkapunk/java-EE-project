package com.security;

import com.security.PaymentBill.BillRequest;
import com.security.PaymentBill.BillService;
import com.security.appointment.AppointmentRequest;
import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
import com.security.appointment.AppointmentService;
import com.security.hospital.Hospital;
import com.security.hospital.HospitalRepository;
import com.security.hospital.HospitalRequest;
import com.security.hospital.HospitalService;
import com.security.specialization.SpecializationRequest;
import com.security.specialization.SpecializationService;
import com.security.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import static com.security.user.Role.*;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}


	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service,
			UserService userService,
			AppointmentService bookService,
			HospitalService hospitalService,
			SpecializationService specializationService,
			AppointmentService appointmentService,
			BillService billService,
			HospitalRepository hospitalRepository
	) {
		return args -> {
			var hospital = HospitalRequest.builder()
					.address("Rome, Fontana di Trevi, Vienna, 10")
					.title("Urban Purgatory No. 1")
					.build();
			hospitalService.save(hospital);

			var specialization = SpecializationRequest.builder()
					.title("general doctor")
					.build();
			specializationService.save(specialization);

			var admin = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@gmail.com")
					.password("password")
					.iin("021204501383")
					.number("87477778899")
					.address("Street 2, Building 3, Floor 4, Apartment 5")
					.gender("MALE")
					.dob("1999-03-08")
					.office("")
					.schedule("")
					.role(ADMIN)
					.build();
			System.out.println(service.register(admin).getAccessToken());

			var doctor = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.specialization(specializationService.findOneById(1))
					.firstname("Vergilius")
					.lastname("Maro")
					.email("doctor1@gmail.com")
					.password("password")
					.iin("021204501384")
					.number("87477778897")
					.address("Mantua, Istria, 12")
					.gender("MALE")
					.dob("70-10-15")
					.office("102")
					.schedule("MON-FRI 8:00-18:00")
					.role(DOCTOR)
					.build();
			System.out.println("Doctor token: " + service.register(doctor).getAccessToken());

			var user = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.firstname("Dante")
					.lastname("Alighieri")
					.email("user1@gmail.com")
					.password("password")
					.iin("021204501385")
					.number("87477778896")
					.address("Florence, San Giovanni, Bonaccorso, 52")
					.gender("MALE")
					.dob("1265-05-29")
					.office("")
					.schedule("")
					.role(USER)
					.build();
			System.out.println("User token: " + service.register(user).getAccessToken());


			var appointment = AppointmentRequest.builder()
					.date("2023-12-18")
					.time("08:00-08:20")
					.note("Heart")
					.status("COMPLETED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-19")
					.time("14:00-14:20")
					.note("Heart")
					.status("SENT")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-20")
					.time("08:00-08:20")
					.note("Heart")
					.status("APPROVED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-21")
					.time("14:00-14:20")
					.note("Heart")
					.status("REJECTED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-22")
					.time("08:00-08:20")
					.note("Heart")
					.status("CANCELLED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			var bill = BillRequest.builder()
					.total("7000")
					.description("For shoe covers")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("8000")
					.description("For water in toilet")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("PAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("1000")
					.description("For air")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			var hosp = hospitalRepository.findById(1).orElseThrow();
			hosp.setDistrictDoctor(userService.findOneById(2));
			hospitalRepository.save(hosp);



//			var book = BookRequest.builder()
//					.id(1)
//					.author("Nicolas Cr. Page")
//					.isbn("828728AS2")
//					.build();
//			bookService.save(book);
		};
	}
}
