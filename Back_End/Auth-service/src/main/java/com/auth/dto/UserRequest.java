package com.auth.dto;

import lombok.Builder;

@Builder

public record UserRequest(
        String email,
        String role,
        String password,
        String username,
        String job,
        String phoneNumber,
        String address,
        String background) {
}
