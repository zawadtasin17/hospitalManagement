package com.healthcare.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "prescription")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "doctor_id", nullable = false, insertable = true, updatable = true)
    private Long doctorId;

    @Column(name = "patient_id", nullable = false, insertable = true, updatable = true)
    private Long patientId;

    @Column(name = "notes", columnDefinition = "TEXT", insertable = true, updatable = true)
    private String notes;

    @Column(name = "file_name", insertable = true, updatable = true)
    private String fileName;

    @Column(name = "file_type", insertable = true, updatable = true)
    private String fileType;

    @JsonIgnore
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "file_data", columnDefinition = "BYTEA", insertable = true, updatable = true)
    private byte[] fileData;
}