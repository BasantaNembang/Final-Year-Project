package com.auth.dto;

import lombok.Builder;

@Builder
public record JwtDto(
        String jwtToken,
        String refreshToken,
        //String role,
        String userId
        ) {
}
