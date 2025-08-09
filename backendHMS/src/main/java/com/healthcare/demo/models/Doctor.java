package com.healthcare.demo.models;

//import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.healthcare.demo.enums.Specialty;
import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    //@JsonIgnore // ignore the password showing in json. password will be shown null in response
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    //private String specialization;

    @Enumerated(EnumType.STRING)
    private Specialty specialty;

    @OneToMany(mappedBy = "doctor")
    @JsonIgnore // ignore the appointment list
    private List<Appointment> appointments;

    // Days of week doctor is available
    @ElementCollection(targetClass = DayOfWeek.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "doctor_available_days", joinColumns = @JoinColumn(name = "doctor_id"))
    @Column(name = "available_day")
    private Set<DayOfWeek> availableDays;

    // Available time range
    private LocalTime availableFrom;
    private LocalTime availableTo;

}
