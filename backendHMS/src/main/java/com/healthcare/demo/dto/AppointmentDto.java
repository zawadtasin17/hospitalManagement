package com.healthcare.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDto {
    private Long id;
    private LocalDateTime appointmentDateTime;
    private DoctorDto doctor;
    private PatientDto patient;
    private String status; // e.g., Scheduled, Completed
}
