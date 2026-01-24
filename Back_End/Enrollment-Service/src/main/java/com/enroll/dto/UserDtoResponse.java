package com.enroll.dto;


import lombok.Builder;


@Builder
public record UserDtoResponse(
        String roles,
        String email
) {
}
