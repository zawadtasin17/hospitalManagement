package com.healthcare.demo.services;

import com.healthcare.demo.enums.Status;
import com.healthcare.demo.models.Appointment;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.models.Patient;
import com.healthcare.demo.repositories.AppointmentRepository;
import com.healthcare.demo.repositories.DoctorRepository;
import com.healthcare.demo.repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // Create appointment
    public Appointment createAppointment(Long doctorId, Long patientId, LocalDateTime dateTime) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDateTime(dateTime);
        appointment.setStatus(Status.Scheduled);  // Use enum

        return appointmentRepository.save(appointment);
    }

    // Get appointments for a patient
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));
        return appointmentRepository.findByPatient(patient);
    }

    // Get appointments for a doctor
    public List<Appointment> getAppointmentsByDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        return appointmentRepository.findByDoctor(doctor);
    }

    // Update appointment status
    public Appointment updateStatus(Long appointmentId, Status status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    // Cancel (delete) appointment
    public void cancelAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));
        appointmentRepository.delete(appointment);
    }

}
