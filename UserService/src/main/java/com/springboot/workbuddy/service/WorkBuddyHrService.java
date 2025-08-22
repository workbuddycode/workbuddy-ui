package com.springboot.workbuddy.service;

import com.springboot.workbuddy.dto.WorkBuddyHrDto;
import com.springboot.workbuddy.entity.WorkBuddyHrUser;

public interface WorkBuddyHrService {
    WorkBuddyHrUser registerUser(WorkBuddyHrDto dto);
    WorkBuddyHrUser getUserByEmail(String email);

}
