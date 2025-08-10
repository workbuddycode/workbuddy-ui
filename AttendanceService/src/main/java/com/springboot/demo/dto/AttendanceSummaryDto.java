package com.springboot.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceSummaryDto {
    long workedDays;
    Duration totalWorkedDuration;
    double averageHoursPerDay;
}


