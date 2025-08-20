package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.AppointmentDto;
import com.healthcare.demo.dto.AppointmentRequestDto;
import com.healthcare.demo.enums.Status;
import com.healthcare.demo.models.Appointment;
import com.healthcare.demo.services.AppointmentService;
import com.healthcare.demo.mapper.AppointmentMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequestDto dto) {
        try {
            LocalDateTime appointmentTime = LocalDateTime.parse(dto.getDateTime());
            Appointment appointment = appointmentService.createAppointment(
                    dto.getDoctorId(),
                    dto.getPatientId(),
                    appointmentTime
            );
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(AppointmentMapper.toDto(appointment)); // Always returns JSON
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Please use ISO_LOCAL_DATE_TIME.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating appointment: " + e.getMessage());
        }
    }

    // Get Appointments By Patient
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatient(@PathVariable Long patientId) {
        List<AppointmentDto> appointments = appointmentService.getAppointmentsByPatient(patientId)
                .stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointments);
    }

    // Get Appointments By Doctor
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<AppointmentDto> appointments = appointmentService.getAppointmentsByDoctor(doctorId)
                .stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointments);
    }

    // Update Appointment Status
    @PutMapping("/{appointmentId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long appointmentId,
                                          @RequestParam Status status) {
        try {
            Appointment appointment = appointmentService.updateStatus(appointmentId, status);
            return ResponseEntity.ok(AppointmentMapper.toDto(appointment));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Appointment not found: " + e.getMessage());
        }
    }

    // Cancel Appointment
    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<Void> cancelAppointment(@PathVariable Long appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
        return ResponseEntity.noContent().build();
    }

    // Get Upcoming Appointments for Doctor
    @GetMapping("/doctor/{doctorId}/upcoming")
    public ResponseEntity<List<AppointmentDto>> getUpcomingAppointments(@PathVariable Long doctorId) {
        List<AppointmentDto> appointments = appointmentService.getUpcomingAppointmentsForDoctor(doctorId)
                .stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointments);
    }
}
