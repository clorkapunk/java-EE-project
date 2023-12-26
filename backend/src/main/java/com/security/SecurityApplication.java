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
			// some test data
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
			service.register(doctor);

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
			service.register(user);

			var user2 = RegisterRequest.builder()
					.hospital(hospitalService.findOneById(1))
					.firstname("Latini")
					.lastname("Brunetto")
					.email("user2@gmail.com")
					.password("password")
					.iin("021204501389")
					.number("87477778899")
					.address("Paris, District 1, Rue de Rivoli, 14")
					.gender("MALE")
					.dob("1220-12-04")
					.office("")
					.schedule("")
					.role(USER)
					.build();
			service.register(user2);


			var appointment = AppointmentRequest.builder()
					.date("2023-12-27")
					.time("08:00-08:20")
					.note("Disease prevention")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-28")
					.time("14:00-14:20")
					.note("Knee pain, I think the reason is the arrow.")
					.result("")
					.patient(userService.findOneById(4))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-29")
					.time("08:00-08:20")
					.note("I've been coughing for 500 years, I want peace of mind.")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-28")
					.time("14:20-14:40")
					.note("Pain in the liver, kidneys, heart, stomach, legs, arms, head, back, lower back, pelvis, all joints and muscles.")
					.result("")
					.patient(userService.findOneById(4))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-27")
					.time("11:40-12:00")
					.note("The eye started to leak, I managed to collect it in a jar.")
					.result("")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);

			appointment = AppointmentRequest.builder()
					.date("2023-12-25")
					.time("09:00-09:20")
					.note("Health certificate for work.")
					.result("")
					.patient(userService.findOneById(4))
					.doctor(userService.findOneById(2))
					.build();
			appointmentService.save(appointment);


			var bill = BillRequest.builder()
					.total("7000")
					.description("You have consulted a doctor about back pain.")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("8000")
					.description("You have had surgery to remove your appendix.")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("1000")
					.description("You have had a blood test to check your blood sugar levels.")
					.patient(userService.findOneById(4))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("1000")
					.description("You have had a chest x-ray to check for pneumonia.")
					.patient(userService.findOneById(4))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("1000")
					.description("You have been prescribed antibiotics to treat the infection.")
					.patient(userService.findOneById(3))
					.doctor(userService.findOneById(2))
					.status("NOTPAID")
					.build();
			billService.save(bill);

			bill = BillRequest.builder()
					.total("1000")
					.description("You had to stay in the hospital overnight for observation after surgery.")
					.patient(userService.findOneById(4))
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
