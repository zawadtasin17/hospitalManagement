package com.healthcare.demo.services;

import com.healthcare.demo.enums.ApprovalStatus;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.repositories.AppointmentRepository;
import com.healthcare.demo.repositories.DoctorRepository;
import com.healthcare.demo.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    // --- Doctor approvals ---
    public Doctor approveDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setApprovalStatus(ApprovalStatus.APPROVED);
        return doctorRepository.save(doctor);
    }

    public Doctor rejectDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        doctor.setApprovalStatus(ApprovalStatus.REJECTED);
        return doctorRepository.save(doctor);
    }

    // Return all doctors with PENDING status
    public List<Doctor> getPendingDoctors() {
        return doctorRepository.findByApprovalStatus(ApprovalStatus.PENDING);
    }

    // --- Statistics for dashboard ---
    public Map<String, Object> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalDoctors", doctorRepository.count());
        stats.put("totalPatients", patientRepository.count());
        stats.put("totalAppointments", appointmentRepository.count());
        stats.put("pendingDoctors", doctorRepository.countByApprovalStatus(ApprovalStatus.PENDING));
        return stats;
    }
}
