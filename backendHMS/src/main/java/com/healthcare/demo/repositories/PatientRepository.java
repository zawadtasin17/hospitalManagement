package com.healthcare.demo.repositories;

import com.healthcare.demo.enums.Specialty;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByEmail(String email);
}
