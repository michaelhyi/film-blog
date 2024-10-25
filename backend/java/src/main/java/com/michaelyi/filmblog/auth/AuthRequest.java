package com.michaelyi.filmblog.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthRequest {
    private String password;

    public AuthRequest(@JsonProperty("password") String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
