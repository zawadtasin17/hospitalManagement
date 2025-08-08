package com.healthcare.demo.repositories;

import com.healthcare.demo.enums.Specialty;
import com.healthcare.demo.models.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByEmail(String email);
    List<Doctor> findBySpecialty(Specialty specialty);
}
