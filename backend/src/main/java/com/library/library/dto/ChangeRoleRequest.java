package com.library.library.dto;
import com.library.library.model.Role;

public class ChangeRoleRequest {

    private String email;
    private Role newRole;

    public ChangeRoleRequest() {
    }

    public ChangeRoleRequest(String email, Role newRole) {
        this.email = email;
        this.newRole = newRole;
    }

    public String getEmail() {
        return email;
    }

    public Role getNewRole() {
        return newRole;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNewRole(Role newRole) {
        this.newRole = newRole;
    }
}