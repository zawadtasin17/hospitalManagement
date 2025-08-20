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

import java.util.HashMap;
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

    // ------------------------ RECORDS FOR RESPONSE ------------------------
    record ErrorResponse(String message, int statusCode) {}
    record SuccessResponse(String message) {}
    // AuthResponse now includes both accessToken and refreshToken
    record AuthResponse(String accessToken, String refreshToken, Long id, String userType, String name) {}

    // ------------------------ REGISTER PATIENT ------------------------
    @PostMapping("/register/patient")
    public ResponseEntity<Object> registerPatient(@RequestBody Patient patient) {
        if (patientRepository.findByEmail(patient.getEmail()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email already registered!", HttpStatus.CONFLICT.value()));
        }
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        authService.registerPatient(patient);
        return ResponseEntity.ok(new SuccessResponse("Patient Registered Successfully!"));
    }

    // ------------------------ REGISTER DOCTOR ------------------------
    @PostMapping("/register/doctor")
    public ResponseEntity<Object> registerDoctor(@RequestBody Doctor doctor) {
        if (doctorRepository.findByEmail(doctor.getEmail()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email already registered!", HttpStatus.CONFLICT.value()));
        }
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        authService.registerDoctor(doctor);
        return ResponseEntity.ok(new SuccessResponse("Doctor Registered Successfully!"));
    }

    // ------------------------ LOGIN PATIENT ------------------------
    @PostMapping("/login/patient")
    public ResponseEntity<Object> loginPatient(@RequestBody Patient patient) {
        Patient existingPatient = patientRepository.findByEmail(patient.getEmail());
        if (existingPatient != null && passwordEncoder.matches(patient.getPassword(), existingPatient.getPassword())) {
            // Generate both access and refresh tokens
            String accessToken = jwtUtil.generateAccessToken(existingPatient.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(existingPatient.getEmail());

            return ResponseEntity.ok(new AuthResponse(
                    accessToken,
                    refreshToken,
                    existingPatient.getId(),
                    "patient",
                    existingPatient.getName()
            ));
        }
        System.out.println("Logging in patient: " + existingPatient.getEmail() + ", id: " + existingPatient.getId());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // ------------------------ LOGIN DOCTOR ------------------------
    @PostMapping("/login/doctor")
    public ResponseEntity<Object> loginDoctor(@RequestBody Doctor doctor) {
        Doctor existingDoctor = doctorRepository.findByEmail(doctor.getEmail());
        if (existingDoctor != null && passwordEncoder.matches(doctor.getPassword(), existingDoctor.getPassword())) {
            // Generate both access and refresh tokens
            String accessToken = jwtUtil.generateAccessToken(existingDoctor.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(existingDoctor.getEmail());

            return ResponseEntity.ok(new AuthResponse(
                    accessToken,
                    refreshToken,
                    existingDoctor.getId(),
                    "doctor",
                    existingDoctor.getName()
            ));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    // ------------------------ REFRESH TOKEN ------------------------
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (refreshToken == null || !jwtUtil.validateToken(refreshToken, jwtUtil.extractUsername(refreshToken))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid or expired refresh token");
        }

        // Generate new access token from refresh token
        String username = jwtUtil.extractUsername(refreshToken);
        String newAccessToken = jwtUtil.generateAccessToken(username);

        // Return new access token and same refresh token
        Map<String, String> response = new HashMap<>();
        response.put("accessToken", newAccessToken);
        response.put("refreshToken", refreshToken); // optional: can generate new refresh token if you want

        return ResponseEntity.ok(response);
    }
}
