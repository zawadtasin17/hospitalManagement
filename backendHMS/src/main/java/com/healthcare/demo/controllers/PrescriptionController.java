package com.healthcare.demo.controllers;

import com.healthcare.demo.dto.PrescriptionDTO;
import com.healthcare.demo.models.Prescription;
import com.healthcare.demo.services.PrescriptionService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {
    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    // Upload Prescription (Doctor adds prescription)
    @PostMapping("/upload")
    public ResponseEntity<Prescription> uploadPrescription(
            @RequestParam Long doctorId,
            @RequestParam Long patientId,
            @RequestParam(required = false) String notes,
            @RequestParam("file") MultipartFile file) throws IOException {

        Prescription prescription = new Prescription();
        prescription.setDoctorId(doctorId);
        prescription.setPatientId(patientId);
        prescription.setNotes(notes);
        prescription.setFileName(file.getOriginalFilename());
        prescription.setFileType(file.getContentType());
        prescription.setFileData(file.getBytes());

        Prescription saved = prescriptionService.savePrescription(prescription);
        return ResponseEntity.ok(saved);
    }

    // Get All Prescriptions
    @GetMapping
    public ResponseEntity<List<Prescription>> getAll() {
        return ResponseEntity.ok(prescriptionService.getAllPrescriptions());
    }

    // Get Prescription by ID
    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getById(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionById(id));
    }

    // Download Prescription File
    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadPrescription(@PathVariable Long id) {
        Prescription prescription = prescriptionService.getPrescriptionById(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + prescription.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(prescription.getFileType()))
                .body(prescription.getFileData());
    }

    // Delete Prescription
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        prescriptionService.deletePrescription(id);
        return ResponseEntity.ok("Prescription deleted successfully");
    }
}
