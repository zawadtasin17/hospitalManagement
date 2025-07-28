package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.AppointmentRequestDto;
import com.healthcare.demo.enums.Status;
import com.healthcare.demo.models.Appointment;
import com.healthcare.demo.services.AppointmentService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //Create Appointment
    @PostMapping("/create")
    public Appointment createAppointment(@RequestBody AppointmentRequestDto dto) {
        return appointmentService.createAppointment(
                dto.getDoctorId(),
                dto.getPatientId(),
                LocalDateTime.parse(dto.getDateTime())
        );
    }

    //Get Appointment By Patient
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByAPatients(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    //Get Appointment By Doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    // Update Status
    @PutMapping("/{appointmentId}/status")
    public Appointment updateStatus(@PathVariable Long appointmentId,
                                    @RequestParam Status status) {
        return appointmentService.updateStatus(appointmentId, status);
    }

    // Cancel appointment
    @DeleteMapping("/{appointmentId}")
    public void cancelAppointment(@PathVariable Long appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
    }
}
