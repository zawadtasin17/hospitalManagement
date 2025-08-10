package com.healthcare.demo.repositories;

import com.healthcare.demo.enums.Status;
import com.healthcare.demo.models.Appointment;
import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.models.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByPatient(Patient patient);

    // New method to get upcoming appointments by doctor ordered by appointment date/time
    List<Appointment> findByDoctorAndAppointmentDateTimeAfterAndStatusOrderByAppointmentDateTimeAsc(Doctor doctor, LocalDateTime now, Status status);
}
