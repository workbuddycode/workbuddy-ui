package com.springboot.workbuddy.controller;

import com.springboot.workbuddy.dto.LoginRequest;
import com.springboot.workbuddy.dto.WorkBuddyHrDto;
import com.springboot.workbuddy.entity.WorkBuddyHrUser;
import com.springboot.workbuddy.exception.LoginFailedException;
import com.springboot.workbuddy.service.WorkBuddyHrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/work-buddy-user")
@RequiredArgsConstructor
public class WorkBuddyUserController {
    private final WorkBuddyHrService workBuddyHrService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<WorkBuddyHrUser> login(@RequestBody LoginRequest loginRequest) {
        try {
            WorkBuddyHrUser employee = workBuddyHrService.getUserByEmail(loginRequest.getEmail());
            var authToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
            authenticationManager.authenticate(authToken);
            return ResponseEntity.ok(employee);
        } catch (Exception exception) {
            throw new LoginFailedException("Unable to login with the entered credentials");
        }
    }

    @PostMapping("register-user")
    public ResponseEntity<WorkBuddyHrUser> addEmployee(@RequestBody WorkBuddyHrDto dto) {
        return ResponseEntity.ok(workBuddyHrService.registerUser(dto));
    }
}

