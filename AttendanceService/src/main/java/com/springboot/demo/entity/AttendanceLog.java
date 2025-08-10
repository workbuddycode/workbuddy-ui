package com.springboot.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "attendance_logs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId;

    private LocalDate date;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private Integer sessionNumber;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
