package com.michaelyi.filmblog.health;

import com.michaelyi.filmblog.util.HttpResponse;

public class HealthResponse extends HttpResponse {
    private Health health;

    public HealthResponse(Health status) {
        this.health = status;
    }

    public HealthResponse() {
    }

    public Health getHealth() {
        return health;
    }

    public void setHealth(Health health) {
        this.health = health;
    }
}
