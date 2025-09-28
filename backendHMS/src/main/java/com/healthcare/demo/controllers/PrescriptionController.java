package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.PrescriptionDTO;
import com.healthcare.demo.models.Prescription;
import com.healthcare.demo.services.PrescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PostMapping("/doctor/{doctorId}/patient/{patientId}")
    public ResponseEntity<Prescription> createPrescription(
            @PathVariable Long doctorId,
            @PathVariable Long patientId,
            @RequestBody Prescription prescription) {

        Prescription savedPrescription = prescriptionService.savePrescription(doctorId, patientId, prescription);
        return ResponseEntity.ok(savedPrescription);
    }

    @GetMapping
    public ResponseEntity<List<PrescriptionDTO>> getAllPrescriptions() {
        List<PrescriptionDTO> result = prescriptionService.getAllPrescriptions().stream()
                .map(p -> new PrescriptionDTO(
                        p.getId(),
                        p.getMedicineName(),
                        p.getDosage(),
                        p.getInstructions(),
                        p.getPrescribedDate(),
                        p.getDoctor().getId(),
                        p.getPatient().getId()
                ))
                .toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionDTO> getPrescriptionById(@PathVariable Long id) {
        return prescriptionService.getPrescriptionById(id)
                .map(p -> ResponseEntity.ok(new PrescriptionDTO(
                        p.getId(),
                        p.getMedicineName(),
                        p.getDosage(),
                        p.getInstructions(),
                        p.getPrescribedDate(),
                        p.getDoctor().getId(),
                        p.getPatient().getId()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatient(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByDoctor(doctorId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.noContent().build();
    }
}
