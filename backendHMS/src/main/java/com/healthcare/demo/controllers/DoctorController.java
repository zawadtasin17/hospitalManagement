package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.DoctorDto;
import com.healthcare.demo.enums.Specialty;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.repositories.DoctorRepository;
import com.healthcare.demo.services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
    private final DoctorService doctorService;

    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    public DoctorController(
            DoctorService doctorService,
            DoctorRepository doctorRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

//    @GetMapping("/getalldoctors")
//    public ResponseEntity<List<Doctor>> getAllDoctors() {
//        List<Doctor> doctors = doctorService.getAllDoctors();
//        return ResponseEntity.ok(doctors);
//    }
//
//    @GetMapping("/specialty/{specialty}")
//    public List<Doctor> getDoctorsBySpecialty(@PathVariable Specialty specialty) {
//        return doctorService.getDoctorsBySpecialty(specialty);
//    }
//
//    // Get doctors available on a specific day
//    @GetMapping("/available")
//    public List<Doctor> getAvailableDoctors(
//            @RequestParam Specialty specialty,
//            @RequestParam(required = false) String dayOfWeek // MONDAY, etc.
//    ) {
//        return doctorService.getDoctorsBySpecialtyAndDay(specialty, dayOfWeek);
//    }

    @PutMapping("/update/{doctorId}")
    public ResponseEntity<Doctor> updateDoctorProfile(@PathVariable Long doctorId, @RequestBody DoctorDto dto) {
        Doctor updatedDoctor = doctorService.updateDoctorProfile(doctorId, dto);
        return ResponseEntity.ok(updatedDoctor);
    }

    @PostMapping("/doctorseed")
    public ResponseEntity<String> seedDoctors() {
//        if (doctorRepository.count() > 0) {
//            return ResponseEntity.ok("Doctors already seeded.");
//        }

        Doctor doc1 = new Doctor();
        doc1.setName("Dr. Imran Hossain");
        doc1.setEmail("imran@example.com");
        doc1.setPhone("01711111111");
        doc1.setPassword(passwordEncoder.encode("password1"));
        doc1.setSpecialty(Specialty.CARDIOLOGY);
        doc1.setAvailableDays(Set.of(DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY));
        doc1.setAvailableFrom(LocalTime.of(9, 0));
        doc1.setAvailableTo(LocalTime.of(13, 0));

        Doctor doc2 = new Doctor();
        doc2.setName("Dr. Rehana Akter");
        doc2.setEmail("rehana@example.com");
        doc2.setPhone("01722222222");
        doc2.setPassword(passwordEncoder.encode("password2"));
        doc2.setSpecialty(Specialty.DERMATOLOGY);
        doc2.setAvailableDays(Set.of(DayOfWeek.FRIDAY, DayOfWeek.SATURDAY));
        doc2.setAvailableFrom(LocalTime.of(10, 0));
        doc2.setAvailableTo(LocalTime.of(14, 0));

        Doctor doc3 = new Doctor();
        doc3.setName("Dr. Mizanur Rahman");
        doc3.setEmail("mizan@example.com");
        doc3.setPhone("01733333333");
        doc3.setPassword(passwordEncoder.encode("password3"));
        doc3.setSpecialty(Specialty.NEUROLOGY);
        doc3.setAvailableDays(Set.of(DayOfWeek.TUESDAY, DayOfWeek.THURSDAY));
        doc3.setAvailableFrom(LocalTime.of(15, 0));
        doc3.setAvailableTo(LocalTime.of(19, 0));

        Doctor doc4 = new Doctor();
        doc4.setName("Dr. Ayesha Siddiqua");
        doc4.setEmail("ayesha@example.com");
        doc4.setPhone("01744444444");
        doc4.setPassword(passwordEncoder.encode("password4"));
        doc4.setSpecialty(Specialty.PEDIATRICS);
        doc4.setAvailableDays(Set.of(DayOfWeek.SUNDAY, DayOfWeek.TUESDAY));
        doc4.setAvailableFrom(LocalTime.of(8, 30));
        doc4.setAvailableTo(LocalTime.of(12, 30));

        Doctor doc5 = new Doctor();
        doc5.setName("Dr. Kamrul Islam");
        doc5.setEmail("kamrul@example.com");
        doc5.setPhone("01755555555");
        doc5.setPassword(passwordEncoder.encode("password5"));
        doc5.setSpecialty(Specialty.ORTHOPEDICS);
        doc5.setAvailableDays(Set.of(DayOfWeek.MONDAY, DayOfWeek.THURSDAY));
        doc5.setAvailableFrom(LocalTime.of(14, 0));
        doc5.setAvailableTo(LocalTime.of(18, 0));

        Doctor doc6 = new Doctor();
        doc6.setName("Dr. Nusrat Jahan");
        doc6.setEmail("nusrat@example.com");
        doc6.setPhone("01766666666");
        doc6.setPassword(passwordEncoder.encode("password6"));
        doc6.setSpecialty(Specialty.GYNECOLOGY);
        doc6.setAvailableDays(Set.of(DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY));
        doc6.setAvailableFrom(LocalTime.of(9, 0));
        doc6.setAvailableTo(LocalTime.of(13, 0));

        Doctor doc7 = new Doctor();
        doc7.setName("Dr. Tanvir Ahmed");
        doc7.setEmail("tanvir@example.com");
        doc7.setPhone("01777777777");
        doc7.setPassword(passwordEncoder.encode("password7"));
        doc7.setSpecialty(Specialty.UROLOGY);
        doc7.setAvailableDays(Set.of(DayOfWeek.TUESDAY, DayOfWeek.SATURDAY));
        doc7.setAvailableFrom(LocalTime.of(10, 0));
        doc7.setAvailableTo(LocalTime.of(15, 0));

        Doctor doc8 = new Doctor();
        doc8.setName("Dr. Farzana Haque");
        doc8.setEmail("farzana@example.com");
        doc8.setPhone("01788888888");
        doc8.setPassword(passwordEncoder.encode("password8"));
        doc8.setSpecialty(Specialty.ENT);
        doc8.setAvailableDays(Set.of(DayOfWeek.MONDAY, DayOfWeek.THURSDAY));
        doc8.setAvailableFrom(LocalTime.of(11, 0));
        doc8.setAvailableTo(LocalTime.of(16, 0));

        Doctor doc9 = new Doctor();
        doc9.setName("Dr. Mahmudul Hasan");
        doc9.setEmail("mahmudul@example.com");
        doc9.setPhone("01799999999");
        doc9.setPassword(passwordEncoder.encode("password9"));
        doc9.setSpecialty(Specialty.GASTROENTEROLOGY);
        doc9.setAvailableDays(Set.of(DayOfWeek.SUNDAY, DayOfWeek.WEDNESDAY));
        doc9.setAvailableFrom(LocalTime.of(13, 0));
        doc9.setAvailableTo(LocalTime.of(17, 0));

        Doctor doc10 = new Doctor();
        doc10.setName("Dr. Sharmin Akter");
        doc10.setEmail("sharmin@example.com");
        doc10.setPhone("01800000000");
        doc10.setPassword(passwordEncoder.encode("password10"));
        doc10.setSpecialty(Specialty.PSYCHIATRY);
        doc10.setAvailableDays(Set.of(DayOfWeek.FRIDAY, DayOfWeek.SATURDAY));
        doc10.setAvailableFrom(LocalTime.of(10, 0));
        doc10.setAvailableTo(LocalTime.of(14, 0));


        doctorRepository.saveAll(List.of
                (doc1, doc2, doc3,doc4,doc5,
                doc6,doc7,doc8,doc9,doc10));

        return ResponseEntity.ok("✅ Sample doctors seeded successfully.");
    }


}
