package com.security;

import com.security.appointment.AppointmentRequest;
import com.security.auth.AuthenticationService;
import com.security.auth.RegisterRequest;
import com.security.appointment.AppointmentService;
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

import static com.security.user.Role.*;

@SpringBootApplication
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
			AppointmentService appointmentService
	) {
		return args -> {
			var hospital = HospitalRequest.builder()
					.address("Street 1, Building 1")
					.title("Gov Hospital 1")
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
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var doctor = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.specialization(specializationService.findOneById(1))
					.firstname("Doctor1Firstname")
					.lastname("Doctor1Lastname")
					.email("doctor1@gmail.com")
					.password("password")
					.iin("021204501384")
					.number("87477778897")
					.address("Street 2, Building 3, Floor 4, Apartment 5")
					.gender("MALE")
					.dob("1999-03-08")
					.office("102")
					.schedule("MON-FRI 8:00-18:00")
					.role(DOCTOR)
					.build();
			System.out.println("Doctor token: " + service.register(doctor).getAccessToken());

			var user = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.firstname("User1Firstname")
					.lastname("User1Lastname")
					.email("user1@gmail.com")
					.password("password")
					.iin("021204501385")
					.number("87477778896")
					.address("Street 2, Building 3, Floor 4, Apartment 5")
					.gender("MALE")
					.dob("1999-03-08")
					.office("")
					.schedule("")
					.role(USER)
					.build();
			System.out.println("User token: " + service.register(user).getAccessToken());


			var appointment = AppointmentRequest.builder()
					.date("1992-02-02")
					.time("18:00-18:20")
					.note("Heart")
					.status("COMPLETED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			var appointment2 = AppointmentRequest.builder()
					.date("1992-02-02")
					.time("18:00-18:20")
					.note("Heart")
					.status("APPROVED")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment2);

			var appointment3 = AppointmentRequest.builder()
					.date("1992-02-02")
					.time("18:00-18:20")
					.note("Heart")
					.status("SENT")
					.result("")
					.patient(userService.findOneById(2))
					.doctor(userService.findOneById(2))
					.build();

			appointmentService.save(appointment3);

//			var book = BookRequest.builder()
//					.id(1)
//					.author("Nicolas Cr. Page")
//					.isbn("828728AS2")
//					.build();
//			bookService.save(book);
		};
	}
}
