package com.michaelyi.filmblog.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthConfig {
    private final String adminPassword;

    public AuthConfig(@Value("${admin.pw}") String adminPassword) {
        this.adminPassword = adminPassword;
    }

    @Bean
    public AdminUser adminUser() {
        return new AdminUser(adminPassword);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
