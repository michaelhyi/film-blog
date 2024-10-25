package com.michaelyi.filmblog.auth;

import com.michaelyi.filmblog.util.HttpResponse;

public class LoginResponse extends HttpResponse {
    private String token;

    public LoginResponse() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
