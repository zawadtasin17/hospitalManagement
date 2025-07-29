package com.healthcare.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequestDto {
    private Long doctorId;
    private Long patientId;
    private String dateTime;
}
