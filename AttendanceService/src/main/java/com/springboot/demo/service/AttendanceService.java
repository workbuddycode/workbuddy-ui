package com.springboot.demo.service;

import com.springboot.demo.dto.AttendanceSummaryDto;
import com.springboot.demo.entity.AttendanceLog;

import java.time.LocalDate;

public interface AttendanceService {
    AttendanceLog checkIn(Long employeeId);
    AttendanceLog checkOut(Long employeeId);
    AttendanceSummaryDto getAttendanceSummary(Long employeeId, LocalDate month);
}
