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

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

//    // Create appointment
//    public Appointment createAppointment(Long doctorId, Long patientId, LocalDateTime dateTime) {
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
//
//        Patient patient = patientRepository.findById(patientId)
//                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));
//
//        Appointment appointment = new Appointment();
//        appointment.setDoctor(doctor);
//        appointment.setPatient(patient);
//        appointment.setAppointmentDateTime(dateTime);
//        appointment.setStatus(Status.Scheduled);  // Use enum
//
//        return appointmentRepository.save(appointment);
//    }

    public Appointment createAppointment(Long doctorId, Long patientId, LocalDateTime appointmentTime) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Rule 1: One active appointment per doctor
        List<Appointment> existingAppointments =
                appointmentRepository.findByDoctorAndPatientAndStatus(doctor, patient, Status.Scheduled);

        if (!existingAppointments.isEmpty()) {
            throw new RuntimeException("You already have a scheduled appointment with this doctor.");
        }

        // Rule 2: Max 3 active appointments in total
        long activeAppointments = appointmentRepository.countByPatientAndStatus(patient, Status.Scheduled);

        if (activeAppointments >= 3) {
            throw new RuntimeException("You cannot book more than 3 active appointments.");
        }

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointmentDateTime(appointmentTime);
        appointment.setStatus(Status.Scheduled);

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

    public List<Appointment> getUpcomingAppointmentsForDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        LocalDateTime now = LocalDateTime.now();

        return appointmentRepository.findByDoctorAndAppointmentDateTimeAfterAndStatusOrderByAppointmentDateTimeAsc(
                doctor, now, Status.Scheduled);
    }

    // New: Get basic appointment statistics for doctor
    public Map<String, Object> getDoctorStatistics(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctor);

        long total = appointments.size();
        long scheduled = appointments.stream().filter(a -> a.getStatus() == Status.Scheduled).count();
        long completed = appointments.stream().filter(a -> a.getStatus() == Status.Completed).count();
        long cancelled = appointments.stream().filter(a -> a.getStatus() == Status.Cancelled).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAppointments", total);
        stats.put("scheduledAppointments", scheduled);
        stats.put("completedAppointments", completed);
        stats.put("cancelledAppointments", cancelled);

        return stats;
    }

    // New: Dashboard - grouped appointment counts by day and week
    public Map<String, Object> getDoctorDashboard(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        List<Appointment> appointments = appointmentRepository.findByDoctor(doctor);

        // Group by DayOfWeek (e.g., MONDAY, TUESDAY, ...)
        Map<DayOfWeek, Long> appointmentsByDay = appointments.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getAppointmentDateTime().toLocalDate().getDayOfWeek(),
                        Collectors.counting()
                ));

        // Group by week number of year (e.g., week 1, week 2, ...)
        WeekFields weekFields = WeekFields.ISO; // Monday start of week
        Map<Integer, Long> appointmentsByWeek = appointments.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getAppointmentDateTime().toLocalDate().get(weekFields.weekOfWeekBasedYear()),
                        Collectors.counting()
                ));

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("appointmentsByDay", appointmentsByDay);
        dashboard.put("appointmentsByWeek", appointmentsByWeek);
        dashboard.put("totalAppointments", appointments.size());

        return dashboard;
    }

}
