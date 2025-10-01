package com.healthcare.demo.controllers;

import com.healthcare.demo.enums.ApprovalStatus;
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

import java.util.Map;

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

    // Patient registration
    @PostMapping("/register/patient")
    public String registerPatient(@RequestBody Patient patient) {
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        authService.registerPatient(patient);
        return "Patient Registered Successfully!";
    }

    // Doctor registration (pending approval)
    @PostMapping("/register/doctor")
    public String registerDoctor(@RequestBody Doctor doctor) {
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        doctor.setApprovalStatus(ApprovalStatus.PENDING); // ensure pending
        authService.registerDoctor(doctor);
        return "Doctor Registered Successfully! Pending admin approval.";
    }

    // Patient login
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

    // Doctor login (check approval)
    @PostMapping("/login/doctor")
    public ResponseEntity<Object> loginDoctor(@RequestBody Doctor doctor) {
        Doctor existingDoctor = doctorRepository.findByEmail(doctor.getEmail());
        if (existingDoctor != null && passwordEncoder.matches(doctor.getPassword(), existingDoctor.getPassword())) {
            if (!ApprovalStatus.APPROVED.equals(existingDoctor.getApprovalStatus())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doctor account not approved yet");
            }
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

    // Admin login
    @PostMapping("/login/admin")
    public ResponseEntity<Object> loginAdmin(@RequestBody Map<String, String> request) {
        if("admin".equals(request.get("username")) && "admin".equals(request.get("password"))) {
            String token = jwtUtil.generateToken("admin");
            return ResponseEntity.ok(Map.of("token", token, "userType", "admin"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // Simple ping for testing
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

    // AuthResponse record
    record AuthResponse(String token, Long id, String userType, String name) {}
}
