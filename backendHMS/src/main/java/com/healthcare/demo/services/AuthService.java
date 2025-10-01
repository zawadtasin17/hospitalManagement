package com.healthcare.demo.services;

import com.healthcare.demo.models.Patient;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.repositories.PatientRepository;
import com.healthcare.demo.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // Save patient to database
    public Patient registerPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Save doctor to database
    public Doctor registerDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}
