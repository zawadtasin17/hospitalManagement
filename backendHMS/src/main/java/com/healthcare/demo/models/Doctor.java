package com.healthcare.demo.models;

//import javax.persistence.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Getter
    private String email;
    private String phone;
    // Getters and Setters
    @Setter
    @Getter
    private String password;
    private String specialization;

    @OneToMany(mappedBy = "doctor")
    private List<Appointment> appointments;

}
