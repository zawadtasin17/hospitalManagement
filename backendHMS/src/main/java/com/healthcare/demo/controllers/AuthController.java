package com.healthcare.demo.controllers;

import com.healthcare.demo.models.Patient;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.repositories.PatientRepository;
import com.healthcare.demo.repositories.DoctorRepository;
import com.healthcare.demo.services.AuthService;
import com.healthcare.demo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register/patient")
    public String registerPatient(@RequestBody Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        authService.registerPatient(patient);
        return "Patient Registered Successfully!";
    }

    @PostMapping("/register/doctor")
    public String registerDoctor(@RequestBody Doctor doctor) {
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        authService.registerDoctor(doctor);
        return "Doctor Registered Successfully!";
    }

    @PostMapping("/login/patient")
    public ResponseEntity<Object> loginPatient(@RequestBody Patient patient) {
        Patient existingPatient = patientRepository.findByEmail(patient.getEmail());
        if (existingPatient != null && passwordEncoder.matches(patient.getPassword(), existingPatient.getPassword())) {
            String token = jwtUtil.generateToken(existingPatient.getEmail());
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    existingPatient.getId(),
                    "patient",
                    existingPatient.getName()
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @PostMapping("/login/doctor")
    public ResponseEntity<Object> loginDoctor(@RequestBody Doctor doctor) {
        Doctor existingDoctor = doctorRepository.findByEmail(doctor.getEmail());
        if (existingDoctor != null && passwordEncoder.matches(doctor.getPassword(), existingDoctor.getPassword())) {
            String token = jwtUtil.generateToken(existingDoctor.getEmail());
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    existingDoctor.getId(),
                    "doctor",
                    existingDoctor.getName()
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // Updated AuthResponse record with extra fields
    record AuthResponse(String token, Long id, String userType, String name) {}
}
