package com.healthcare.demo.controllers;

import com.healthcare.demo.enums.Specialty;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.services.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientController {
    private final DoctorService doctorService;

    public PatientController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/doctors/getalldoctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/doctors/specialty/{specialty}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialty(@PathVariable Specialty specialty) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialty(specialty);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/doctors/available")
    public ResponseEntity<List<Doctor>> getAvailableDoctors(
            @RequestParam Specialty specialty,
            @RequestParam(required = false) String dayOfWeek
    ) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialtyAndDay(specialty, dayOfWeek);
        return ResponseEntity.ok(doctors);
    }
}
