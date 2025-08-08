package com.healthcare.demo.services;

import com.healthcare.demo.dto.DoctorDto;
import com.healthcare.demo.enums.Specialty;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.repositories.DoctorRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> getDoctorsBySpecialty(Specialty specialty) {
        return doctorRepository.findBySpecialty(specialty);
    }

    public List<Doctor> getDoctorsBySpecialtyAndDay(Specialty specialty, String dayOfWeekStr) {
        DayOfWeek dayOfWeek = DayOfWeek.valueOf(dayOfWeekStr.toUpperCase());
        return doctorRepository.findBySpecialty(specialty).stream()
                .filter(doc -> doc.getAvailableDays().contains(dayOfWeek))
                .collect(Collectors.toList());
    }

    public Doctor updateDoctorProfile(Long doctorId, DoctorDto dto) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

        doctor.setName(dto.getName());
        doctor.setSpecialty(dto.getSpecialty());
        doctor.setAvailableDays(dto.getAvailableDays());
        doctor.setAvailableFrom(dto.getAvailableFrom());
        doctor.setAvailableTo(dto.getAvailableTo());

        return doctorRepository.save(doctor);
    }

}
