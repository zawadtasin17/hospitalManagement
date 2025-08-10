package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.AppointmentDto;
import com.healthcare.demo.dto.AppointmentRequestDto;
import com.healthcare.demo.enums.Status;
import com.healthcare.demo.models.Appointment;
import com.healthcare.demo.services.AppointmentService;
import com.healthcare.demo.mapper.AppointmentMapper;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Create Appointment
    @PostMapping("/create")
    public AppointmentDto createAppointment(@RequestBody AppointmentRequestDto dto) {
        Appointment appointment = appointmentService.createAppointment(
                dto.getDoctorId(),
                dto.getPatientId(),
                LocalDateTime.parse(dto.getDateTime())
        );
        return AppointmentMapper.toDto(appointment);
    }

    // Get Appointments By Patient
    @GetMapping("/patient/{patientId}")
    public List<AppointmentDto> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId).stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // Get Appointments By Doctor
    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentDto> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId).stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    // Update Appointment Status
    @PutMapping("/{appointmentId}/status")
    public AppointmentDto updateStatus(@PathVariable Long appointmentId,
                                       @RequestParam Status status) {
        Appointment appointment = appointmentService.updateStatus(appointmentId, status);
        return AppointmentMapper.toDto(appointment);
    }

    // Cancel Appointment
    @DeleteMapping("/{appointmentId}")
    public void cancelAppointment(@PathVariable Long appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
    }

    // Get Upcoming Appointments for Doctor
    @GetMapping("/doctor/{doctorId}/upcoming")
    public List<AppointmentDto> getUpcomingAppointments(@PathVariable Long doctorId) {
        return appointmentService.getUpcomingAppointmentsForDoctor(doctorId).stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
    }
}
