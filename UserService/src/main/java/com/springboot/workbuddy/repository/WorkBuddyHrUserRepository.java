package com.springboot.workbuddy.repository;

import com.springboot.workbuddy.entity.WorkBuddyHrUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkBuddyHrUserRepository extends JpaRepository<WorkBuddyHrUser, Long> {

    Optional<WorkBuddyHrUser> findByEmail(String email);

    List<WorkBuddyHrUser> findAll();
}