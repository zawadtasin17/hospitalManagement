package com.healthcare.demo.dto;

import com.healthcare.demo.enums.ApprovalStatus;
import com.healthcare.demo.enums.Specialty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private String name;
    private Specialty specialty;
    private Set<DayOfWeek> availableDays;
    private LocalTime availableFrom;
    private LocalTime availableTo;
    private ApprovalStatus approvalStatus;
}
