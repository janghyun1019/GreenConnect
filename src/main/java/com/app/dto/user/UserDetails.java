package com.app.dto.user;

import java.io.Serializable;

public class UserDetails implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String userId;
    private String username;
    private String email;
    
    // 기본 생성자
    public UserDetails() {}

    // 생성자
    public UserDetails(String userId, String username, String email) {
        this.userId = userId;
        this.username = username;
        this.email = email;
    }

    // Getter & Setter
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
