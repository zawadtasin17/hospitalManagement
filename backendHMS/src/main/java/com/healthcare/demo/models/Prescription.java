package com.healthcare.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long doctorId;
    private Long patientId;

    private String notes;

    @Lob
    @Column(columnDefinition = "BYTEA")  // PostgreSQL binary type
    private byte[] fileData;

    private String fileType; // e.g. "application/pdf", "image/png"
    private String fileName;

    private LocalDateTime createdAt = LocalDateTime.now();

}
