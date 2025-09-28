package com.healthcare.demo.repositories;

import com.healthcare.demo.models.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

}
