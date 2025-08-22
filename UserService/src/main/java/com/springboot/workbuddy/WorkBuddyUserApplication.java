package com.springboot.workbuddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.springboot.workbuddy.repository")
@EnableCaching
public class WorkBuddyUserApplication {
    public static void main(String[] args) {
        SpringApplication.run(WorkBuddyUserApplication.class, args);
    }
}
