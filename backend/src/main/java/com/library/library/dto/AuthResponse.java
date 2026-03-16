package com.library.library.dto;

import com.library.library.model.Role;
import java.time.LocalDateTime;

public class AuthResponse {
    private String token;
    private String email;
    private Role role;
    private String fullName;
    private LocalDateTime memberSince;
    private int empruntCount;
    private Long id;  // NEW FIELD

    // Default constructor
    public AuthResponse() {}

    // Updated constructor with id
    public AuthResponse(String token, String email, Role role, String fullName, 
                        LocalDateTime memberSince, int empruntCount, Long id) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
        this.memberSince = memberSince;
        this.empruntCount = empruntCount;
        this.id = id;  // NEW
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public LocalDateTime getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(LocalDateTime memberSince) {
        this.memberSince = memberSince;
    }

    public int getEmpruntCount() {
        return empruntCount;
    }

    public void setEmpruntCount(int empruntCount) {
        this.empruntCount = empruntCount;
    }

    // NEW Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}