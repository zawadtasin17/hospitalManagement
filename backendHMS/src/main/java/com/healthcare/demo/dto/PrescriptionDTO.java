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
    private Long doctorId;
    private Long patientId;
    private String notes;
    private String fileName;
    private String fileType;
    // no fileData
}
