package com.healthcare.demo.controllers;

import com.healthcare.demo.models.Doctor;
import com.healthcare.demo.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * Get all pending doctors
     */
    @GetMapping("/doctors/pending")
    public ResponseEntity<List<Doctor>> getPendingDoctors() {
        List<Doctor> pendingDoctors = adminService.getPendingDoctors();
        return ResponseEntity.ok(pendingDoctors);
    }

    /**
     * Approve a doctor by ID
     */
    @PutMapping("/doctors/{id}/approve")
    public ResponseEntity<Doctor> approveDoctor(@PathVariable Long id) {
        Doctor approvedDoctor = adminService.approveDoctor(id);
        return ResponseEntity.ok(approvedDoctor);
    }

    /**
     * Reject a doctor by ID
     */
    @PutMapping("/doctors/{id}/reject")
    public ResponseEntity<Doctor> rejectDoctor(@PathVariable Long id) {
        Doctor rejectedDoctor = adminService.rejectDoctor(id);
        return ResponseEntity.ok(rejectedDoctor);
    }

    /**
     * Get system statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = adminService.getSystemStats();
        return ResponseEntity.ok(stats);
    }
}
