package com.healthcare.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDTO {
    private Long id;
    private String medicineName;
    private String dosage;
    private String instructions;
    private LocalDate prescribedDate;
    private Long doctorId;
    private Long patientId;
    
}
