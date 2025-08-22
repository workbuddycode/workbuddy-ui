package com.springboot.workbuddy.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity(name = "WorkBuddyHrUser")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkBuddyHrUser {

    @Id
    private String id;

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    @NotBlank(message = "Mobile is required")
    private String mobile;

    @Size(min = 6, message = "Password must be at least 6 characters")
    @NotBlank(message = "Password is required")
    private String password;

    private String confirmPassword;

    private String role;

    /**
     * Utility method to check if password and confirmPassword match.
     * Can be used in service layer or custom validator.
     */
    public boolean isPasswordConfirmed() {
        return password != null && password.equals(confirmPassword);
    }
}