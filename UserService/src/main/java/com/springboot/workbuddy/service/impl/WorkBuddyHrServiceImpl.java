package com.springboot.workbuddy.service.impl;

import com.springboot.workbuddy.dto.WorkBuddyHrDto;
import com.springboot.workbuddy.entity.WorkBuddyHrUser;
import com.springboot.workbuddy.exception.UserNotFoundException;
import com.springboot.workbuddy.repository.WorkBuddyHrUserRepository;
import com.springboot.workbuddy.service.WorkBuddyHrService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkBuddyHrServiceImpl implements WorkBuddyHrService {
    private final WorkBuddyHrUserRepository workBuddyHrUserRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public WorkBuddyHrUser registerUser(WorkBuddyHrDto dto) {

        long count = workBuddyHrUserRepository.findAll().size()+1;
        String generatedId = String.format("WB%05d", count);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        String encodedConfirmPassword = passwordEncoder.encode(dto.getConfirmPassword());
        String assignedRole = (dto.getRole() != null && !dto.getRole().isBlank())
                ? dto.getRole()
                : "ADMIN";

        WorkBuddyHrUser workBuddyHrUser = WorkBuddyHrUser.builder()
                .id(generatedId)
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .mobile(dto.getMobile())
                .password(encodedPassword)
                .confirmPassword(encodedConfirmPassword)
                .role(assignedRole)
                .build();
        return workBuddyHrUserRepository.save(workBuddyHrUser);
    }

    public WorkBuddyHrUser getUserByEmail(String email) {
        return workBuddyHrUserRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Work buddy HR user not found"));
    }
}
