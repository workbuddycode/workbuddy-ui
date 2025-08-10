package com.springboot.demo.repository;

import com.springboot.demo.entity.AttendanceLog;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {
    @Query("SELECT MAX(a.sessionNumber) FROM AttendanceLog a WHERE a.employeeId = :empId AND a.date = :date")
    Optional<Integer> findMaxSessionForDate(@Param("empId") Long empId, @Param("date") LocalDate date);

    @Query("SELECT a FROM AttendanceLog a WHERE a.employeeId = :empId AND a.date = :date AND a.checkOut IS NULL ORDER BY a.sessionNumber DESC")
    Optional<AttendanceLog> findLatestOpenLog(@Param("empId") Long empId, @Param("date") LocalDate date);

    List<AttendanceLog> findAllByEmployeeIdAndDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);
}
