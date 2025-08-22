package com.springboot.workbuddy.dto;

import lombok.Data;

@Data
public class WorkBuddyHrDto {
    private String fullName;
    private String email;
    private String mobile;
    private String password;
    private String confirmPassword;
    private String role;
}
