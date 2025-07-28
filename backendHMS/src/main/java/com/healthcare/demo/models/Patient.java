package com.healthcare.demo.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
//import javax.persistence.*;


@Entity
public class Patient {

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

    // Relation with Appointment
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments;

}
