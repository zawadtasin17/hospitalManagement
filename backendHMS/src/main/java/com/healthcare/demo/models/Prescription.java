package com.healthcare.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName;
    private String dosage;
    private String instructions;
    private LocalDate prescribedDate;

    // Relationships
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnore
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnore
    private Patient patient;

    // Constructors
    public Prescription() {}

    public Prescription(String medicineName, String dosage, String instructions, LocalDate prescribedDate, Doctor doctor, Patient patient) {
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.instructions = instructions;
        this.prescribedDate = prescribedDate;
        this.doctor = doctor;
        this.patient = patient;
    }

}
