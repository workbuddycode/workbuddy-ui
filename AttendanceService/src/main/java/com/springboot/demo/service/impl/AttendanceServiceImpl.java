package com.springboot.demo.service.impl;

import com.springboot.demo.dto.AttendanceSummaryDto;
import com.springboot.demo.entity.AttendanceLog;
import com.springboot.demo.repository.AttendanceLogRepository;
import com.springboot.demo.service.AttendanceService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceServiceImpl implements AttendanceService {
    private final AttendanceLogRepository logRepository;

    public AttendanceServiceImpl(AttendanceLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Transactional
    public AttendanceLog checkIn(Long employeeId) {
        int nextSession = logRepository.findMaxSessionForDate(employeeId, LocalDate.now()).orElse(0) + 1;
        AttendanceLog log = new AttendanceLog();
        log.setEmployeeId(employeeId);
        log.setDate(LocalDate.now());
        log.setCheckIn(LocalTime.now());
        log.setSessionNumber(nextSession);
        return logRepository.save(log);
    }

    @Transactional
    public AttendanceLog checkOut(Long employeeId) {
        AttendanceLog log = logRepository.findLatestOpenLog(employeeId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No open session found"));
        log.setCheckOut(LocalTime.now());
        return logRepository.save(log);
    }

    public AttendanceSummaryDto getAttendanceSummary(Long employeeId, LocalDate month) {
        LocalDate firstDay = month.withDayOfMonth(1);
        LocalDate lastDay = month.withDayOfMonth(month.lengthOfMonth());

        List<AttendanceLog> logs = logRepository.findAllByEmployeeIdAndDateBetween(employeeId, firstDay, lastDay);

        Map<LocalDate, Long> dayToMinutes = new HashMap<>();
        for (AttendanceLog log : logs) {
            if (log.getCheckIn() == null || log.getCheckOut() == null) continue;

            long minutes = Duration.between(log.getCheckIn(), log.getCheckOut()).toMinutes();
            dayToMinutes.merge(log.getDate(), minutes, Long::sum);
        }

        long totalMinutes = dayToMinutes.values().stream().mapToLong(Long::longValue).sum();
        long workedDays = dayToMinutes.size();
        double avgHours = workedDays > 0 ? (totalMinutes / 60.0) / workedDays : 0.0;

        return new AttendanceSummaryDto(workedDays, Duration.ofMinutes(totalMinutes), avgHours);
    }
}

