package com.library.library.dto;

import com.library.library.model.Role;
import java.time.LocalDateTime;

public class AuthResponse {
    private String token;
    private String email;
    private Role role;
    private String fullname;
    private LocalDateTime memberSince; // new field
    private int booksBorrowed; // new field

    public AuthResponse(String token, String email, Role role, String fullname, LocalDateTime memberSince, int booksBorrowed) {
        this.token = token;
        this.email = email;
        this.role = role;
        this.fullname = fullname;
        this.memberSince = memberSince; // initialize
        this.booksBorrowed = booksBorrowed; // initialize
    }

    // getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }

    public LocalDateTime getMemberSince() { return memberSince; }
    public void setMemberSince(LocalDateTime memberSince) { this.memberSince = memberSince; }

    public int getBooksBorrowed() { return booksBorrowed; }
    public void setBooksBorrowed(int booksBorrowed) { this.booksBorrowed = booksBorrowed; }
}