package com.springboot.demo.controller;

import com.springboot.demo.dto.AttendanceSummaryDto;
import com.springboot.demo.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping("/{employeeId}/summary")
    public ResponseEntity<AttendanceSummaryDto> getSummary(
            @PathVariable Long employeeId,
            @RequestParam("month") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate month
    ) {
        return ResponseEntity.ok(attendanceService.getAttendanceSummary(employeeId, month));
    }

    @PostMapping("/{employeeId}/checkin")
    public ResponseEntity<String> checkIn(
            @PathVariable Long employeeId
    ) {
        attendanceService.checkIn(employeeId);
        return ResponseEntity.ok("Checked in successfully.");
    }

    @PostMapping("/{employeeId}/checkout")
    public ResponseEntity<String> checkOut(
            @PathVariable Long employeeId
    ) {
        attendanceService.checkOut(employeeId);
        return ResponseEntity.ok("Checked out successfully.");
    }
}

